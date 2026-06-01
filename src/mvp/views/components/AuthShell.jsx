import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../presenters/ThemeContext";

export const AuthShell = ({
  eyebrow,
  title,
  description,
  submitLabel,
  alternateLabel,
  alternateCta,
  alternateAction,
  alternateHref,
  onSubmit,
  children,
  successMessage,
}) => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const handleAlternateClick = () => {
    if (alternateAction) {
      alternateAction();
      return;
    }

    if (alternateHref) {
      navigate(alternateHref);
    }
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition ${
        isDark ? "bg-[#050816] text-white" : "bg-[#f6fbff] text-slate-900"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.14),transparent_24%),linear-gradient(145deg,#050816_0%,#0b1120_45%,#111827_100%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.14),transparent_24%),linear-gradient(145deg,#f8fbff_0%,#e0f2fe_50%,#eff6ff_100%)]"
        }`}
      />
      <div className={`absolute left-[-10rem] top-20 h-72 w-72 rounded-full blur-3xl ${isDark ? "bg-cyan-400/12" : "bg-sky-300/25"}`} />
      <div className={`absolute bottom-10 right-[-6rem] h-80 w-80 rounded-full blur-3xl ${isDark ? "bg-amber-400/10" : "bg-amber-300/20"}`} />

      {successMessage && (
        <div className="fixed right-5 top-5 z-30 rounded-2xl border border-emerald-300/20 bg-emerald-400/15 px-4 py-3 text-sm font-medium text-emerald-100 shadow-2xl backdrop-blur-xl">
          {successMessage}
        </div>
      )}

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section
            className={`relative overflow-hidden rounded-[32px] border p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:p-10 ${
              isDark ? "border-white/10 bg-white/6" : "border-white/70 bg-white/55"
            }`}
          >
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-[linear-gradient(135deg,rgba(56,189,248,0.08),transparent_36%,rgba(251,191,36,0.08)_100%)]"
                  : "bg-[linear-gradient(135deg,rgba(14,165,233,0.08),transparent_36%,rgba(251,191,36,0.12)_100%)]"
              }`}
            />
            <div className="relative">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] ${
                  isDark
                    ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                    : "border-sky-200 bg-sky-50 text-sky-700"
                }`}
              >
                {eyebrow}
              </div>

              <h1 className={`mt-6 max-w-xl text-4xl font-black leading-tight sm:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}>
                flapyflapy
                <span className={`mt-3 block text-2xl font-semibold sm:text-3xl ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                  Fly through your next session in style.
                </span>
              </h1>

              <p className={`mt-5 max-w-lg text-base leading-7 sm:text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                A sharper auth cockpit with a real dark and light mode, built around speed,
                focus, and a playful arcade feel.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Fast entry", value: "1-tap flow" },
                  { label: "Mood", value: isDark ? "Night arcade" : "Sky mode" },
                  { label: "Focus", value: "Less clutter" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl border px-4 py-4 ${
                      isDark ? "border-white/10 bg-slate-950/35" : "border-slate-200/70 bg-white/75"
                    }`}
                  >
                    <p className={`text-xs uppercase tracking-[0.25em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {item.label}
                    </p>
                    <p className={`mt-2 text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div
                className={`relative mt-12 h-[320px] overflow-hidden rounded-[28px] border shadow-2xl ${
                  isDark
                    ? "border-white/10 bg-[linear-gradient(180deg,#0f172a_0%,#111827_55%,#0b1220_100%)]"
                    : "border-white/80 bg-[linear-gradient(180deg,#dff6ff_0%,#f8fafc_52%,#dbeafe_100%)]"
                }`}
              >
                <div className={`absolute left-10 top-8 h-16 w-32 rounded-full blur-xl ${isDark ? "bg-white/70" : "bg-white/95"}`} />
                <div className={`absolute right-12 top-14 h-20 w-40 rounded-full blur-xl ${isDark ? "bg-cyan-100/60" : "bg-sky-100/95"}`} />
                <div className={`absolute left-1/3 top-28 h-14 w-28 rounded-full blur-lg ${isDark ? "bg-white/50" : "bg-white/90"}`} />
                <div
                  className={`absolute bottom-0 left-0 h-20 w-full ${
                    isDark
                      ? "bg-[linear-gradient(180deg,rgba(30,41,59,0)_0%,rgba(8,47,73,0.6)_45%,rgba(6,78,59,0.95)_100%)]"
                      : "bg-[linear-gradient(180deg,rgba(191,219,254,0)_0%,rgba(125,211,252,0.45)_48%,rgba(74,222,128,0.88)_100%)]"
                  }`}
                />
                <div className="absolute left-10 bottom-14 h-36 w-10 rounded-t-[20px] rounded-b-[8px] border-4 border-emerald-950 bg-emerald-500 shadow-xl" />
                <div className="absolute left-10 top-0 h-24 w-10 rounded-b-[20px] border-4 border-emerald-950 bg-emerald-500 shadow-xl" />
                <div className="absolute right-14 bottom-14 h-28 w-10 rounded-t-[20px] rounded-b-[8px] border-4 border-emerald-950 bg-emerald-500 shadow-xl" />
                <div className="absolute right-14 top-0 h-32 w-10 rounded-b-[20px] border-4 border-emerald-950 bg-emerald-500 shadow-xl" />

                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
                  <div className={`absolute inset-4 rounded-full blur-2xl ${isDark ? "bg-cyan-300/20" : "bg-sky-300/30"}`} />
                  <div className="absolute left-5 top-10 h-24 w-24 rounded-full border-[6px] border-amber-400 bg-amber-300 shadow-[0_20px_40px_rgba(251,191,36,0.35)]" />
                  <div className="absolute left-[4.3rem] top-[3.6rem] h-9 w-14 rounded-full bg-amber-200/95" />
                  <div className="absolute left-[4.6rem] top-[4rem] h-4 w-4 rounded-full bg-slate-950" />
                  <div className="absolute left-[6.9rem] top-[5.15rem] h-6 w-8 rounded-r-full bg-orange-500" />
                  <div className="absolute left-[1.9rem] top-[2.3rem] h-14 w-16 -rotate-12 rounded-[55%_45%_45%_55%] border-4 border-amber-500 bg-yellow-100/95" />
                  <div className="absolute left-[4.1rem] top-[1.2rem] h-10 w-10 rounded-full border-4 border-amber-500 bg-amber-300" />
                  <div className="absolute left-[5.8rem] top-[0.8rem] h-4 w-4 rounded-full bg-amber-200" />
                </div>

                <div className={`absolute inset-x-0 bottom-0 flex items-center justify-between px-8 pb-6 text-xs uppercase tracking-[0.35em] ${isDark ? "text-cyan-100/80" : "text-sky-700/80"}`}>
                  <span>Bird view</span>
                  <span>Arcade mode</span>
                </div>
              </div>
            </div>
          </section>

          <section
            className={`rounded-[32px] border p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:p-10 ${
              isDark ? "border-white/10 bg-slate-950/70" : "border-white/80 bg-white/78"
            }`}
          >
            <div className="mb-8">
              <p className={`text-sm font-semibold uppercase tracking-[0.35em] ${isDark ? "text-amber-300" : "text-amber-600"}`}>
                {title}
              </p>
              <h2 className={`mt-4 text-3xl font-black sm:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>{description}</h2>
              <p className={`mt-4 max-w-md text-sm leading-7 sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Clean inputs, strong contrast, and a game-inspired surface that
                keeps the important actions front and center.
              </p>
            </div>

            <form className="space-y-5" onSubmit={onSubmit}>
              {children}

              <button
                type="submit"
                className="w-full rounded-2xl bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_100%)] px-5 py-3.5 text-base font-bold text-slate-950 shadow-[0_14px_30px_rgba(249,115,22,0.35)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                {submitLabel}
              </button>
            </form>

            <p className={`mt-6 text-center text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              {alternateLabel}{" "}
              <button
                type="button"
                onClick={handleAlternateClick}
                className={`font-semibold transition ${isDark ? "text-cyan-300 hover:text-cyan-200" : "text-sky-700 hover:text-sky-600"}`}
              >
                {alternateCta}
              </button>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
