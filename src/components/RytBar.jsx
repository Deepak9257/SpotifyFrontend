import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlayIcon from "../Icons/PlayIcon";
import { Link } from "react-router-dom";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import PauseIcon from "../Icons/PauseIcon";
import SmallPlayIcon from "../Icons/SmallPlayIcon";

function RytBar({ user }) {


    const userId = user?._id ? user : null

    const [artist, setArtist] = useState([]);
    const [album, setAlbum] = useState([]);
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(true)
    const [playId, setPlayId] = useState(null)

    const [oneArtist, setOneArtist] = useState({})


    const { setCurrentSong, setCurrentIndex } = useContext(songContext);
    const { setCurrentPlaylist, currentPlaylist } = useContext(playlistContext)

    //Get All Artists
    useEffect(() => {
        getArtists();
    }, []);


    useEffect(() => {
        getArtistSongs();
        getAlbumsSongs();
        // console.log('rendered')

    }, [id])

    // console.log("id:", id)
    // console.log("artist songs:", currentPlaylist)


    const getArtistSongs = async () => {


        if (!id) {
            return;
        }

        var res = await axios.get("https://spotify-backend-blue.vercel.app/song/getAllByArtist/" + id)

        var res = res.data
        setCurrentPlaylist(res.data)
        setCurrentSong(res.data[0])
        setCurrentIndex(0)

    }



    const getAlbumsSongs = async () => {


        if (!id) {
            return;
        }

        var res = await axios.get("https://spotify-backend-blue.vercel.app/song/getAllByAlbum/" + id)

        var res = res.data
        setCurrentPlaylist(res.data)
        setCurrentSong(res.data[0])
        setCurrentIndex(0)

    }


    const getArtists = async () => {
        var res = await axios.get("https://spotify-backend-blue.vercel.app/artist/getAll");

        // console.log(res.data);

        setArtist(res.data.artistData);
        setLoading(false)
    };

    //Get All Albums

    useEffect(() => {
        getAlbums()
    }, [])

    const getAlbums = async () => {
        var res = await axios.get("https://spotify-backend-blue.vercel.app/album/getAll")
        setAlbum(res.data.albumData)
        setLoading(false)


    }


console.log(album)

    if (loading) {
        return (
            <>


                <div className="w-100 text-white container-fluid">
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
            <div className="w-100 text-white container-fluid">
                <div
                  
                    className="text-white rounded scroll "

                    style={{ backgroundColor: "#141414", height: "78vh" }}
                >
                    <div className="d-flex align-items-center px-4 pt-2">
                        <div className="col text-white">
                            <a
                                className="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
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

                    <div className="row px-4 ">
                        {artist &&
                            artist.slice(0, 6).map((item, index) => (
                                <div
                                    className="rounded div-size p hvr-artist py-2 position-relative my-3"
                                    key={index}
                                >
                                    <Link
                                        to={`/artist/${item._id}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="pb-4 d-flex justify-content-center">
                                          <div>
                                              <img
                                                src={item.image}
                                                alt="artist image"
                                                className="rounded-circle  object-fit-cover"
                                                height={150}
                                                width={150}
                                            />
                                          </div>
                                        </div>
                                        <span className="text-white"> {item.name} </span> <br />
                                        <span className="text-secondary"> {item.category} </span>
                                    </Link>

                                    {!userId ? <div
                                        className="play"

                                        onClick={() => { setOneArtist(item);  }}

                                    >
                                        <div
                                            data-bs-toggle="modal"
                                            data-bs-target="#logoutModal"
                                            className="pointer smallPlayIcon2"

                                        >
                                            <SmallPlayIcon />
                                        </div>

                                    </div> :
                                        <div
                                            className="play"

                                            onClick={() => { setId(item._id), setPlayId(item._id); }}
                                        >
                                            <div
                                                className="pointer smallPlayIcon2"

                                            >
                                                <SmallPlayIcon />
                                            </div>

                                        </div>}
                                </div>
                            ))}
                    </div>

                    {/* album section */}

                    <div className="d-flex align-items-center px-2">
                        <div className="col text-white">
                            <a
                                className="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
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

                    <div className="row px-4">
                        {album &&
                            album.slice(0, 6).map((item, index) => (
                               
                                <div
                                    className="rounded hvr-artist div-size p py-2 my-3 position-relative"
                                    key={index}
                                >
                                    <Link
                                        to={`/album/${item._id}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="d-flex justify-content-center pb-4">
                                           <div>
                                           <img
                                                src={item.image}
                                                alt="album image"
                                                className="rounded object-fit-cover"
                                                height={150}
                                                width={150}
                                            />
                                           </div>
                                        </div>
                                        <div className="text-white">
                                            <span className="">{item.name} </span> <br />
                                            
                                        </div>
                                    </Link>
                                    {!userId ? <div
                                        className="play"

                                        onClick={() => { setOneArtist(item);  }}

                                    >
                                        <div
                                            data-bs-toggle="modal"
                                            data-bs-target="#logoutModal"
                                            className="pointer smallPlayIcon2"

                                        >
                                            <SmallPlayIcon />
                                        </div>

                                    </div> :
                                        <div
                                            className="play "

                                            onClick={() => { setId(item._id), setPlayId(item._id); }}
                                        >
                                            <div
                                                className="pointer smallPlayIcon2"

                                            >
                                                <SmallPlayIcon />
                                            </div>

                                        </div>}
                                </div>
                            ))}
                    </div>
                </div>
            </div>


            {/* modal on logout */}

            {oneArtist && <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">

                    <div className="modal-content">

                        <div className="modal-body p-5 d-flex gap-5 ">

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

