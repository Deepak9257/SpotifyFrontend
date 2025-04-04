import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import { useNavigate, useParams } from "react-router-dom"
import EditIcon from "../Icons/EditIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import ScrollBar from "../components/scrollBar";
import PauseIcon from "../Icons/PauseIcon";
import PlayIcon from "../Icons/PlayIcon";



const Playlist = () => {

    const { currentSong, setCurrentSong, setCurrentIndex, isPlaying, setIsPlaying, playId, setPlayId } = useContext(songContext);
    const { currentPlaylist, setCurrentPlaylist, playlistId, setPlaylistId } = useContext(playlistContext);


    const { id } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState([]);
    const [song, setSong] = useState([])
    // console.log("Current playlist songs data:", currentPlaylist)

    useEffect(() => {

        getAllPlaylist(),
        getSong()

    }, [id]);

    const getAllPlaylist = async () => {
        const id = window.location.pathname.split('/playlist/')[1]
        var res = await axios.get("https://spotify-backend-blue.vercel.app/playlist/getById/" + id)
        res = res.data
        setPlaylist(res.data)
        // console.log(res.data)
    }


    const getSong = async () => {
        const id = window.location.pathname.split('/playlist/')[1]
        var res = await axios.get("https://spotify-backend-blue.vercel.app/playlistSong/getAllSongs/" + id)
        res = res.data
        setSong(res.data)
        // console.log(res.data);


    }


    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [status, setStatus] = useState("")

    const UpdateByID = async (id) => {
        var res = await axios.put("https://spotify-backend-blue.vercel.app/playlist/update/" + id, {
            name, image, status
        })
        res = res.data
        // console.log(res.data)



    }

    const handleDelete = async (id) => {

        var res = await axios.delete("https://spotify-backend-blue.vercel.app/playlist/deleteById/" + id);
        res = res.data;
        navigate('/');



    }


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

        if (currentSong._id && currentSong?.artist?._id === artistId) {
            return null;
        } else {
        
            setCurrentPlaylist(song.map(item => item.song));
            setCurrentSong(song[0].song);
            setCurrentIndex(0);
           
       
   
        }

    }

// console.log('song ID  :',song[0]?.artist?._id)
    return (
        <>


            <div
                className="playlist-body h-100 gap-2 text-white rounded"

            >
                <ScrollBar customClassName={'rounded'} height={'78vh'}>
                    {playlist && (
                        <div className="playlist-header rounded-top-3">
                            <div className="bg-music position-relative col-2 rounded shadow m-2 text-center">
                                {playlist && playlist.image ? (
                                    <div
                                        className="playlist-image-container"
                                        data-bs-toggle="modal"
                                        data-bs-target="#UpdatePlaylist"
                                    >
                                        <img
                                            src={playlist.image}
                                            width={180}
                                            className="rounded"
                                            alt="Playlist"
                                        />
                                    </div>
                                ) : (
                                    <img src="/MusicIcon.svg" className="music-icon my-5" />
                                )}

                                <span
                                    className="editIcon"
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdatePlaylist"
                                >
                                    <EditIcon />
                                    <span className="text-nowrap">Choose Photo</span>
                                </span>
                            </div>

                            <div className="details col">
                                <p>Playlist</p>
                                <h1
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdatePlaylist"
                                    className=" fs-large pointer"
                                >
                                    {playlist.name}
                                </h1>
                                <h4>Dee</h4>
                                <div className="stats">
                                    <i className="fab fa-spotify" />
                                    <span>Total songs</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="controls">
                        <div
                            className={`play-button ${playId === song[0]?.song?._id && currentSong?.artist?._id === song[0]?.song?._id && isPlaying ? 'opacity-100 translate-0' : ''}`}

                            onClick={() => {handleSongChange(song[0]?.artist?._id), setPlayId(id); }}
                        >
                            {playId === id && isPlaying ?
                                <div
                                    className="pointer smallPlayIcon2 h-100 w-100"
                                    onClick={handlePause}
                                >
                                    <PauseIcon height={18} width={18} fill={"black"} />
                                </div>

                                : <div className="pointer smallPlayIcon2 h-100 w-100"
                                    onClick={() => handlePlay(song[0].song?.artist?._id)}
                                >
                                    <PlayIcon height={18} width={18} fill={"black"} />

                                </div>

                            }



                        </div>

                        <div className="other-controls">

                            {playlist && (
                                <button
                                    className="btn btn-danger rounded-pill"
                                    data-bs-toggle="modal"
                                    data-bs-target="#DeletePlaylist"
                                >
                                    delete
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th className="track-number">#</th>
                                    <th>Title</th>
                                    <th>Album</th>
                                    <th>Date added</th>
                                    <th>
                                        <i className="far fa-clock" />
                                    </th>
                                </tr>
                            </thead>

                            <tbody  className="">
                            {song &&
                                song.map((playlistSong, index) => (
                                        <tr key={index} className="tr-border position-relative">
                                            <td className="track-number">

                                                <div className="number">{index + 1}</div>
                                            </td>

                                            <td
                                                className="popover-div"
                                                onClick={() => {
                                                    setCurrentSong(playlistSong?.song);
                                                        setCurrentIndex(index);
                                                        setCurrentPlaylist(song.map(item => item.song));
                                                        setPlayId(id);
                                                }}
                                            >
                                                <div className="smallplayIcon">
                                                    <div className="popover-target">
                                                        <SmallPlayIcon />
                                                    </div>

                                                    <div className="popover px-3 shadow ">Play</div>
                                                </div>
                                            </td>
                                            <td className="track-title">
                                                <img
                                                    src={playlistSong?.song?.image}
                                                    alt="Album cover for Slumber Rain"
                                                />

                                                <div>
                                                    <div>{playlistSong?.song?.name}</div>
                                                    <div>{playlistSong?.artist?.name} </div>
                                                </div>
                                            </td>
                                            <td>{playlistSong?.album?.name} </td>
                                            <td>{playlistSong.createdAt} </td>
                                            <td>3.07</td>
                                        </tr>
                                ))}
                                </tbody>
                        </table>
                    </div>
                </ScrollBar>
            </div>

            {/* Delete Playlist Model */}
            {playlist && (
                <div
                    className="modal fade"
                    id="DeletePlaylist"
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered justify-content-center">
                        <div className="modal-content w-75 px-3">


                            <span>
                                <h1 className="modal-title fs-5 mt-4 fw-bold" id="ViewSongModal">
                                    Delete from Your Library?
                                </h1>
                            </span>

                            <div className="my-2 fs-small">
                                This will delete
                                <span className="fw-bold"> {playlist.name}</span> from
                                <span className="fw-bold">  Your Library.</span>

                            </div>

                            <div className="modal-footer mb-2 border-0">
                                <button
                                    type="close"
                                    className="btn rounded-pill"
                                    data-bs-dismiss="modal"

                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-success rounded-pill"
                                    data-bs-dismiss="modal"
                                    onClick={() => handleDelete(playlist._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Playlist Modal */}

            {playlist && (
                <div
                    className="modal fade"
                    id="UpdatePlaylist"
                    tabIndex={-1}
                    aria-labelledby="UpdatePlaylist"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="UpdatePlaylist">
                                    Edit Song
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close bg-dark"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <form method="put" onSubmit={() => UpdateByID(playlist._id)}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control border px-2"
                                            onKeyUp={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Image Url</label>
                                        <input
                                            type="text"
                                            className="form-control border px-2"
                                            placeholder="Enter Image Url"
                                            onKeyUp={(e) => setImage(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            className="form-select px-3"
                                            required
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value={""} readOnly defaultValue>
                                                {" "}
                                                Now: {playlist.isActive ? "Active" : "Inactive"}
                                            </option>
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="reset" className="btn btn-secondary">
                                        Reset
                                    </button>

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
    );
}

export default Playlist