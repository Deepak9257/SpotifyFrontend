import { useContext } from "react"
import songContext from "../contexts/SongContext"

const NowPlayingBar = () => {

    const { currentSong, setSongContainer} = useContext(songContext)

    return <>

        <div 
        style={{ backgroundColor: "#121212", height: "80vh" }}
        className={`rounded scroll`}
        
        >
            <div className="px-2">
            
            <div className="py-3  d-flex justify-content-between align-items-center">
                <span className="text-white fw-bold">{currentSong?.album?.name}</span>
                <button onClick={()=>setSongContainer(false)} className="cross border-0 bg-transparent rounded-circle fs-6 text-grey"> &#10005; </button>
            </div>

        <div className="d-flex px-2 justify-content-center">
            <img src={currentSong?.image} alt="song image" width="100%" className="rounded object-fit-cover"/>
        </div>

        <div className="pt-3 text-white fw-bold">
            <h3>{currentSong.name}</h3>
        </div>

        <div className="text-grey fw-bold">
            <span>{currentSong?.artist?.name}</span>
        </div>

        </div>

        </div>
    </>
}

export default NowPlayingBar