import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import AddIcon from "../Icons/AddIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import PauseIcon from "../Icons/PauseIcon";

const SongSearch = ({ userId }) => {



    const {
        currentSong,
        setCurrentSong,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
        playId,
        setPlayId,
        audioId
    } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);




    const [result, setResult] = useState([]);

    const [loading, setLoading] = useState(true);
    const [oneArtist, setOneArtist] = useState({});


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
        console.log("search Data :", res.data);
        setResult(res.data);
        setLoading(false);
    };

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
                className="mx-1 justify-content-between text-center gap-2 text-white p-3 rounded overflow-auto scroll"
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

    // handle song change and play from song 

    const handleSongChangeOrPlay = (currSong, idx) => {
        if (audioId === currSong?._id) {
            handlePlay(currSong?.artist?._id);
        } else {
            setCurrentIndex(idx),
                setCurrentSong(currSong),
                setCurrentPlaylist(result);
            setPlayId(Artist?._id)
        }
    }

    return (
        <>
            <div className="px-4">
                <div className="search-title-bar justify-content-between">
                    <div className="d-flex">
                        <div className="px-4">#</div>
                        <div className="col-6">Title </div>
                        <div className="flex-fill">Album</div>
                        <div className="col-2 text-end pe-3"><i class="far fa-clock"></i></div>
                    </div>
                </div>
                <hr />

                <div >
                    {result &&
                        result.map((song, index) => (
                            <>

                                <div className="song-bar position-relative  d-flex align-items-center rounded py-1">
                                    <div className="px-4 d-flex justify-content-center align-items-center">

                                        <div className="song-index">
                                            {index + 1}
                                        </div>

                                        {userId ? <span className="search-song-play-icon">

                                            {audioId === song?._id && isPlaying ? (
                                                <span onClick={handlePause}>

                                                    <PauseIcon height={18} width={18} />
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={() => {
                                                        handleSongChangeOrPlay(song, index);

                                                    }}
                                                >

                                                    <SmallPlayIcon height={18} width={18} />
                                                </span>
                                            )}
                                        </span> :
                                            <span
                                                data-bs-toggle="modal"
                                                data-bs-target="#logoutModal"
                                                className="search-song-play-icon"
                                                onClick={() => { setOneArtist(song) }}


                                            >
                                                <SmallPlayIcon />
                                            </span>
                                        }


                                    </div>




                                    <div className="col-6">

                                        <div className="d-flex col align-items-center">

                                            <div className="d-flex align-items-center">

                                                <img src={song.image} alt="song Image" height={40} className="rounded" />




                                            </div>

                                            <div className="px-2">
                                                <span className={`${audioId === song?._id ? "text-green" : ""}`}> {song.name} </span> <br />
                                                <span> {song.artist.name} </span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex-fill">{song?.album?.name}</div>

                                    <div className="col-2 d-flex justify-content-between ">
                                        <span className="addIcon3">
                                            <AddIcon />
                                        </span>
                                        <span>
                                            {song?.time}
                                        </span>
                                    </div>
                                </div>



                            </>
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

export default SongSearch;
