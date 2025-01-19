import axios from "axios";
import Bottom from "../components/Bottom"
import { useContext, useEffect, useState } from "react";
import VerifiedIcon from "../Icons/Verified";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import AddIcon from "../Icons/AddIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";

const Artist = () => {


    const { setCurrentSong, setCurrentIndex } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);

    const [loading, setLoading] = useState(true)
    const [songs, setSongs] = useState([])
    const [songId, setSongId] = useState("");
    const [playlistId, setPlaylistId] = useState("");
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

        var res = await axios.post("https://spotify-backend-ten.vercel.app/playlistSong/create", {
            song: songId,
            playlistId,
            artist: artistID,
            album: albumID,
            userId: user?._id
        });
        res = res.data;
        console.log(res.data);
    };


    const getSong = async () => {
        const id = window.location.pathname.split("/artist/")[1];
        var res = await axios.get("https://spotify-backend-ten.vercel.app/song/getAllByArtist/" + id);
        res = res.data;
        console.log("Artist song data:", res.data);
        setSongs(res.data);
        setLoading(false);
    };


    const getArtist = async () => {
        const id = window.location.pathname.split('/artist/')[1]
        var res = await axios.get("https://spotify-backend-ten.vercel.app/artist/get/" + id)
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
        var res = await axios.post("https://spotify-backend-ten.vercel.app/auth/getUser", { token });
        res = res.data;
        setUser(res.data);


    }


    useEffect(() => {
        getAllPlaylist();
    }, []);

    const getAllPlaylist = async () => {

        var res = await axios.get("https://spotify-backend-ten.vercel.app/playlist/getAll");
        res = res.data;
        setPlaylist(res.data);
        console.log(res.data);
    };


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
//tooltip code
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


    return (
        <>
            <div className="w-100 float-center text-white container-fluid" >


                {Artist &&

                    <div className="mx-1 row justify-content-between gap-2 text-white p-3 rounded overflow-auto scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>

                        <div class="artist-header rounded-top-3">
                            <img src={Artist.image} alt="" srcset="" className="object-fit-cover rounded-circle" />

                            <div className="">
                                <div> <VerifiedIcon /> Verified Artist </div>
                                <span className="fw-bold text ">{Artist.name}</span> <br />
                                <span>42,405,290 monthly listeners                              </span>


                            </div>
                        </div>
                        <div className="controls ">
                            <div 
                            
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-custom-class="custom-tooltip"
                            data-bs-title={`Play ${Artist.name}`}
            
                            
                            
                            className="play-button" onClick={()=>{setCurrentPlaylist(songs), setCurrentSong(songs[0]), setCurrentIndex(0)}  }>
                                <i 
                               
                                
                                
                                
                                className="fas fa-play"></i>
                            </div>

                            <div className="other-controls d-flex gap-4">
                                <div className="px-3 border rounded-pill py-1">Follow</div>
                            </div>

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
                                            <tr className="tr-border position-relative">
                                                <td class="track-number "><div className="number">{index + 1}</div></td>

                                                <td className="popover-div" >

                                                    <div className="smallplayIcon popover-container">

                                                        <div className="popover-target" onClick={() => { { setCurrentIndex(index), setCurrentSong(song), setCurrentPlaylist(songs) } }} >
                                                            <SmallPlayIcon />
                                                        </div>

                                                        <div className="popover px-3 shadow ">
                                                            Play
                                                        </div>

                                                    </div>


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
                                                    <span
                                                        className="addIcon"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#AddToPlaylist"
                                                        onClick={() => {
                                                            setSongId(song._id);
                                                            setAlbumID(song?.album?._id);
                                                            setArtistID(song?.artist?._id);
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </span>

                                                    <div className="playlist-popover-content text-white px-3 rounded shadow">
                                                        Add to playlist
                                                    </div>

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
            {playlist && (
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
            )}

        </>
    )
}

export default Artist