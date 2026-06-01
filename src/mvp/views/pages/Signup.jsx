import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../presenters/ThemeContext";
import { AuthShell } from "../components/AuthShell";

export const Signup = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  const inputClassName = `w-full rounded-2xl border px-4 py-3.5 outline-none transition placeholder:text-slate-500 ${
    isDark
      ? "border-white/10 bg-slate-900/80 text-white focus:border-cyan-300/50 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/10"
      : "border-slate-200 bg-white text-slate-900 focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-300/20"
  }`;

  const labelClassName = `mb-2 block text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`;
  const helperClassName = `text-xs uppercase tracking-[0.3em] ${isDark ? "text-slate-500" : "text-slate-400"}`;

  const onSignupChange = (e) => {
    setsignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitt = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user/signup`, signupData);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <AuthShell
      eyebrow="New pilot"
      title="Create account"
      description="Set up your flapyflapy profile."
      submitLabel="Sign up"
      alternateLabel="Already flying with us?"
      alternateCta="Log in"
      alternateHref="/"
      onSubmit={onSubmitt}
      successMessage={success ? "Signup successful" : ""}
    >
      <div>
        <label className={labelClassName}>Full name</label>
        <input
          type="text"
          onChange={onSignupChange}
          name="name"
          required
          placeholder="Your display name"
          className={inputClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>Email</label>
        <input
          type="email"
          onChange={onSignupChange}
          name="email"
          required
          placeholder="pilot@flapyflapy.com"
          className={inputClassName}
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className={labelClassName.replace("mb-2 ", "")}>Password</label>
          <span className={helperClassName}>Minimum secure</span>
        </div>
        <input
          type="password"
          onChange={onSignupChange}
          name="password"
          required
          placeholder="Create a strong password"
          className={inputClassName}
        />
      </div>
    </AuthShell>
  );
};
