import { createContext } from "react";


const playlistContext = createContext({
    currentPlaylist: null,
    setCurrentPlaylist: (currentPlaylist) => {},

    // global state for current playing playlist ID

    playlistId: null,
    setPlaylistId: (playlistId) => {},

})

export default playlistContext;