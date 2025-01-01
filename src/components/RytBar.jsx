import { useEffect, useState } from "react";
import axios from "axios";
import PlayIcon from "../Icons/PlayIcon";
import { Link } from "react-router-dom";

function RytBar() {
    const [artist, setArtist] = useState([]);
    const [album, setAlbum] = useState([]);
    const [loading, setLoading] = useState(true)

    //Get All Artists
    useEffect(() => {
        getArtists();
    }, []);

    const getArtists = async () => {
        var res = await axios.get("http://spotifybackend.ap-1.evennode.com//artist/getAll");

        console.log(res.data);

        setArtist(res.data.artistData);
        setLoading(false)
    };

    //Get All Albums

    useEffect(() => {
        getAlbums()
    }, [])

    const getAlbums = async () => {
        var res = await axios.get("http://spotifybackend.ap-1.evennode.com//album/getAll")
        setAlbum(res.data.albumData)
        setLoading(false)


    }

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
                                <div className="rounded col-2 p hvr-artist py-2 position-relative my-3" key={index}>
                                    <Link to={`/artist/${item._id}`} className="text-decoration-none">
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

                                        <div className="play">
                                            <PlayIcon />
                                        </div>
                                    </Link>
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
                                <div className="rounded hvr-artist p col-2 py-2 my-3 position-relative" key={index}>
                                    <Link to={`/album/${item._id}`} className="text-decoration-none">
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
                                        <div className="play">
                                            <PlayIcon />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RytBar;

