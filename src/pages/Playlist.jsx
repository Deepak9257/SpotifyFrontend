import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import { useNavigate, useParams } from "react-router-dom"
import EditIcon from "../Icons/EditIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";



const Playlist = () => {

    const { setCurrentSong, setCurrentIndex } = useContext(songContext);
    const { currentPlaylist, setCurrentPlaylist } = useContext(playlistContext)


    const { id } = useParams()
    const navigate = useNavigate()
    const [playlist, setPlaylist] = useState([]);
    const [song, setSong] = useState([])
    console.log("Current playlist songs data:",currentPlaylist)

    useEffect(() => {

        getAllPlaylist(),
        getSong()

    }, [id]);

    const getAllPlaylist = async () => {
        const id = window.location.pathname.split('/playlist/')[1]
        var res = await axios.get("https://spotify-backend-ten.vercel.app/playlist/getById/" + id)
        res = res.data
        setPlaylist(res.data)
        console.log(res.data)
    }


    const getSong = async () => {
        const id = window.location.pathname.split('/playlist/')[1]
        var res = await axios.get("https://spotify-backend-ten.vercel.app/playlistSong/getAllSongs/" + id)
        res = res.data
        console.log(res.data);
        setSong(res.data)


    }


    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [status, setStatus] = useState("")

    const UpdateByID = async (id) => {
        var res = await axios.put("https://spotify-backend-ten.vercel.app/playlist/update/" + id, {
            name, image, status
        })
        res = res.data
        console.log(res.data)



    }

    const handleDelete = async (id) => {

        var res = await axios.delete("https://spotify-backend-ten.vercel.app/playlist/deleteById/" + id)
        res = res.data
        navigate("/")
        window.location.reload();

    }
    return (
        <>
            <div
                className="playlist-body row justify-content-between gap-2 text-white rounded overflow-auto scroll"
                style={{ height: "78vh" }}
            >
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
                    <button
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-custom-class="custom-tooltip"
                          data-bs-title={`Play ${playlist.name}`}
          
                    
                    
                    className="play-button" onClick={()=>{setCurrentPlaylist(song.map(item=>item.song)), setCurrentSong(song[0].song), setCurrentIndex(0)}  }>
                        <i className="fas fa-play" />
                    </button>
                    <div className="other-controls">
                        {/* <i className="fas fa-ellipsis-h" /> */}
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

                        {song &&
                            song.map((playlistSong, index) => (
                                <tbody>
                                    <tr className="tr-border position-relative">
                                        <td className="track-number">
                                            
                                            <div className="number">{index + 1}</div>
                                        </td>

                                        <td
                                            className="popover-div"
                                            onClick={() => {
                                                setCurrentSong(playlistSong?.song),
                                                setCurrentIndex(index),
                                                setCurrentPlaylist(song.map(item=> item.song));
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
                                </tbody>
                            ))}
                    </table>
                </div>
            </div>

            {/* Delete Playlist Model */}
            {playlist && (
                <div
                    className="modal fade"
                    id="DeletePlaylist"
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="ViewSongModal">
                                    Delete from Your Library?
                                </h1>
                            </div>

                            <div className="mb-3">
                                This will delete{" "}
                                <span className="fw-bold"> {playlist.name}</span> from{" "}
                                <span className="fw-bold"> from Your Library.</span>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-success"
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
                                    <div class="mb-3">
                                        <label class="form-label">Name</label>
                                        <input
                                            type="text"
                                            class="form-control border px-2"
                                            onKeyUp={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Image Url</label>
                                        <input
                                            type="text"
                                            class="form-control border px-2"
                                            placeholder="Enter Image Url"
                                            onKeyUp={(e) => setImage(e.target.value)}
                                        />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Status</label>
                                        <select
                                            className="form-select px-3"
                                            required
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value={""} readonly selected>
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