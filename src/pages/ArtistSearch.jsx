import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import PauseIcon from "../Icons/PauseIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import PlayIcon from "../Icons/PlayIcon";

const ArtistSearch = ({userId}) => {



    const { currentSong, setCurrentSong, setCurrentIndex, isPlaying, setIsPlaying, playId, setPlayId } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);



    const [result, setResult] = useState([]);
    const [oneArtist, setOneArtist] =useState({});

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = location.pathname.split("/")[2];
    console.log("song query:", query);
    useEffect(() => {
        const timer = setTimeout(() => {
            getResult();
            console.log("sending query:", query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const getResult = async () => {
        var res = await axios.get(
            `https://spotify-backend-blue.vercel.app/song/search/?search=` + query
        );

        res = res.data;

        setResult(res.data);
        setLoading(false);
    };


    const getUniqueAlbum = (data, name) => {
        let res = data.map((album) => {
            return album[name].name
        })

        res = [... new Set(res)]

        console.log(res)
        const uniqueData = res.map((artistName) => {
            return data.find((artist) => artist[name].name === artistName); // Return the full album object
        });

        console.log("Unique artist: ", uniqueData);

        return uniqueData;

    }

    const uniqueArtist = getUniqueAlbum(result, "artist");

   // funtion for loading screen
   if (loading) {
    return <div className="mx-1 p-5 justify-content-center  align-items-center  d-flex text-center gap-2 text-white p-3 rounded overflow-auto scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>
        <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
}

    if (result.length === 0 || !result) {
        return (
            <div
                className="mx-1 justify-content-between text-center gap-2 text-white p-3 rounded "
                style={{ backgroundColor: "#121212", height: "78vh" }}
            >
                <div className="fs-2 no-search ">No results found for "{query}"</div>{" "}
                <br />
                Please make sure your words are spelled correctly, or use fewer or
                different keywords.
            </div>
        );
    }

        // handle pause from any song/album //

        const handlePause = () => {
            setIsPlaying(false)
        }
    
        const handlePlay = (id) => {
    
            if (currentSong?.artist?._id === id || currentSong?.album?._id === id) {
                setIsPlaying(true)
            }
        }
    

    return (
        <>
            <div className="px-4">


                <div className="d-flex flex-wrap">
                    {uniqueArtist &&
                        uniqueArtist.map((song, index) => (
                            <div className="d-flex p " key={index}>

                                <div className="hvr-grey rounded p-2 ">

                                    <div className="pb-2">
                                        <img src={song?.artist?.image} alt="artist cover" className="rounded-pill object-fit-cover " height={185} width={195} />

                                    </div>
                                    <div className="text-wrap w-175" >{song?.artist?.name}</div>


                                    <div key={index} className="text-grey text-wrap w-175">Artist</div>

                                </div>
                               {/* play pause button */}
                               {userId
                                    // display when logined
                                    ? <div
                                        className={`play ${playId === song?.artist?._id && isPlaying ? 'opacity-100 translate-0' : ''}`}

                                        onClick={() => {
                                            setCurrentPlaylist(uniqueArtist),
                                            setCurrentSong(song),
                                            setCurrentIndex(0);
                                            setPlayId(song?.artist?._id)
                                        }}
                                    >
                                        {playId === song?.artist?._id && isPlaying ?
                                            <div
                                                className="pointer  smallPlayIcon2"
                                                onClick={handlePause}
                                            >
                                                <PauseIcon height={18} width={18} />
                                            </div>
                                            :
                                            <div className="pointer smallPlayIcon2 "
                                                onClick={() => handlePlay(song?.artist?._id)}
                                            >
                                                <PlayIcon height={18} width={18} />
                                            </div>

                                        }

                                    </div>

                                    // display when logged out

                                    : <div
                                        data-bs-toggle="modal"
                                        data-bs-target="#logoutModal"
                                        className="play"
                                        onClick={() => { setOneArtist(song) }}
                                    >
                                        <span className="smallPlayIcon2">

                                            <SmallPlayIcon />
                                        </span>

                                    </div>

                                }
                            </div>
                        ))}
                </div>

            </div>


             {/* modal on logout */}

             {oneArtist && <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog custom-modal-dialog  modal-dialog-centered">

                    <div className="custom-modal-content modal-content">

                        <div className="custom-modal-body modal-body p-5 d-flex gap-5 ">

                            <div className="col-5">
                                <img src={oneArtist.image} alt="artist image" className="rounded" width={300} height={300} />
                            </div>

                            <div className="text-white text-center py-5 col ">
                                <p className="fs-2 fw-bold"> Start listening with a free Spotify account</p>

                                <a href="/signup"><div className="py-3 px-4 text-black fw-bold btn rounded-pill text-black nav-login-btn green">Sign up for free</div>
                                </a>

                                <div className="mt-5 fw-bold text-secondary">

                                    <span className="me-2"> Already have an account?</span>

                                    <span className="">

                                        <a href="/login" className="wyt green-link">
                                            Login
                                        </a>
                                    </span>
                                </div>


                            </div>




                        </div>




                        <div className="text-center d-flex justify-content-center">
                            <div data-bs-dismiss="modal" className="text-center p-0 close fs-5 fw-bold">
                                Close
                            </div>
                        </div>






                    </div>


                </div>
            </div>}
        </>
    );
};

export default ArtistSearch;
