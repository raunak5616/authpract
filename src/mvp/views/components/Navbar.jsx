import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../presenters/AuthContext";
import { ThemeContext } from "../../presenters/ThemeContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const { isDark, theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setOpen] = useState(false);

  const currentUser = user?.user ?? user;

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    setOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition ${
        isDark
          ? "border-white/10 bg-slate-950/75 shadow-lg shadow-black/20"
          : "border-slate-200/80 bg-white/80 shadow-lg shadow-sky-100/60"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-18 items-center justify-between">
          <button
            type="button"
            onClick={() => goTo(currentUser ? "/dashboard" : "/")}
            className="flex items-center gap-3 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#22d3ee_0%,#f59e0b_100%)] text-lg font-black text-slate-950 shadow-lg shadow-cyan-500/10">
              F
            </span>
            <span>
              <span className={`block text-lg font-black tracking-[0.18em] ${isDark ? "text-white" : "text-slate-950"}`}>
                flapyflapy
              </span>
              <span className={`block text-[11px] uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {theme} flight mode
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              onClick={() => goTo(currentUser ? "/dashboard" : "/")}
              className={`transition ${isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-700 hover:text-sky-600"}`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isDark
                  ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>

            {currentUser ? (
              <>
                <span
                  className={`rounded-full border px-4 py-2 text-sm ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-300"
                      : "border-slate-200 bg-white/70 text-slate-700"
                  }`}
                >
                  {currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isDark
                      ? "bg-white text-slate-950 hover:bg-cyan-100"
                      : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => goTo("/signup")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isDark
                    ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-200 hover:border-cyan-200/40 hover:bg-cyan-300/15"
                    : "border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300 hover:bg-sky-100"
                }`}
              >
                Sign up
              </button>
            )}
          </div>

          <button
            type="button"
            className={`rounded-xl border px-3 py-2 text-xl md:hidden ${
              isDark
                ? "border-white/10 bg-white/5 text-slate-200"
                : "border-slate-200 bg-white/70 text-slate-700"
            }`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              className={`text-left transition ${
                isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-700 hover:text-sky-600"
              }`}
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>
            <button
              type="button"
              onClick={() => goTo(currentUser ? "/dashboard" : "/")}
              className={`text-left transition ${
                isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-700 hover:text-sky-600"
              }`}
            >
              Home
            </button>

            {currentUser ? (
              <>
                <span className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{currentUser.name}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`text-left transition ${
                    isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-700 hover:text-sky-600"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => goTo("/signup")}
                className={`text-left transition ${
                  isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-700 hover:text-sky-600"
                }`}
              >
                Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
