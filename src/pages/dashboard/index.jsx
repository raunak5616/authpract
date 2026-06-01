import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/Authcontext";

const GAME_WIDTH = 760;
const GAME_HEIGHT = 540;
const BIRD_SIZE = 44;
const BIRD_X = 140;
const GRAVITY = 0.55;
const JUMP_FORCE = -8.5;
const PIPE_WIDTH = 78;
const PIPE_GAP = 160;
const PIPE_SPEED = 3.2;
const GROUND_HEIGHT = 72;
const PIPE_SET = [
  { x: 520, gapTop: 110, passed: false },
  { x: 820, gapTop: 210, passed: false },
  { x: 1120, gapTop: 150, passed: false },
];

const createPipes = () => PIPE_SET.map((pipe) => ({ ...pipe }));
const randomGapTop = () => 80 + Math.floor(Math.random() * 180);

export default function FlappyDashboard() {
  const { user, dispatch } = useContext(AuthContext);
  const [birdY, setBirdY] = useState(220);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState(createPipes);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(user?.user?.bestScore ?? user?.bestScore ?? 0);
  const [gamesPlayed, setGamesPlayed] = useState(user?.user?.gamesPlayed ?? user?.gamesPlayed ?? 0);
  const [coins, setCoins] = useState(user?.user?.coins ?? user?.coins ?? 0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [status, setStatus] = useState("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const velocityRef = useRef(0);
  const endedRef = useRef(false);
  const savedScoreRef = useRef(false);

  const authToken = user?.token || localStorage.getItem("token");
  const currentUser = user?.user ?? user;

  const syncStoredUser = (nextUser) => {
    const token = authToken;
    const nextAuthState = {
      ...(user ?? {}),
      token,
      user: nextUser,
    };

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: nextAuthState,
    });

    localStorage.setItem("user", JSON.stringify(nextAuthState));
  };

  const loadLeaderboard = async () => {
    try {
      setLeaderboardLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/leaderboard`);
      setLeaderboard(res.data.leaderboard || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLeaderboardLoading(false);
    }
  };

  const saveScoreToDatabase = async (finalScore) => {
    if (!authToken || savedScoreRef.current) {
      return;
    }

    savedScoreRef.current = true;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/score`,
        { score: finalScore },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const updatedUser = res.data.user;
      setBestScore(updatedUser.bestScore);
      setGamesPlayed(updatedUser.gamesPlayed);
      setCoins(updatedUser.coins);
      setSaveMessage("Score saved to leaderboard");
      syncStoredUser(updatedUser);
      loadLeaderboard();
    } catch (error) {
      console.error(error);
      setSaveMessage("Could not save score");
      savedScoreRef.current = false;
    }
  };

  const finishGame = () => {
    if (endedRef.current) {
      return;
    }

    endedRef.current = true;
    setStatus("gameover");
    setSaveMessage("");
    saveScoreToDatabase(score);
  };

  const resetGame = () => {
    setBirdY(220);
    setVelocity(0);
    velocityRef.current = 0;
    setPipes(createPipes());
    setScore(0);
    setStatus("idle");
    setSaveMessage("");
    endedRef.current = false;
    savedScoreRef.current = false;
  };

  const startGame = () => {
    if (status === "gameover") {
      resetGame();
    }

    endedRef.current = false;
    savedScoreRef.current = false;
    setStatus("running");
    setVelocity(JUMP_FORCE);
    velocityRef.current = JUMP_FORCE;
  };

  const flap = () => {
    if (status === "idle") {
      startGame();
      return;
    }

    if (status === "running") {
      setVelocity(JUMP_FORCE);
      velocityRef.current = JUMP_FORCE;
      return;
    }

    resetGame();
  };

  useEffect(() => {
    setBestScore(currentUser?.bestScore ?? 0);
    setGamesPlayed(currentUser?.gamesPlayed ?? 0);
    setCoins(currentUser?.coins ?? 0);
  }, [currentUser?.bestScore, currentUser?.coins, currentUser?.gamesPlayed]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        flap();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, score]);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    const interval = window.setInterval(() => {
      velocityRef.current += GRAVITY;
      setVelocity(velocityRef.current);
      setBirdY((prev) => prev + velocityRef.current);

      setPipes((prevPipes) =>
        prevPipes.map((pipe) => {
          const nextX = pipe.x - PIPE_SPEED;
          if (nextX < -PIPE_WIDTH) {
            const farthestPipe = Math.max(...prevPipes.map((item) => item.x));
            return {
              x: farthestPipe + 300,
              gapTop: randomGapTop(),
              passed: false,
            };
          }

          return { ...pipe, x: nextX };
        }),
      );
    }, 16);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    const birdTop = birdY;
    const birdBottom = birdY + BIRD_SIZE;
    const groundTop = GAME_HEIGHT - GROUND_HEIGHT;

    if (birdTop <= 0 || birdBottom >= groundTop) {
      finishGame();
      return;
    }

    const hitPipe = pipes.some((pipe) => {
      const insidePipeX =
        BIRD_X + BIRD_SIZE > pipe.x && BIRD_X < pipe.x + PIPE_WIDTH;
      const insideGap =
        birdTop > pipe.gapTop && birdBottom < pipe.gapTop + PIPE_GAP;
      return insidePipeX && !insideGap;
    });

    if (hitPipe) {
      finishGame();
    }
  }, [birdY, pipes, score, status]);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    setPipes((prevPipes) =>
      prevPipes.map((pipe) => {
        if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X) {
          setScore((prev) => prev + 1);
          return { ...pipe, passed: true };
        }
        return pipe;
      }),
    );
  }, [pipes, status]);

  const statusLabel =
    status === "idle"
      ? "Press space, tap, or click to start"
      : status === "running"
        ? "Keep flapping"
        : "Game over. Tap to restart";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#0f172a_50%,#020617_100%)] text-white px-4 py-6 md:px-8">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            Flappy<span className="text-sky-300">Dash</span>
          </h1>
          <p className="text-sm text-slate-300">
            Welcome back, {currentUser?.name || "Player"}
          </p>
        </div>

        <div className="flex gap-3 text-sm text-slate-300">
          <button
            type="button"
            className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/10 transition"
            onClick={resetGame}
          >
            New Run
          </button>
          <button
            type="button"
            className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/10 transition"
            onClick={loadLeaderboard}
          >
            Refresh Board
          </button>
        </div>
      </nav>

      <div className="mx-auto mt-6 grid w-full max-w-7xl gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm text-slate-400">Best Score</p>
            <h2 className="mt-2 text-5xl font-black">{bestScore}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm text-slate-400">Games Played</p>
            <h2 className="mt-2 text-5xl font-black">{gamesPlayed}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm text-slate-400">Coins Earned</p>
            <h2 className="mt-2 text-5xl font-black">{coins}</h2>
          </div>

          <div className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-6 text-sky-50 shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">Controls</p>
            <p className="mt-3 text-sm leading-6 text-slate-100">
              Press <span className="font-bold">Space</span> or <span className="font-bold">Arrow Up</span>.
              You can also click or tap inside the game area.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl">
          <div
            role="button"
            tabIndex={0}
            onClick={flap}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                flap();
              }
            }}
            className="relative mx-auto w-full cursor-pointer overflow-hidden outline-none"
            style={{ maxWidth: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-cyan-200 to-blue-400" />
            <div className="absolute left-10 top-16 h-12 w-28 rounded-full bg-white/80 blur-sm" />
            <div className="absolute right-20 top-24 h-14 w-36 rounded-full bg-white/75 blur-sm" />
            <div className="absolute left-1/3 top-40 h-10 w-24 rounded-full bg-white/70 blur-sm" />

            {pipes.map((pipe, index) => (
              <div key={`${pipe.x}-${index}`}>
                <div
                  className="absolute rounded-b-2xl border-4 border-green-900 bg-green-600 shadow-xl"
                  style={{
                    left: `${pipe.x}px`,
                    top: 0,
                    width: `${PIPE_WIDTH}px`,
                    height: `${pipe.gapTop}px`,
                  }}
                />
                <div
                  className="absolute rounded-t-2xl border-4 border-green-900 bg-green-600 shadow-xl"
                  style={{
                    left: `${pipe.x}px`,
                    top: `${pipe.gapTop + PIPE_GAP}px`,
                    width: `${PIPE_WIDTH}px`,
                    height: `${GAME_HEIGHT - GROUND_HEIGHT - (pipe.gapTop + PIPE_GAP)}px`,
                  }}
                />
              </div>
            ))}

            <div
              className="absolute"
              style={{
                left: `${BIRD_X}px`,
                top: `${birdY}px`,
                width: `${BIRD_SIZE}px`,
                height: `${BIRD_SIZE}px`,
                transform: `rotate(${Math.min(velocity * 3, 35)}deg)`,
              }}
            >
              <div className="relative h-full w-full rounded-full border-[5px] border-yellow-500 bg-yellow-300 shadow-2xl">
                <div className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-slate-900" />
                <div className="absolute -right-1 bottom-3 h-4 w-6 rounded-r-full bg-orange-500" />
                <div className="absolute left-2 top-5 h-4 w-5 rounded-full bg-yellow-100/90" />
              </div>
            </div>

            <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-2xl border border-white/20 bg-slate-950/25 px-6 py-3 text-center backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Current Score</p>
              <h2 className="text-4xl font-black">{score}</h2>
            </div>

            <div className="absolute inset-x-0 top-24 flex justify-center px-6">
              <div className="rounded-full border border-white/20 bg-slate-950/30 px-5 py-2 text-sm text-white backdrop-blur-md">
                {statusLabel}
              </div>
            </div>

            {saveMessage && status === "gameover" && (
              <div className="absolute inset-x-0 top-40 flex justify-center px-6">
                <div className="rounded-full border border-emerald-300/30 bg-emerald-400/20 px-5 py-2 text-sm text-white backdrop-blur-md">
                  {saveMessage}
                </div>
              </div>
            )}

            {status !== "running" && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20">
                <div className="rounded-3xl border border-white/15 bg-slate-950/55 px-8 py-6 text-center backdrop-blur-lg">
                  <h3 className="text-3xl font-black">
                    {status === "idle" ? "Ready to Fly?" : "Crash Landing"}
                  </h3>
                  <p className="mt-3 text-slate-200">
                    {status === "idle"
                      ? "Launch the bird and dodge the pipes."
                      : `You scored ${score}. Tap to try again.`}
                  </p>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      flap();
                    }}
                    className="mt-5 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-105"
                  >
                    {status === "idle" ? "Start Game" : "Restart"}
                  </button>
                </div>
              </div>
            )}

            <div
              className="absolute bottom-0 left-0 w-full border-t-[8px] border-emerald-950 bg-emerald-700"
              style={{ height: `${GROUND_HEIGHT}px` }}
            />
          </div>
        </div>

        <aside className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Leaderboard</p>
              <h2 className="mt-2 text-3xl font-black">Top Pilots</h2>
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-xs text-slate-300">
              Top 10
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {leaderboardLoading && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">
                Loading leaderboard...
              </div>
            )}

            {!leaderboardLoading && leaderboard.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">
                No scores yet. Play the first round.
              </div>
            )}

            {!leaderboardLoading &&
              leaderboard.map((entry) => (
                <div
                  key={entry.id}
                  className={`rounded-2xl border px-4 py-4 ${
                    entry.id === currentUser?.id
                      ? "border-sky-300/40 bg-sky-300/15"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        Rank #{entry.rank}
                      </p>
                      <h3 className="mt-1 text-lg font-bold">{entry.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Best</p>
                      <p className="text-2xl font-black">{entry.bestScore}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between text-sm text-slate-300">
                    <span>{entry.gamesPlayed} games</span>
                    <span>{entry.coins} coins</span>
                  </div>
                </div>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
