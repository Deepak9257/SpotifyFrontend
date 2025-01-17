import { createContext } from "react";

const songContext = createContext({
    currentSong:null,
    setCurrentSong:(currentSong)=>{},
    currentIndex:null,
    setCurrentIndex:(currenIndex)=>{}
})

export default songContext;