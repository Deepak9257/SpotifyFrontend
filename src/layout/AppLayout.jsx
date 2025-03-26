import { Outlet } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Player from "../components/AudioPlayer";

import axios from 'axios'
import Bottom from "../components/Bottom";

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
        var res = await axios.post("https://spotify-backend-blue.vercel.app/auth/getUser", {token});
        res = res.data;
        
        setUser(res.data);
       
        
       }


       const user2 = user?._id ? user : null;


    return (
        <>

            <Navbar user={user}/>
            <Leftbar user={user}/>
            <Outlet/>
            <Bottom user={user}/>
            {user2 && <Player/>}
            
        </>
    )
}

export default AppLayout;