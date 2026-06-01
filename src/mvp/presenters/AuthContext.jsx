import {  createContext, useReducer } from "react";
import AuthReducer from "../models/authReducer";

const AuthContext = createContext();
 const initialState ={
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
}
const AuthProvider = ({children})=>{
    const[state,dispatch] = useReducer(AuthReducer,initialState);
    return(
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext,AuthProvider};
