import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlayIcon from "../Icons/PlayIcon";
import { Link } from "react-router-dom";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import PauseIcon from "../Icons/PauseIcon";
import SmallPlayIcon from "../Icons/SmallPlayIcon";

function RytBar() {
    const [artist, setArtist] = useState([]);
    const [album, setAlbum] = useState([]);
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(true)
    const [playId, setPlayId] = useState(null)


    const { setCurrentSong, setCurrentIndex } = useContext(songContext);
    const { setCurrentPlaylist, currentPlaylist } = useContext(playlistContext)

    //Get All Artists
    useEffect(() => {
        getArtists();
    }, []);


    useEffect(() => {
        getArtistSongs();

        console.log('rendered')

    }, [id])

    console.log("id:", id)
    console.log("artist songs:", currentPlaylist)


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

    const getArtists = async () => {
        var res = await axios.get("https://spotify-backend-blue.vercel.app/artist/getAll");

        console.log(res.data);

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

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    if (loading) {
        return (
            <>


                <div className="w-100 text-white container-fluid">
                    <div
                        className="text-white rounded overflow-auto scroll"
                        style={{ backgroundColor: "#141414", height: "78vh" }}
                    >

                        <div class="text-center text-success loading-hyt d-flex align-items-center justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden"> Loading... </span>
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
                    className="text-white rounded overflow-auto scroll"
                    style={{ backgroundColor: "#141414", height: "78vh" }}
                >
                    <div className="d-flex align-items-center px-4 pt-2">
                        <div className="col text-white">
                            <a
                                class="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                                href="#"
                            >
                                Popular artists
                            </a>
                        </div>

                        <div className="col text-end">
                            <a
                                class="link-offset-2 link-offset-3-hover text-white text-end link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                                href="#"
                            >
                                Show all
                            </a>
                        </div>
                    </div>

                    {/* artist section */}

                    <div className="row mx-auto px-3 justify-content-evenly">
                        {artist &&
                            artist.slice(0, 6).map((item, index) => (
                                <div
                                    className="rounded col-2 p hvr-artist py-2 position-relative my-3"
                                    key={index}
                                >
                                    <Link
                                        to={`/artist/${item._id}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="d-flex justify-content-center pb-4">
                                            <img
                                                src={item.image}
                                                alt="hi"
                                                className="rounded-circle shadow object-fit-cover"
                                                height={"150px"}
                                                width={"150px"}
                                            />
                                        </div>
                                        <span className="text-white"> {item.name} </span> <br />
                                        <span className="text-secondary"> {item.category} </span>
                                    </Link>
                                    <div
                                        className="play"
                                        onClick={() => {
                                            setId(item._id), setPlayId(item._id);
                                        }}
                                    >
                                        {playId === item._id ? (
                                            <div
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title={`Pause ${item.name}`}
                                            >
                                                <PauseIcon />
                                            </div>
                                        ) : (
                                            <div
                                                className="smallPlayIcon2"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title={`Play ${item.name}`}
                                            >
                                                <SmallPlayIcon />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* album section */}

                    <div className="d-flex align-items-center px-2">
                        <div className="col text-white">
                            <a
                                class="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                                href="#"
                            >
                                Popular albums
                            </a>
                        </div>

                        <div className="col text-end">
                            <a
                                class="link-offset-2 link-offset-3-hover text-white text-end link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                                href="#"
                            >
                                Show all
                            </a>
                        </div>
                    </div>

                    <div className="row mx-auto px-3 justify-content-evenly">
                        {album &&
                            album.slice(0, 6).map((item, index) => (
                                <div
                                    className="rounded hvr-artist p col-2 py-2 my-3 position-relative"
                                    key={index}
                                >
                                    <Link
                                        to={`/album/${item._id}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="d-flex justify-content-center pb-4 ">
                                            <img
                                                src={item.image}
                                                alt="hi"
                                                className="rounded object-fit-cover"
                                                height={"150px"}
                                                width={"150px"}
                                            />
                                        </div>
                                        <div className="text-white underline">
                                            <span className="">{item.albumName} </span> <br />
                                            <span>{item.artistName}</span>
                                        </div>
                                    </Link>
                                    <div
                                        className="play"
                                        onClick={() => {
                                            setId(item._id), setPlayId(item._id);
                                        }}
                                    >
                                        {playId === item._id ? (
                                            <div
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title={`Pause ${item.name}`}
                                            >
                                                <PauseIcon />
                                            </div>
                                        ) : (
                                            <div
                                                className="smallPlayIcon2"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title={`Play ${item.name}`}
                                            >
                                                <SmallPlayIcon />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RytBar;

