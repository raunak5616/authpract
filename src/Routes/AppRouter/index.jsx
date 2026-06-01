import { useContext } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../../pages/login"
import { Signup } from "../../pages/signup"
import { Navbar } from "../../component/navbar"
import FlappyDashboard from "../../pages/dashboard"
import { AuthContext } from "../../context/Authcontext"

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export const AppRouter = () =>{
    const { user } = useContext(AuthContext);

    return(
        <div>
         <Navbar/>
       <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />}/>
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <FlappyDashboard />
                </ProtectedRoute>
            }
        />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />}/>
       </Routes>
        </div>
    )
}
