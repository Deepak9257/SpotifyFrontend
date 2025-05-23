import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import AddIcon from "../Icons/AddIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import HorizontalScroller from "../components/HorizontallScroller";
import PauseIcon from "../Icons/PauseIcon";
import PlayIcon from "../Icons/PlayIcon";

const AllSearch = ({ userId }) => {


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
    const [oneArtist, setOneArtist] = useState({});


    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const query = location.pathname.split('/search/')[1]
    console.log(query)

    useEffect(() => {
        const timer = setTimeout(() => {
            getResult()

        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // get result of all songs
    const getResult = async () => {

        var res = await axios.get(`https://spotify-backend-blue.vercel.app/song/search/?search=` + query)

        res = res.data
        setResult(res.data)
        setLoading(false)

    }

    // function to remove the duplicate artists songs and return the unique artist 
    const getUniqueData = (data, artist) => {
        console.log('render uniqueData')
        let res = data.map((item) => {
            return item[artist].name
        })

        res = [... new Set(res)]

        const uniqueArtist = res.map((artistName) => {
            return data.find((item) => item[artist].name === artistName)
        })
        return uniqueArtist;
    }

    const uniqueData = getUniqueData(result, "artist")

    // funtion for loading screen
    if (loading) {
        return <div className="mx-1 p-5 justify-content-center  align-items-center  d-flex text-center gap-2 text-white p-3 rounded overflow-auto scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    }


    if (result.length === 0 || !result) {
        return <div className="mx-1 justify-content-between text-center gap-2 text-white p-3 rounded overflow-auto scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>

            <div className="fs-2 no-search ">
                No results found for  "{query}"
            </div> <br />
            Please make sure your words are spelled correctly, or use fewer or different keywords.</div>
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

    const { q } = useParams()
    const query2 = q || ""

    console.log(playId, currentSong?.artist?._id)


    return (<>

        {/* for small screen */}

          {/* artists */}
        <div className="flex-fill  d-none mob-d-block">

            {uniqueData && uniqueData.slice(0, 4).map((song, index) => (

                <>
                    <Link
                        to={`/artist/${song.artist._id}`}
                        className="text-decoration-none text-white"
                    >

                        <div key={index} className="search-song-div" >

                            <div className="d-flex song-div rounded p-1 px-2 align-items-center ">


                                <div className="d-flex col align-items-center">

                                    <div className="d-flex align-items-center justify-content-center">

                                        <img src={song?.artist?.image} alt="song Image" height={42} width={42} className="rounded-circle" />

                                    </div>

                                    <div className="px-2">
                                        <span> {song?.artist?.name} </span> <br />
                                        <span className="text-grey"> Artist </span>
                                    </div>
                                </div>







                            </div>

                        </div>

                    </Link>
                </>
            ))}

        </div>

           {/* songs */}
        <div className="flex-fill   d-none mob-d-block">

            {result && result.slice(0, 4).map((song, index) => (

                <>
                    <div key={index} className="search-song-div" >

                        <div className="d-flex song-div rounded p-1 px-2 align-items-center ">

                            {/* song name/image  div */}
                            <div className="d-flex col align-items-center">

                                <div className="d-flex align-items-center justify-content-center">

                                    <img src={song.image} alt="song Image" height={42} className="rounded" />

                                    {userId

                                        ? <span className="search-play-icon">

                                            {audioId === song?._id && isPlaying ? (
                                                <span onClick={handlePause}>

                                                    <PauseIcon height={24} width={24} />
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={() => {
                                                        handleSongChangeOrPlay(song, index);

                                                    }}
                                                >

                                                    <SmallPlayIcon height={24} width={24} />
                                                </span>
                                            )}
                                        </span>


                                        : <span
                                            data-bs-toggle="modal"
                                            data-bs-target="#logoutModal"

                                            className="search-play-icon"
                                            onClick={() => { setOneArtist(song) }}


                                        >
                                            <SmallPlayIcon />
                                        </span>}
                                </div>

                                <div className="px-2">
                                    <span className={`${audioId === song?._id ? "text-green" : ""}`}> {song.name} </span> <br />
                                    <span className="text-grey"> {song.artist.name} </span>
                                </div>
                            </div>

                          
                            <div className="col-1 me-2" >
                                
                                <AddIcon />
                            </div >




                        </div>

                    </div>

                </>
            ))}

        </div>

      



  {/* albums */}
        <div className="flex-fill  d-none mob-d-block">

            {uniqueData && uniqueData.slice(0, 4).map((song, index) => (

                <>
                    <Link
                        to={`/album/${song?.album?._id}`}
                        className="text-decoration-none text-white"
                    >

                        <div key={index} className="search-song-div" >

                            <div className="d-flex song-div rounded p-1 px-2 align-items-center ">


                                <div className="d-flex col align-items-center">

                                    <div className="d-flex align-items-center justify-content-center">

                                        <img src={song?.album?.image} alt="song Image" height={42} width={42} className="rounded" />

                                    </div>

                                    <div className="px-2">
                                        <span> {song?.album?.name} </span> <br />
                                        <span className="text-grey"> Album </span>
                                    </div>
                                </div>







                            </div>

                        </div>

                    </Link>
                </>
            ))}

        </div>

     

         


        {/* for big screens */}
        <div className="px-4 mob-d-none">

            <div className="d-flex fw-bold flex-wrap">

                <div className="px-3 py-4 flex-fill"
                    style={{
                        minWidth: '500px',
                        maxWidth: '500px'
                    }}
                >

                    <div className="fs-3 mb-2">  Top result </div>

                    <Link
                        to={`/artist/${result[0]?.artist?._id}`}
                        className="text-decoration-none text-white"
                    >
                        <div className="top-result p-3 p rounded" >

                            <img className="rounded-circle " width={100} height={100} src={result.length === 0 ? "" : result[0].artist.image} alt="" srcset="" /> <br />

                            <span className="fs-1">

                                {result && result.length === 0 ? "" : result[0].artist.name}

                            </span> <br />


                            <span className="text-grey"> Artist </span>

                            {userId
                                // display when logined
                                ? <div
                                    className="top-play rounded-circle d-flex position-absolute justify-content-center align-items-center p-3"
                                    style={{
                                        opacity: `${playId === result[0]?.artist?._id && isPlaying ? '1' : ''}`,
                                        transform: `${playId === result[0]?.artist?._id && isPlaying ? 'translate(0)' : ''}`
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault(),
                                            setCurrentPlaylist(result),
                                            setCurrentSong(result[0]),
                                            setCurrentIndex(0);
                                        setPlayId(result[0]?.artist?._id)
                                    }}
                                >
                                    {playId === result[0]?.artist?._id && currentSong?.artist?._id === result[0]?.artist?._id && isPlaying
                                        ?
                                        <div
                                            className="pointer smallPlayIcon2"
                                            onClick={handlePause}
                                        >
                                            <PauseIcon height={18} width={18} />
                                        </div>
                                        :
                                        <div className="pointer smallPlayIcon2"
                                            onClick={() => handlePlay(result[0]?.artist?._id)}
                                        >
                                            <PlayIcon height={18} width={18} />
                                        </div>}
                                </div>

                                // display when logged out

                                : <div
                                    data-bs-toggle="modal"
                                    data-bs-target="#logoutModal"
                                    className="top-play rounded-circle d-flex position-absolute justify-content-center align-items-center p-3"
                                    onClick={() => { setOneArtist(result[0]?.artist); console.log(result[0]) }}
                                >
                                    <span className="d-flex align-items-center">

                                        <SmallPlayIcon />
                                    </span>

                                </div>

                            }

                        </div>

                    </Link>







                </div>

                <div className="flex-fill py-4  ">

                    <div className="fs-3 ">

                        <Link to={`/search/${query2}/song`}
                            class="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"

                        >
                            Songs
                        </Link>


                    </div>

                    {result && result.slice(0, 4).map((song, index) => (

                        <>
                            <div key={index} className="search-song-div" >

                                <div className="d-flex song-div rounded p-1 px-2 align-items-center ">

                                    {/* song name/image  div */}
                                    <div className="d-flex col align-items-center">

                                        <div className="d-flex align-items-center justify-content-center">

                                            <img src={song.image} alt="song Image" height={42} className="rounded" />

                                            {userId

                                                ? <span className="search-play-icon">

                                                    {audioId === song?._id && isPlaying ? (
                                                        <span onClick={handlePause}>

                                                            <PauseIcon height={24} width={24} />
                                                        </span>
                                                    ) : (
                                                        <span
                                                            onClick={() => {
                                                                handleSongChangeOrPlay(song, index);

                                                            }}
                                                        >

                                                            <SmallPlayIcon height={24} width={24} />
                                                        </span>
                                                    )}
                                                </span>


                                                : <span
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#logoutModal"

                                                    className="search-play-icon"
                                                    onClick={() => { setOneArtist(song) }}


                                                >
                                                    <SmallPlayIcon />
                                                </span>}
                                        </div>

                                        <div className="px-2">
                                            <span className={`${audioId === song?._id ? "text-green" : ""}`}> {song.name} </span> <br />
                                            <span className="text-grey"> {song.artist.name} </span>
                                        </div>
                                    </div>

                                    <span className="addIcon2">
                                        <AddIcon />
                                    </span>
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
                <Link to={`/search/${query2}/artist`}
                    class="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"

                >
                    Artists
                </Link>
            </div>

            <HorizontalScroller render={true}>
                {uniqueData &&
                    uniqueData.map((song, index) => (
                        <div
                            className="rounded p hvr-grey p-2 pt-3 position-relative my-3"
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
                                        height={"185px"}
                                        width={"195px"}
                                    />
                                </div>
                                <span className="text-white"> {song.artist.name} </span> <br />
                                <span className="text-secondary">Artist</span>
                            </Link>

                            {userId
                                // display when logined
                                ? <div
                                    className={`play ${playId === song?.artist?._id && isPlaying ? 'opacity-100 translate-0' : ''}`}

                                    onClick={() => {
                                        setCurrentPlaylist(uniqueData),
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

            </HorizontalScroller>





            {/* ALbum Section */}

            <div className="col text-white">
                <Link
                    class="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                    to={`/search/${query2}/album`}
                >
                    Albums
                </Link>
            </div>


            <HorizontalScroller>
                {uniqueData &&
                    uniqueData.map((song, index) => (
                        <div
                            className="rounded p hvr-grey p-2 position-relative my-3"
                            key={index}
                        >
                            <Link
                                to={`/album/${song.album._id}`}
                                className="text-decoration-none"
                            >
                                <div className="pb-2">
                                    <img src={song?.album?.image} alt="album cover" className="rounded" height={185} width={195} />

                                </div>
                                <span className="text-white"> {song.album.name} </span> <br />
                                <span className="text-secondary"> Album </span>
                            </Link>
                            {/* play pause button */}
                            {userId
                                // display when logined
                                ? <div
                                    className={`play ${playId === song?.album?._id && isPlaying ? 'opacity-100 translate-0' : ''}`}

                                    onClick={() => {
                                        setCurrentPlaylist(uniqueData),
                                            setCurrentSong(song),
                                            setCurrentIndex(0);
                                        setPlayId(song?.album?._id)
                                    }}
                                >
                                    {playId === song?.album?._id && isPlaying ?
                                        <div
                                            className="pointer  smallPlayIcon2"
                                            onClick={handlePause}
                                        >
                                            <PauseIcon height={18} width={18} />
                                        </div>
                                        :
                                        <div className="pointer smallPlayIcon2 "
                                            onClick={() => handlePlay(song?.album?._id)}
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
            </HorizontalScroller>



        </div>


        {oneArtist && <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
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

    </>)

}

export default AllSearch;