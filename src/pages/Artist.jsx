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

const Artist = ({ userId }) => {

    const [oneArtist, setOneArtist] = useState({})

    //login button ref to position popover when logout
    const loginBtnRef = useContext(LoginBtnContext)

    // selected effect conditions on tr-border
    const [selectedRow, setSelectedRow] = useState(null)

    const handleClick = (index) => {
        setSelectedRow(index)
    }

    // block scroll code

    const [isOpen, setIsOpen] = useState(false)


    const blockScroll = (open) => {
        setIsOpen(open)
        console.log('open :', open, isOpen)

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






    const { setCurrentSong, setCurrentIndex } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);

    const [loading, setLoading] = useState(true)
    const [songs, setSongs] = useState([])
    const [songId, setSongId] = useState("");
    const [playlistId, setPlaylistId] = useState([]);
    const [artistID, setArtistID] = useState("");
    const [albumID, setAlbumID] = useState("");


    const [playlist, setPlaylist] = useState([]);



    const [Artist, setArtist] = useState({});
    useEffect(() => {
        getArtist()
        getSong()

    }, []);


    const AddPlaylistSong = async (e) => {
        e.preventDefault();

        var res = await axios.post("https://spotify-backend-blue.vercel.app/playlistSong/create", {
            song: songId,
            playlistId,
            artist: artistID,
            album: albumID,
            userId: user?._id
        });
        res = res.data;
        console.log(res);

    };


    const getSong = async () => {
        const id = window.location.pathname.split("/artist/")[1];
        var res = await axios.get("https://spotify-backend-blue.vercel.app/song/getAllByArtist/" + id);
        res = res.data;
        console.log("Artist song data:", res.data);
        setSongs(res.data);
        setLoading(false);
    };


    const getArtist = async () => {
        const id = window.location.pathname.split('/artist/')[1]
        var res = await axios.get("https://spotify-backend-blue.vercel.app/artist/get/" + id)
        res = res.data
        console.log(res.data);
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
    }, []);

    const getAllPlaylist = async () => {

        var res = await axios.get("https://spotify-backend-blue.vercel.app/playlist/getAll");
        res = res.data;
        setPlaylist(res.data);
        console.log(res.data);
    };

    // input check condition to display check icon svg
    const [isChecked, setIsChecked] = useState({});

    const handleChange = (e, index) => {

        setIsChecked(prevStates => ({
            ...prevStates,

            [index]: !prevStates[index], // Toggle the checkbox state
        }));

        if (e.target.checked) {
            setPlaylistId([...playlistId, e.target.value])
            console.log('playlist saved', e.target.value)
        } else {
            setPlaylistId([...playlistId.filter((item) => item !== e.target.value)])
        }

    };

    console.log('new playlist:', playlistId)




    if (loading) {
        return (
            <>
                <div class="text-center text-success loading-hyt d-flex align-items-center justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden"> Loading... </span>
                    </div>
                </div>
            </>
        )
    }



    return (
        <>
            <div className="w-100 float-center text-white container-fluid" >


                {Artist &&

                    <div
                        id="rytBar"
                        className="mx-1 row justify-content-between gap-2 text-white p-3 rounded scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>

                        <div class="artist-header rounded-top-3">
                            <img src={Artist.image} alt="" srcset="" className="object-fit-cover rounded-circle" />

                            <div >
                                <div> <VerifiedIcon /> Verified Artist </div>
                                <span className="fw-bold text ">{Artist.name}</span> <br />
                                <span>42,405,290 monthly listeners                              </span>


                            </div>
                        </div>
                        <div className="controls ">

                            {userId ? <div




                                className="play-button" onClick={() => { setCurrentPlaylist(songs), setCurrentSong(songs[0]), setCurrentIndex(0) }}>
                                <i className="fas fa-play"></i>
                            </div> : <div
                                data-bs-toggle="modal"
                                data-bs-target="#logoutModal"
                                className="play-button"
                                onClick={() => { setOneArtist(Artist); console.log('artist set successfully') }}
                            >
                                <i className="fas fa-play"></i>
                            </div>}



                            <div> <i class="fas fa-ellipsis-h py-2"></i> </div>

                        </div>
                        <div>  <span className="fs-2 fw-bold">Popular</span> </div>

                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="track-number">#</th>
                                        <th>Title</th>
                                        <th>Album</th>
                                        <th>Date added</th>
                                        <th>
                                            <i class="far fa-clock"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {songs &&
                                        songs.map((song, index) => (
                                            <tr
                                                key={song._id}
                                                onClick={() => { handleClick(index) }}

                                                className={`tr-border position-relative ${selectedRow === index ? 'activeRow' : ''}`}>
                                                <td class="track-number "><div className="number">{index + 1}</div></td>

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
                                                <td class="track-title">
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
                                                <td>{song.createdAt}</td>
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

                                                                    <Popover.Popup className="playlist-popup">
                                                                        <div className="p-3">


                                                                            <form onSubmit={AddPlaylistSong}>
                                                                                <div className="fs-small fw-bold mb-3" style={{ color: '#B3B3B3' }}>Add to playlist</div>

                                                                                <div className="p-2 rounded hover-grey d-flex align-items-center  gap-2">
                                                                                    <span><PlusIcon /></span> <span> New playlist</span>
                                                                                </div>
                                                                                <hr className="mt-0 m mx-2" />



                                                                                <div
                                                                                    className="mb-3  rounded  ">

                                                                                    {playlist &&
                                                                                        playlist.map((playlist, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <div key={index} className="col hover-grey rounded">
                                                                                                        <label

                                                                                                            htmlFor={index}
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
                                                                                                                <input onChange={(e) => { handleChange(e, index); }} type="checkbox" id={index} value={playlist._id} />
                                                                                                                <div className={`d-flex align-items-center justify-content-center`}> {isChecked[index] ? <CheckIcon /> : ''}   </div>
                                                                                                            </div>

                                                                                                        </label>
                                                                                                    </div>


                                                                                                </>
                                                                                            );
                                                                                        })}


                                                                                </div>

                                                                                <div className="d-flex flex-row-reverse align-items-center gap-2">

                                                                                    <Popover.Close className='btn btn-light rounded-pill nav-login-btn' type="submit"
                                                                                        onClick={() => setIsChecked(false)}

                                                                                    > Done
                                                                                    </Popover.Close>

                                                                                    <Popover.Close className='bg-transparent border-0 text-white nav-login-btn'
                                                                                        onClick={() => setIsChecked(false)}

                                                                                    > Cancel
                                                                                    </Popover.Close>

                                                                                </div>





                                                                            </form>

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
                }



            </div>


            {/* Playlist Model */}
            {/* {playlist && (
                <div
                    className="modal fade"
                    id="AddToPlaylist"
                    tabIndex={-1}
                    aria-labelledby="CreatePlaylist"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="AddToPlaylist">
                                    Add to Playlist
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close bg-dark"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <form method="post" onSubmit={AddPlaylistSong}>
                                <div className="mb-3">
                                    <label class="form-label">Select Playlist</label>

                                    {playlist &&
                                        playlist.map((playlist, index) => {
                                            return (
                                                <>
                                                    <option
                                                        type="button"
                                                        className="border border-dark p-1 rounded my-2"
                                                        onClick={() => setPlaylistId(playlist._id)}
                                                    >
                                                        {playlist.name}
                                                    </option>
                                                </>
                                            );
                                        })}
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-info">
                                        Done
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )} */}

            {/* modal on logout */}

            {oneArtist && <div className="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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