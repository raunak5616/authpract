import { Route, Routes } from "react-router-dom"
import { Login } from "../../pages/login"
import { Signup } from "../../pages/signup"
import { Navbar } from "../../component/navbar"

export const AppRouter = () =>{
    return(
        <div>
         <Navbar/>
       <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
       </Routes>
        </div>
    )
}