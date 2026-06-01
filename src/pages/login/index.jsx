import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";

export const Login=()=>{
  const navigate = useNavigate();
    const [loginData, setloginData] = useState({
        email:"",
        password:""
    });
    const {dispatch} = useContext(AuthContext);
    const onLoginChange=(e)=>{
        setloginData({
            ...loginData,
            [e.target.name]:e.target.value
        })
    }
    const HandleSubmitt = async(e) =>{
      e.preventDefault();
      try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`,loginData);
        dispatch({
          type:"LOGIN_SUCCESS",
          payload:res.data
        })
        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );
        localStorage.setItem(
          "token",
          res.data.token
        );
        navigate("/dashboard");
      }
      catch(err){
        console.error(err);
        alert(err.response?.data?.message || "Login failed");
      }
    }
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

    <form className="flex flex-col gap-5" onSubmit={HandleSubmitt}>

      <div>
        <label className="block text-slate-700 mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          onChange={onLoginChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
        />
      </div>

      <div>
        <label className="block text-slate-700 mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          name="password"
          required
          placeholder="Enter your password"
          onChange={onLoginChange}
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
