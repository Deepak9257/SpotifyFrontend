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
import MobNavbar from "../components/MobNavbar";

const AppLayout = () => {


    const { songContainer, currentSong } = useContext(songContext)
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
            <div className="h-100">



                <div className="d-flex mx-2 center-div gap-2 justify-content-xxl-between flex-grow-1">

                    <div className="rounded col-3 leftbar-container"

                        style={{ backgroundColor: "#121212" }}
                    >
                        <Leftbar user={user} />
                    </div>



                    <div className={`outlet-div flex-fill rounded`}
                        style={{
                            minWidth: '0',
                            background: '#121212',
                            height: '100%',
                         
                        }}
                    >

                     
                        <Outlet />
                    </div>

                    <div className={`rounded col-3 h-100 song-bar mob-d-none  ${songContainer && currentSong._id ? 'd-block' : 'd-none'}`}
                        style={{
                            background: '#121212',
                        }}
                    >
                        <NowPlayingBar />
                    </div>


                </div>

                {user2 && <MobNavbar />}
                
            </div>
            {user2 ? <MyMusicPlayer /> : <Bottom user={user} />}


        </>
    )
}

export default AppLayout;