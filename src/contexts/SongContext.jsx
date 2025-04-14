import { createContext } from "react";

const songContext = createContext({
    // current song state
    currentSong: null,
    setCurrentSong: (currentSong) => {},

    // current song index state
    currentIndex: null,
    setCurrentIndex: () => {},

    // state for display song container//
    songContainer: false,
    setSongContainer: () => {},

    //state for display full screen mode //
    fullMode: false,
    setFullMode: () => {},

    // global state for play/pause //
    isPlaying: false,
    setIsPlaying: (isplaying) => {},

    // global state for playing Id//
    playId: null,
    setPlayId: () => {},

    // global state for current song playing id
    audioId : null,
    setAudioId : () =>{},



})

export default songContext;