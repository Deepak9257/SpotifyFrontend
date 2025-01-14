import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthLayout = () => {

    const navigate = useNavigate();
    useEffect(()=> {
         const user= localStorage.getItem("token");
         if(user){
            navigate("/")
         }
    
      },[]);

    return (
        <>
        
        <Outlet/>
        </>
    )
}

export default AuthLayout;