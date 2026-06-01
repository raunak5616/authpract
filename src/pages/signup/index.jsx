import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [success, setSuccess] = useState(false);

  // HANDLE INPUT CHANGE
  const onSignupChange = (e) => {
    setsignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE FORM SUBMIT
  const onSubmitt = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signup`,
        signupData
      );

      console.log(res.data);

      // SHOW SUCCESS POPUP
      setSuccess(true);

      // HIDE AFTER 1000ms
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

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      {/* SUCCESS POPUP */}
      {
        success && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Signup Successful
          </div>
        )
      }

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-indigo-600">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Signup to get started
          </p>

        </div>

        <form
          onSubmit={onSubmitt}
          className="flex flex-col gap-5"
        >

          <div>

            <label className="block text-slate-700 mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              onChange={onSignupChange}
              name="name"
              required
              placeholder="Enter your name"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />

          </div>

          <div>

            <label className="block text-slate-700 mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              onChange={onSignupChange}
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />

          </div>

          <div>

            <label className="block text-slate-700 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              onChange={onSignupChange}
              name="password"
              required
              placeholder="Create password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />

          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Signup
          </button>

        </form>

      </div>

    </div>
  );
};
