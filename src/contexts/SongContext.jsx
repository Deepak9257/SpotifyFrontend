import { createContext } from "react";

const songContext = createContext({
    // current song state
    currentSong: null,
    setCurrentSong: () => { },
    // current song index state

    currentIndex: null,
    setCurrentIndex: () => { },

    // state for display song container//
    songContainer: false,
    setSongContainer: () => { },

    //state for display full screen mode //
    fullMode: false,
    setFullMode: () => { },

    // global state for play/pause //
    isPlaying: false,
    setIsPlaying: () => { }

})

export default songContext;