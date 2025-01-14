import axios from "axios";

import Bottom from "../components/Bottom";
import { useState, useEffect } from "react";
import RytBar from "../components/RytBar";
import Player from "../components/AudioPlayer";
import { useContext } from "react";
import songContext from "../contexts/createContext";


function Home() {

    const {currentSong, setCurrentSong} = useContext(songContext);

    return (
        <>
            <RytBar />

        </>
    )


}

export default Home;