import axios from "axios";

import Bottom from "../components/Bottom";
import { useState, useEffect } from "react";
import RytBar from "../components/RytBar";
import Player from "../components/AudioPlayer";
import { useContext } from "react";
import songContext from "../contexts/createContext";


function Home() {

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
        var res = await axios.post("https://spotify-backend-ten.vercel.app/auth/getUser", { token });
        res = res.data;

        setUser(res.data);
        console.log("user", user)


    }

    const user2 = user?._id ? user : null;
    console.log('user2',user2 )

    return (
        <>
            <RytBar />
            <Bottom user={user} />
            {/* {user2 && <Player file={currentSong.songfile}  />} */}
        </>
    )


}

export default Home;