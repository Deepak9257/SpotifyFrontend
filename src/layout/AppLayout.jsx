import { Outlet } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import Player from "../components/AudioPlayer";

import axios from 'axios'
import Bottom from "../components/Bottom";
import MyMusicPlayer from "../components/MusicPlayer";
import NowPlayingBar from "../components/NowPlayingBar";
import songContext from "../contexts/SongContext";

const AppLayout = () => {


    const {songContainer, currentSong} = useContext(songContext)
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user) {
            getUser();

        }

    }, []);


    const getUser = async () => {

        const token = localStorage.getItem("token");
        var res = await axios.post("https://spotify-backend-blue.vercel.app/auth/getUser", { token });
        res = res.data;

        setUser(res.data);


    }


    const user2 = user?._id ? user : null;


    return (
        <>

            <Navbar user={user} />
{/* center part of the screen */}
            <div className="d-flex mx-2 gap-2">
              
                <div className="rounded">
                <Leftbar user={user} />
                </div>

               <div className={`rounded ${songContainer && currentSong._id ? 'w-75' : 'outlet'}`}>
               <Outlet />
               </div>

                <div className={`rounded w-25 ${songContainer && currentSong._id ?'d-block':'d-none'}`}>
                <NowPlayingBar />
                </div>
            </div>

            {user2 ? <MyMusicPlayer /> : <Bottom user={user} />}

        </>
    )
}

export default AppLayout;