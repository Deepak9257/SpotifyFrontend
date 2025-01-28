import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SmallPlayIcon from "../Icons/SmallPlayIcon";

const Search = () => {

    const [result, setResult] = useState([]);

    const [loading, setLoading] = useState(true)
    const [playId, setPlayId] = useState(null)

    const location = useLocation()
    const query = location.pathname.split('/search/')[1]
    console.log(query)
    useEffect(() => {
        const timer = setTimeout(() => {
            getResult()
            console.log('sending query:', query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);



    const getResult = async () => {

        var res = await axios.get(`https://spotify-backend-blue.vercel.app/song/search/?search=` + query)

        res = res.data
        console.log("search Data :", res.data)
        setResult(res.data)
        setLoading(false)

    }

    if (loading) {
        return <div className="mx-1 p-5 justify-content-between text-center gap-2 text-white p-3 rounded overflow-auto scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>
            Loading.....
        </div>
    }



    if (result.length === 0 || !result) {
        return <div className="mx-1 justify-content-between text-center gap-2 text-white p-3 rounded overflow-auto scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>

            <div className="fs-2 no-search ">
                No results found for  "{query}"
            </div> <br />
            Please make sure your words are spelled correctly, or use fewer or different keywords.</div>
    }



    return (<>




        <div className="px-4">


            <div className="d-flex fw-bold">

                <div className="p-3 col-5">

                    <div className="fs-3 mb-2">  Top result </div>

                    {
                        <div className="top-result p-3 rounded" >

                            <img className="rounded-circle " width={100} height={100} src={result.length === 0 ? "" : result[0].artist.image} alt="" srcset="" /> <br />

                            <span className="fs-1 ">

                                {result && result.length === 0 ? "" : result[0].artist.name}

                            </span> <br />

                            <span> Artist </span>


                        </div>}

                </div>


                <div className="col pt-3 ">


                    <div className="fs-3">  Songs </div>

                    {result && result.slice(0, 4).map((song, index) => (

                        <>

                                <div key={index} className="" >

                                    <div className="d-flex my-2 song-div rounded px-2 align-items-center ">

                                        {/* song name/image  div */}
                                        <div className="d-flex col align-items-center">

                                            <div >
                                                <img src={song.image} alt="song Image" height={40} className="rounded" />
                                            </div>

                                            <div className="px-2">
                                                <span> {song.name} </span> <br />
                                                <span> {song.artist.name} </span>
                                            </div>
                                        </div>

                                        {/* time div */}
                                        <div className="col-1 me-2" >
                                            {song.time}
                                        </div >


                                    </div>

                                </div>
                        </>
                    ))}

                </div>


            </div>

            {/* Artist Section */}

            <div className="col text-white">
                <a
                    class="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="#"
                >
                    Artists
                </a>
            </div>

            <div className="row mx-auto px-3 justify-content-evenly">
                {result &&
                    result.slice(0, 6).map((song, index) => (
                        <div
                            className="rounded col-2 p hvr-artist py-2 position-relative my-3"
                            key={index}
                        >
                            <Link
                                to={`/artist/${song.artist._id}`}
                                className="text-decoration-none"
                            >
                                <div className="d-flex justify-content-center pb-4">
                                    <img
                                        src={song.artist.image}
                                        alt="hi"
                                        className="rounded-circle shadow object-fit-cover"
                                        height={"150px"}
                                        width={"150px"}
                                    />
                                </div>
                                <span className="text-white"> {song.artist.name} </span> <br />
                                <span className="text-secondary">Artist</span>
                            </Link>

                            <div
                                className="play"
                                onClick={() => {
                                    setId(song._id), setPlayId(song._id);
                                }}
                            >
                                {playId === song._id ? (
                                    <div

                                    >
                                        <PauseIcon />
                                    </div>
                                ) : (
                                    <div
                                        className="smallPlayIcon2"

                                    >
                                        <SmallPlayIcon />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>


            {/* ALbum Section */}

            <div className="col text-white">
                <a
                    class="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="#"
                >
                    Albums
                </a>
            </div>

            <div className="row mx-auto px-3 justify-content-evenly">
                {result &&
                    result.slice(0, 6).map((song, index) => (
                        <div
                            className="rounded col-2 p hvr-artist py-2 position-relative my-3"
                            key={index}
                        >
                            <Link
                                to={`/artist/${song.album._id}`}
                                className="text-decoration-none"
                            >
                                <div className="d-flex justify-content-center pb-4">
                                    <img
                                        src={song.album.image}
                                        alt="hi"
                                        className="rounded-circle shadow object-fit-cover"
                                        height={"150px"}
                                        width={"150px"}
                                    />
                                </div>
                                <span className="text-white"> {song.album.name} </span> <br />
                                <span className="text-secondary"> Album </span>
                            </Link>
                            <div
                                className="play"
                                onClick={() => {
                                    setId(song._id), setPlayId(song._id);
                                }}
                            >
                                {playId === song._id ? (
                                    <div

                                    >
                                        <PauseIcon />
                                    </div>
                                ) : (
                                    <div
                                        className="smallPlayIcon2"

                                    >
                                        <SmallPlayIcon />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>


        </div>





    </>)

}

export default Search;