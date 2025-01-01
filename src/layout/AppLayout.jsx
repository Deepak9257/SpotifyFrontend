import { Outlet } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from 'axios'

const AppLayout = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user) {
            getUser();

        }

    }, []);


    const getUser = async () => {
    
        const token = localStorage.getItem("token");
        var res = await axios.post("http://spotifybackend.ap-1.evennode.com//auth/getUser", {token});
        res = res.data;
        
        setUser(res.data);
       
        
       }

    return (
        <>

            <Navbar user={user}/>
            <Leftbar />
            <Outlet />
            

        </>
    )
}

export default AppLayout;