import { useNavigate } from "react-router-dom";

export const Login=()=>{
    const navigate = useNavigate();
    return(
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

  <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-indigo-600">
        Welcome Back
      </h1>

      <p className="text-slate-500 mt-2">
        Login to continue
      </p>
    </div>

    <form className="flex flex-col gap-5">

      <div>
        <label className="block text-slate-700 mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
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
          placeholder="Enter your password"
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition duration-300"
      >
        Login
      </button>

    </form>

    <p className="text-center text-slate-500 mt-6">
      Don’t have an account?
      <a
       onClick={()=>navigate('/signup')}
        className="text-indigo-600 font-medium ml-1 hover:underline"
      >
        Signup
      </a>
    </p>

  </div>

</div>
    )
}