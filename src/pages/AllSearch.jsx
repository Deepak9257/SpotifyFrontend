import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import AddIcon from "../Icons/AddIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";

const Search = () => {


    const { setCurrentSong, setCurrentIndex } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);



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


    const getUniqueData = (data, artist) => {
        let res = data.map((item) => {
            return item[artist].name
        })


        res = [... new Set(res)]
        console.log("unique data:", res)

        const uniqueArtist = res.map((artistName) => {
            return data.find((item) => item[artist].name === artistName)
        })
        console.log("Unique artist: ", uniqueArtist);

        return uniqueArtist;
    }

    const uniqueData = getUniqueData(result, "artist")


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


    const { q } = useParams()
    const query2 = q || ""

    return (<>




        <div className="px-4">


            <div className="d-flex fw-bold">

                <div className="px-3  py-4 col-5 ">

                    <div className="fs-3 mb-2">  Top result </div>

                    {
                        <div className="top-result p-3 p rounded" >

                            <img className="rounded-circle " width={100} height={100} src={result.length === 0 ? "" : result[0].artist.image} alt="" srcset="" /> <br />

                            <span className="fs-1 ">

                                {result && result.length === 0 ? "" : result[0].artist.name}

                            </span> <br />


                            <span className="text-grey"> Artist </span>

                            <div
                                className="top-play rounded-circle d-flex position-absolute justify-content-center align-items-center p-3"
                                onClick={() => {
                                    setCurrentPlaylist(result),
                                      setCurrentSong(result[0]),
                                      setCurrentIndex(0);
                                  }}
                            >
                                {playId === result[0]._id ? (



                                 <span className="d-flex align-items-center"> 
                                       <PauseIcon />
                                 </span>

                                ) : (
                                    <span className="d-flex align-items-center">

                                        <SmallPlayIcon />
                                    </span>


                                )}
                            </div>
                        </div>}






                </div>


                <div className="col py-4  ">

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

                                        <div className="d-flex align-items-center">
                                            
                                            <img src={song.image} alt="song Image" height={42} className="rounded" />
                                           
                                            <span className="search-play-icon" 
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

            <div className="d-flex mx-auto px-3">
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

                            <div
                                className="play"
                                onClick={() => {
                                    setCurrentPlaylist(uniqueData),
                                      setCurrentSong(song),
                                      setCurrentIndex(0);
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
                <Link
                    class="fw-bold fs-2 link-offset-2 text-white link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover"
                    to={`/search/${query2}/album`}
                >
                    Albums
                </Link>
            </div>

            <div className="d-flex mx-auto px-3 ">
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

                             <div
                                className="play"
                                onClick={() => {
                                    setCurrentPlaylist(uniqueData),
                                      setCurrentSong(song),
                                      setCurrentIndex(0);
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