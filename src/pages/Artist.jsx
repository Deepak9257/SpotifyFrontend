import axios from "axios";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import VerifiedIcon from "../Icons/Verified";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import AddIcon from "../Icons/AddIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import LoginBtnContext from "../contexts/RefContext";
import { Popover } from "@base-ui-components/react/popover";
import PopoverArrow from "../Icons/PopoverArrow";
import MusicIcon from "../Icons/MusicIcon";
import CheckIcon from "../Icons/CheckIcon";
import PlusIcon from "../Icons/PlusIcon";
import { toast, Zoom } from 'react-toastify';
import PauseIcon from "../Icons/PauseIcon";
import PlayIcon from "../Icons/PlayIcon";
import ScrollBar from "../components/ScrollBar";

const Artist = ({ userId }) => {



    const [oneArtist, setOneArtist] = useState({})
    const [isOpen, setIsOpen] = useState(false)


    //login button ref to position popover when logout
    const loginBtnRef = useContext(LoginBtnContext)

    // selected effect conditions on tr-border
    const [selectedRow, setSelectedRow] = useState(null)
    const trBorderRef = useRef(null)

    const handleClick = (index) => {
        setSelectedRow(index)

    }


    // logic to handle click outside of the tr border
    useEffect(() => {

        const clickOutside = (e) => {

            if (trBorderRef.current && !trBorderRef.current.contains(e.target)) {
                setSelectedRow(null)
                // console.log('clicked outside of tr-border' , trBorderRef.current)

            }
        }

        if (isOpen === false) {
            document.addEventListener('click', clickOutside)
            console.log('added event listener')

        }
        if (isOpen === true) {

            document.removeEventListener('click', clickOutside)
            console.log('removed event listener')
        }

        return () => {
            document.removeEventListener('click', clickOutside);
            console.log('Cleanup: Removed event listener on component unmount');
        };


    }, [isOpen])



    // block scroll code

    const blockScroll = (open) => {
        setIsOpen(open)
        console.log('open :', open)

    }

    // Effect to handle document scroll blocking
    useEffect(() => {

        const rytBar = document.getElementById('rytBar')

        if (isOpen && rytBar) {
            document.body.style.overflow = 'hidden';
            document.getElementById('rytBar').style.overflowY = 'hidden';

        }

        return () => {
            document.body.style.overflow = ''; // Reset on unmount
            if (isOpen && rytBar) {
                document.getElementById('rytBar').style.overflowY = '';

            };
        };
    }, [isOpen]);


    const { currentSong, setCurrentSong, setCurrentIndex, playId, setPlayId, isPlaying, setIsPlaying } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);

    const [loading, setLoading] = useState(true)
    const [popupLoading, setPopoupLoading] = useState(true)
    const [songs, setSongs] = useState([])
    const [songId, setSongId] = useState("");
    const [artistID, setArtistID] = useState("");
    const [albumID, setAlbumID] = useState("");

    const [playlistWithSong, setPlaylistWithSong] = useState([])


    const [isChecked, setIsChecked] = useState({});
    const [playlistId, setPlaylistId] = useState([]);
    const [uncheckedPlaylist, setUncheckedPlaylist] = useState([]) //store unchecked playlist from remove 



    const [playlist, setPlaylist] = useState([]);



    const [Artist, setArtist] = useState({});

    useEffect(() => {
        getArtist()
        getSong()

    }, []);


    const getSong = async () => {
        const id = window.location.pathname.split("/artist/")[1];
        var res = await axios.get("https://spotify-backend-blue.vercel.app/song/getAllByArtist/" + id);
        res = res.data;
        // console.log("Artist song data:", res.data);
        setSongs(res.data);
        setLoading(false);
    };


    const getArtist = async () => {
        const id = window.location.pathname.split('/artist/')[1]
        var res = await axios.get("https://spotify-backend-blue.vercel.app/artist/get/" + id)
        res = res.data
        // console.log(res.data);
        setArtist(res.data)
        setLoading(false)
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user) {

            getUser(user);

        }

    }, []);

    const getUser = async () => {

        const token = localStorage.getItem("token");
        var res = await axios.post("https://spotify-backend-blue.vercel.app/auth/getUser", { token });
        res = res.data;
        setUser(res.data);

    }


    useEffect(() => {
        getAllPlaylist();
        getPlaylistSongs();
    }, []);

    const getAllPlaylist = async () => {

        var res = await axios.get("https://spotify-backend-blue.vercel.app/playlist/getAll");
        res = res.data;
        setPlaylist(res.data);
        // console.log(res.data);
    };

    // code for to keep playlist checked where the song is alreay added 

    useEffect(() => {

        if (isOpen === true) {
            getPlaylistSongs()
            setTimeout(() => {
                setPopoupLoading(false);
            }, 1000);
            // console.log('rendered getPlaylistSongs')
        } else {
            setPopoupLoading(true)
            // console.log('popup Loading true')

        }

    }, [isOpen, songId])


    // logic for get all user's playlists with songs
    const getPlaylistSongs = async () => {

        var res = await axios.get(`https://spotify-backend-blue.vercel.app/playlistSong/getSongsByUserId/${user?._id}`)

        const userPlaylists = res.data.data

        const newPlaylist = userPlaylists.filter((playlist) => (playlist.song.includes(songId)))

        setPlaylistWithSong(newPlaylist)


    };

    // input check condition to display check icon svg and add or remove the song from playlist

    const handleChange = (e, playlistid) => {

        const value = e.target.value

        // display svg ICON
        setIsChecked(prevStates => ({
            ...prevStates,
            [playlistid]: !prevStates[playlistid], // Toggle the checkbox state
        }));

        // save to the playlist in the checked playlist 
        if (e.target.checked) {
            setPlaylistId([...playlistId, value])

            setUncheckedPlaylist((prev) => prev.filter((id) => id !== value))


            // console.log('playlist saved', value)
        } else {
            setPlaylistId([...playlistId.filter((item) => item !== value)])

            setUncheckedPlaylist((prev) => [...prev, value])

        }

    };


    // condition for keep playlists with song checked   
    const keepPlaylistCheck = (playlistId) => {

        return playlistWithSong.some(item => item.playlistId === playlistId)

    }

    useEffect(() => {

        const checkedPlaylist = {};

        playlistWithSong.forEach(item => {
            checkedPlaylist[item.playlistId] = keepPlaylistCheck(item.playlistId);
        });

        setIsChecked(checkedPlaylist);
        // console.log('rendered', checkedPlaylist)

    }, [isOpen, playlistWithSong]);

    // to add or remove playlist song

    const AddPlaylistSong = async (e) => {
        e.preventDefault();

        if (playlistId.length > 0) {
            var res = await axios.post("https://spotify-backend-blue.vercel.app/playlistSong/create", {
                song: songId,
                playlistId,
                artist: artistID,
                album: albumID,
                userId: user?._id
            });
            res = res.data;

            // to display playlist name
            playlistId.map((id) => {

                const savedPlaylist = playlist.find((playlist) => playlist._id === id)
                if (savedPlaylist) {
                    return toast(`Added to ${savedPlaylist.name}.`, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        closeButton: false,
                        transition: Zoom,
                        className: "custom-toast",
                    })
                } else {
                    toast(`something went wrong`, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        closeButton: false,
                        transition: Zoom,
                        className: "custom-toast"
                    })
                }

            })




        }

        // logic for remove the playlist song
        if (uncheckedPlaylist.length > 0) {
            var deleteRes = await axios.delete("https://spotify-backend-blue.vercel.app/playlistSong/deletPlaylistSong", {
                data: {
                    playlistId: uncheckedPlaylist,
                    song: songId
                }

            });

            uncheckedPlaylist.map((id) => {

                const savedPlaylist = playlist.find((playlist) => playlist._id === id)
                if (savedPlaylist) {
                    return toast(`Removed from ${savedPlaylist.name}.`, {
                        position: "bottom-center",
                        autoclose: 3000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        closeButton: false,
                        transition: Zoom,
                        className: "custom-toast",
                    })
                } else {
                    toast(`something went wrong`, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        closeButton: false,
                        transition: Zoom,
                        className: "custom-toast",
                    })
                }

            })

        }
    };


    // reset the form on cancel

    const handleCancel = () => {
        console.log('form reset')
        setIsChecked({});
        setPlaylistId([])
        setUncheckedPlaylist([])

    }

    useEffect(() => {
        handleCancel()
    }, [isOpen])


    // handle play pause from any song/album //

    const handlePause = () => {
        setIsPlaying(false)
    }

    // handle play function /
    const handlePlay = (id) => {

        if (currentSong?.artist?._id === id) {
            setIsPlaying(true)
        }
    }

    // handle song change //
    const handleSongChange = (artistId) => {

        if (currentSong?.artist?._id === artistId) {
            return null;
        } else {
            setCurrentPlaylist(songs);
            setCurrentSong(songs[0]);
            setCurrentIndex(0);
        }
    }


    if (loading) {
        return (

            <div className="text-center text-success loading-hyt d-flex align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden"> Loading... </span>
                </div>
            </div>

        )
    }



    return (
        <>
            <div className="w-100 text-white" >

                {Artist &&
                    <ScrollBar customClassName={'rounded'} height={'78vh'}>

                        <div
                            id="rytBar"
                            className="gap-2 text-white rounded" style={{ backgroundColor: "#121212" }}>

                            <div className="artist-header rounded-top-3">
                                <img src={Artist.image} alt="artist pic" className="object-fit-cover rounded-circle" />

                                <div >
                                    <div> <VerifiedIcon /> Verified Artist </div>
                                    <span className="fw-bold text ">{Artist.name}</span> <br />
                                    <span>42,405,290 monthly listeners</span>


                                </div>
                            </div>
                            <div className="controls position-relative">

                                {userId
                                    // display when logined
                                    ? <div
                                        className={`play-button ${playId === Artist._id && currentSong?.artist?._id === Artist._id && isPlaying ? 'opacity-100 translate-0' : ''}`}

                                        onClick={() => { handleSongChange(Artist._id), setPlayId(Artist._id); }}
                                    >
                                        {playId === Artist._id && currentSong?.artist?._id === Artist._id && isPlaying ?
                                            <div
                                                className="pointer smallPlayIcon2 h-100 w-100"
                                                onClick={handlePause}
                                            >
                                                <PauseIcon height={18} width={18} fill={"black"} />
                                                
                                            </div>

                                            : <div className="pointer smallPlayIcon2 h-100 w-100"
                                                onClick={() => handlePlay(Artist._id)}
                                            >
                                                <PlayIcon height={18} width={18} fill={"black"} />
                                            </div>

                                        }



                                    </div>
                                    // display when logout
                                    : <div
                                        data-bs-toggle="modal"
                                        data-bs-target="#logoutModal"
                                        className="play-button"
                                        onClick={() => { setOneArtist(Artist); console.log('artist set successfully') }}
                                    >
                                        <i className="fas fa-play"></i>
                                    </div>}



                                <div> <i className="fas fa-ellipsis-h py-2"></i> </div>

                            </div>

                            <div className="table-container">
                                <div className="">  <span className="fs-2 fw-bold">Popular</span> </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="track-number">#</th>
                                            <th>Title</th>
                                            <th>Album</th>
                                            <th>Date added</th>
                                            <th>
                                                <i className="far fa-clock"></i>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody ref={trBorderRef}>
                                        {songs &&
                                            songs.map((song, index) => (
                                                <tr
                                                    key={song._id}
                                                    onClick={() => { handleClick(index) }}


                                                    className={`tr-border position-relative ${selectedRow === index ? 'activeRow' : ''}`}>

                                                    <td className="track-number "><div className="number">{index + 1}</div></td>

                                                    <td className="popover-div" >

                                                        {userId ? <div className="smallplayIcon popover-container">

                                                            <div className="popover-target" onClick={() => { { setCurrentIndex(index), setCurrentSong(song), setCurrentPlaylist(songs) } }} >
                                                                <SmallPlayIcon />
                                                            </div>


                                                        </div> : <div

                                                            data-bs-toggle="modal"
                                                            data-bs-target="#logoutModal"
                                                            className="smallplayIcon popover-container">

                                                            <div className="popover-target" onClick={() => { setOneArtist(song) }} >
                                                                <SmallPlayIcon />
                                                            </div>



                                                        </div>
                                                        }

                                                    </td>
                                                    <td className="track-title">
                                                        <img
                                                            src={song.image}
                                                            alt="Album cover for Slumber Rain"

                                                        />
                                                        <div>
                                                            <div>{song.name}</div>
                                                            <div>{song?.artist?.name}</div>
                                                        </div>
                                                    </td>
                                                    <td> {song?.album?.name}</td>
                                                    <td>{new Date(song.createdAt).toLocaleDateString()}</td>
                                                    <td className="position-relative">
                                                        {song.time}

                                                        {userId ?

                                                            <Popover.Root onOpenChange={blockScroll} >

                                                                <Popover.Trigger
                                                                    onClick={() => {
                                                                        setSongId(song._id);
                                                                        setAlbumID(song?.album?._id);
                                                                        setArtistID(song?.artist?._id);
                                                                    }}

                                                                    className="addIcon bg-transparent border-0">
                                                                    <span>
                                                                        <AddIcon />
                                                                    </span>
                                                                </Popover.Trigger>



                                                                <Popover.Portal>
                                                                    <Popover.Positioner positionMethod="fixed" collisionBoundary={document.getElementById('rytBar')} sticky={true} align='start' side="top" className="z-9999">

                                                                        <Popover.Popup className="playlist-popup ">
                                                                            <div className="p-3">


                                                                                {popupLoading ? <form >
                                                                                    <div className="fs-small fw-bold mb-3" style={{ color: '#B3B3B3' }}>Add to playlist</div>

                                                                                    <div className="popupLoading">


                                                                                        <p className="placeholder-glow ">
                                                                                            <span className="placeholder col-1 me-4"></span>
                                                                                            <span className="placeholder col-9"></span>
                                                                                        </p>

                                                                                        <p className="placeholder-glow ">
                                                                                            <span className="placeholder col-1 me-4"></span>
                                                                                            <span className="placeholder col-9"></span>
                                                                                        </p>

                                                                                        <p className="placeholder-glow ">
                                                                                            <span className="placeholder col-1 me-4"></span>
                                                                                            <span className="placeholder col-9"></span>
                                                                                        </p>

                                                                                        <p className="placeholder-glow ">
                                                                                            <span className="placeholder col-1 me-4"></span>
                                                                                            <span className="placeholder col-9"></span>
                                                                                        </p>

                                                                                    </div>



                                                                                    <div className="d-flex flex-row-reverse align-items-center gap-2">

                                                                                        <Popover.Close className='btn btn-light rounded-pill nav-login-btn'> Done</Popover.Close>
                                                                                        <Popover.Close className='bg-transparent border-0 text-white nav-login-btn'> Cancel</Popover.Close>

                                                                                    </div>
                                                                                </form> :

                                                                                    <form onSubmit={AddPlaylistSong}  >
                                                                                        <div className="fs-small fw-bold mb-3" style={{ color: '#B3B3B3' }}>Add to playlist</div>

                                                                                        <div className="p-2 rounded hover-grey d-flex align-items-center  gap-2">
                                                                                            <span><PlusIcon /></span> <span> New playlist</span>
                                                                                        </div>

                                                                                        <hr className="mt-0 m mx-2" />

                                                                                        <ScrollBar height={'35vh'}>

                                                                                            <div className="mb-3  rounded ">
                                                                                                {playlist &&
                                                                                                    playlist.map((playlist, index) => {
                                                                                                        return (

                                                                                                            <div key={index} className="col hover-grey rounded">
                                                                                                                <label

                                                                                                                    htmlFor={playlist._id}
                                                                                                                    className="position-relative w-100 py-1 px-2 d-flex  align-items-center justify-content-between"

                                                                                                                >
                                                                                                                    <div className="d-flex gap-2 align-items-center">
                                                                                                                        <div >
                                                                                                                            {playlist.image ? <img src={playlist.image} alt="playlist image" width={16} height={16} /> : <div className="musicIcon small-Icon rounded"><MusicIcon /></div>}
                                                                                                                        </div>

                                                                                                                        <div className="text-select-none" >
                                                                                                                            {playlist.name}
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div className="px-2 checkbox col-1">
                                                                                                                        <input type="checkbox" id={playlist._id} onChange={(e) => { handleChange(e, playlist._id) }} checked={isChecked[playlist._id] || false} value={playlist._id} />
                                                                                                                        <div className={`d-flex align-items-center justify-content-center`}>  {isChecked[playlist._id] ? <CheckIcon /> : ''} </div>
                                                                                                                    </div>

                                                                                                                </label>
                                                                                                            </div>



                                                                                                        );
                                                                                                    })}




                                                                                            </div>

                                                                                        </ScrollBar>


                                                                                        <div className="d-flex flex-row-reverse align-items-center gap-2">

                                                                                            <Popover.Close className='btn btn-light rounded-pill nav-login-btn'
                                                                                                type="submit"


                                                                                            > Done
                                                                                            </Popover.Close>

                                                                                            <Popover.Close

                                                                                                className='bg-transparent border-0 text-white nav-login-btn'

                                                                                                onClick={handleCancel}
                                                                                            > Cancel
                                                                                            </Popover.Close>

                                                                                        </div>





                                                                                    </form>}

                                                                            </div>


                                                                        </Popover.Popup>
                                                                    </Popover.Positioner>
                                                                </Popover.Portal>
                                                            </Popover.Root> :

                                                            <Popover.Root>

                                                                <Popover.Trigger className="addIcon bg-transparent border-0">
                                                                    <span>
                                                                        <AddIcon />
                                                                    </span>
                                                                </Popover.Trigger>



                                                                <Popover.Portal>
                                                                    <Popover.Positioner className="z-9999" sideOffset={10} anchor={loginBtnRef}>
                                                                        <Popover.Popup className="Popup3">
                                                                            <Popover.Arrow className="Arrow">
                                                                                <PopoverArrow />
                                                                            </Popover.Arrow>

                                                                            <Popover.Close className="bg-transparent fw-bold close-btn border-0 position-absolute">
                                                                                &#10005;
                                                                            </Popover.Close>

                                                                            <Popover.Description className="p-1 m-0">
                                                                                <span className="fw-bold">You’re logged out</span> <br />

                                                                                Log in to add this to your playlist.
                                                                            </Popover.Description>

                                                                        </Popover.Popup>
                                                                    </Popover.Positioner>
                                                                </Popover.Portal>
                                                            </Popover.Root>


                                                        }



                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </ScrollBar>

                }



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

                                    <span >

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
    )
}

export default Artist