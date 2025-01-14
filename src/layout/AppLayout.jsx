import { Outlet } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import Player from "../components/AudioPlayer";

import songContext from "../contexts/createContext";

import axios from 'axios'
import Bottom from "../components/Bottom";

const AppLayout = () => {


    const {currentSong, setCurrentSong} = useContext(songContext);

    const [user, setUser] = useState({});

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user) {
            getUser();

        }

    }, []);


    const getUser = async () => {
    
        const token = localStorage.getItem("token");
        var res = await axios.post("https://spotify-backend-ten.vercel.app/auth/getUser", {token});
        res = res.data;
        
        setUser(res.data);
       
        
       }



       const user2 = user?._id ? user : null;
       console.log('user2',user2 )

    return (
        <>

            <Navbar user={user}/>
            <Leftbar user={user}/>
            <Outlet />
            <Bottom user={user} />
            {user2 && <Player file={currentSong.songfile}  />}
            
        </>
    )
}

export default AppLayout;