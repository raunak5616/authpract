import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
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
    <nav className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={() => goTo(currentUser ? "/dashboard" : "/")}
            className="text-2xl font-bold text-indigo-600"
          >
            AuthPract
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              onClick={() => goTo(currentUser ? "/dashboard" : "/")}
              className="text-slate-700 transition hover:text-indigo-600"
            >
              Home
            </button>

            {currentUser ? (
              <>
                <span className="text-sm text-slate-500">
                  {currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => goTo("/signup")}
                className="text-slate-700 transition hover:text-indigo-600"
              >
                Signup
              </button>
            )}
          </div>

          <button
            type="button"
            className="text-3xl md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? "max-h-48 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => goTo(currentUser ? "/dashboard" : "/")}
              className="text-left text-slate-700 transition hover:text-indigo-600"
            >
              Home
            </button>

            {currentUser ? (
              <>
                <span className="text-sm text-slate-500">{currentUser.name}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-left text-slate-700 transition hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => goTo("/signup")}
                className="text-left text-slate-700 transition hover:text-indigo-600"
              >
                Signup
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
