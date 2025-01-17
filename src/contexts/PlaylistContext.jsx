import { createContext } from "react";


const playlistContext = createContext({
    currentPlaylist: null,
    setCurrentPlaylist:(currentPlaylist)=>{}

})

export default playlistContext