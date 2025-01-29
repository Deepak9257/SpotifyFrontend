import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import AddIcon from "../Icons/AddIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";

const SongSearch = () => {



    const { setCurrentSong, setCurrentIndex } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);




    const [result, setResult] = useState([]);

    const [loading, setLoading] = useState(true);
    const [playId, setPlayId] = useState(null);

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

    if (loading) {
        return (
            <div
                className="mx-1 p-5 justify-content-between text-center gap-2 text-white p-3 rounded overflow-auto scroll"
                style={{ backgroundColor: "#121212", height: "78vh" }}
            >
                Loading.....
            </div>
        );
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

    return (
        <>
            <div className="px-4">
                <div className="search-title-bar justify-content-between">
                    <div className="d-flex">
                        <div className="px-4">#</div>
                        <div className="col-6">Title </div>
                        <div className="col-5">Album</div>
                        <div className="col"><i class="far fa-clock"></i></div>
                    </div>
                </div>
                <hr />

                <div >
                    {result &&
                        result.slice(0, 4).map((song, index) => (
                            <>

                                <div className="song-bar position-relative  d-flex align-items-center rounded py-1">
                                    <div className="px-4 song-index">{index + 1}</div>
                                    <div className="col-6">

                                        <div className="d-flex col align-items-center">

                                            <div className="d-flex align-items-center">

                                                <img src={song.image} alt="song Image" height={40} className="rounded" />

                                                <span className="search-song-play-icon"
                                                 onClick={() => {
                                                    {
                                                      setCurrentIndex(index),
                                                        setCurrentSong(song),
                                                        setCurrentPlaylist(result);
                                                    }
                                                  }}
                                                
                                                
                                                
                                                >
                                                <SmallPlayIcon/>
                                                </span>
                                            </div>

                                            <div className="px-2">
                                                <span> {song.name} </span> <br />
                                                <span> {song.artist.name} </span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-5">{song?.album?.name}</div>
                                    <span className="addIcon3">
                                    <AddIcon />
                                    </span>
                                    <div className="col">3.7</div>
                                </div>

                               

                            </>
                        ))}
                </div>

            </div>
        </>
    );
};

export default SongSearch;
