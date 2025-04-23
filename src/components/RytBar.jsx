import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import PlayIcon from "../Icons/PlayIcon";
import { Link } from "react-router-dom";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import PauseIcon from "../Icons/PauseIcon";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import ScrollBar from "./ScrollBar";
import HorizontalScroller from "./HorizontallScroller";

function RytBar({ user }) {


    const userId = user?._id ? user : null

    const [artist, setArtist] = useState([]);
    const [album, setAlbum] = useState([]);
    const [artistId, setArtistId] = useState("");
    const [albumId, setAlbumId] = useState("");
    const [loading, setLoading] = useState(true);
    const [oneArtist, setOneArtist] = useState({});


    const { currentSong, setCurrentSong, setCurrentIndex, isPlaying, setIsPlaying, playId, setPlayId } = useContext(songContext);
    const { setCurrentPlaylist, currentPlaylist } = useContext(playlistContext)


    // get all artist and albums

    useEffect(() => {
        getArtists();
        getAlbums()
    }, []);


    const getArtists = async () => {
        var res = await axios.get("https://spotify-backend-blue.vercel.app/artist/getAll");

        // console.log(res.data);

        setArtist(res.data.artistData);
        setLoading(false)
    };

    const getAlbums = async () => {
        var res = await axios.get("https://spotify-backend-blue.vercel.app/album/getAll")
        setAlbum(res.data.albumData)
        setLoading(false)


    }

    // get song by artist and album

    useEffect(() => {

        if (artistId) {
            getArtistSongs();
        }

        if (albumId) {
            getAlbumSongs();
        }

    }, [artistId, albumId])


    // funtion for get artist songs by ID //
    const getArtistSongs = async () => {

        if (!artistId) {
            return;
        }

        var res = await axios.get("https://spotify-backend-blue.vercel.app/song/getAllByArtist/" + artistId)

        var res = res.data;
        setCurrentPlaylist(res.data);
        setCurrentSong(res.data[0]);
        setCurrentIndex(0);


    }

    // funtion for get album songs by ID //

    const getAlbumSongs = async () => {


        if (!albumId) {
            return;
        }

        var res = await axios.get("https://spotify-backend-blue.vercel.app/song/getAllByAlbum/" + albumId)

        var res = res.data;
        setCurrentPlaylist(res.data);
        setCurrentSong(res.data[0]);
        setCurrentIndex(0);

    }


    // handle play pause from any song/album //

    const handlePause = () => {
        setIsPlaying(false)
    }


    const handlePlay = (id) => {

        if (currentSong?.artist?._id === id || currentSong?.album?._id === id) {
            setIsPlaying(true)
        }
    }

    // handle artist ID change //

    const handleArtistIdChange = (id) => {

        if (currentSong?.artist?._id !== id) {
            setArtistId(id);
        }
    }

    //  handle album ID change //
    const handleAlbumIdChange = (id) => {

        if (currentSong?.album?._id !== id) {
            setAlbumId(id);
        }
    }
    // loading funciton //
    if (loading) {
        return (
            <>


                <div className="w-100 text-white container-flutimeoutId">
                    <div
                        className="text-white rounded overflow-auto scroll"
                        style={{ backgroundColor: "#141414", height: "78vh" }}
                    >

                        <div className="text-center text-success loading-hyt d-flex align-items-center justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden"> Loading... </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )


    }




    return (
        <>
            <div className="text-white">

                <ScrollBar customClassName={'rounded'} height={'80vh'}>

                    <div

                        className="text-white rounded  "

                        style={{ backgroundColor: "#141414" }}
                    >
                        <div className="d-flex align-items-center px-4 pt-2">
                            <div className="col text-white">
                                <a
                                    className="fw-bold text-nowrap fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                                    href="#"
                                >
                                    Popular artists
                                </a>
                            </div>

                            <div className="col text-end">
                                <a
                                    className="link-offset-2 link-offset-3-hover text-white text-end link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                                    href="#"
                                >
                                    Show all
                                </a>
                            </div>
                        </div>

                        {/* artist section */}

                        <div className="px-2">
                            <HorizontalScroller>
                                {artist &&
                                    artist.map((artist, index) => (
                                        <div
                                            className="rounded div-size flex-grow-1 px-2 p hvr-artist py-2 position-relative"
                                            key={index}


                                        >
                                            <Link
                                                to={`/artist/${artist._id}`}
                                                className="text-decoration-none"
                                            >
                                                <div className="pb-4 d-flex justify-content-center">
                                                    <div className="row-image">
                                                        <img
                                                            src={artist.image}
                                                            alt="artist image"
                                                            className="rounded-circle  object-fit-cover"
                                                            height={150}
                                                            width={150}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white  text-overflow"> {artist.name} </div>
                                            </Link>

                                            {!userId
                                                //display when logout

                                                ? <div
                                                    className="play"
                                                    onClick={() => { setOneArtist(artist); }}

                                                >
                                                    <div
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#logoutModal"
                                                        className="pointer smallPlayIcon2"

                                                    >
                                                        <SmallPlayIcon />
                                                    </div>

                                                </div>

                                                //display when logined
                                                :
                                                <div
                                                    className={`play ${playId === artist._id && currentSong?.artist?._id === artist._id && isPlaying ? 'opacity-100 translate-0' : ''}`}

                                                    onClick={() => { handleArtistIdChange(artist._id), setPlayId(artist._id); }}
                                                >
                                                    {playId === artist._id && isPlaying ?
                                                        <div
                                                            className="pointer  smallPlayIcon2"
                                                            onClick={handlePause}
                                                        >
                                                            <PauseIcon height={18} width={18} />
                                                        </div>
                                                        :
                                                        <div className="pointer smallPlayIcon2 "
                                                            onClick={() => handlePlay(artist._id)}
                                                        >
                                                            <PlayIcon height={18} width={18} />
                                                        </div>

                                                    }



                                                </div>}
                                        </div>
                                    ))}
                            </HorizontalScroller>
                        </div>

                        {/* album section */}

                        <div className="d-flex align-items-center px-4 mt-2">
                            <div className="col text-white">
                                <a
                                    className="fw-bold text-nowrap fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                                    href="#"
                                >
                                    Popular albums
                                </a>
                            </div>

                            <div className="col text-end">
                                <a
                                    className="link-offset-2 link-offset-3-hover text-white text-end link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                                    href="#"
                                >
                                    Show all
                                </a>
                            </div>
                        </div>

                        <div className="px-2 py-2">
                            <HorizontalScroller>

                                {album &&
                                    album.map((item, index) => (

                                        <div
                                            className="rounded hvr-artist div-size flex-grow-1 p py-2 px-2  position-relative"
                                            key={index}
                                        >
                                            <Link
                                                to={`/album/${item._id}`}
                                                className="text-decoration-none"
                                            >
                                                <div className="d-flex justify-content-center pb-4">
                                                    <div className="row-image">
                                                        <img
                                                            src={item.image}
                                                            alt="album image"
                                                            className="rounded object-fit-cover"
                                                            height={150}
                                                            width={150}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-overflow">
                                                    {item.name}
                                                </div>
                                            </Link>
                                            {!userId
                                                // display when logout
                                                ? <div
                                                    className="play"

                                                    onClick={() => { setOneArtist(item); }}

                                                >
                                                    <div
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#logoutModal"
                                                        className="pointer smallPlayIcon2"

                                                    >
                                                        <SmallPlayIcon />
                                                    </div>

                                                </div>

                                                // display when login
                                                : <div
                                                    className={`play ${playId === item._id && currentSong?.album?._id === item._id && isPlaying ? 'opacity-100 translate-0' : ''}`}


                                                    onClick={() => { handleAlbumIdChange(item._id), setPlayId(item._id); }}
                                                >
                                                    {playId === item._id && currentSong?.album?._id === item._id && isPlaying ?
                                                        <div
                                                            className="pointer smallPlayIcon2"
                                                            onClick={handlePause}
                                                        >
                                                            <PauseIcon height={18} width={18} />
                                                        </div>
                                                        :
                                                        <div className="pointer smallPlayIcon2"
                                                            onClick={() => handlePlay(item._id)}
                                                        >
                                                            <PlayIcon height={18} width={18} />
                                                        </div>}
                                                </div>}
                                        </div>
                                    ))}

                            </HorizontalScroller>
                        </div>
                    </div>
                </ScrollBar>

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
}

export default RytBar;

