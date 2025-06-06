import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import { useNavigate, useParams } from "react-router-dom"
import EditIcon from "../Icons/EditIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import PauseIcon from "../Icons/PauseIcon";
import PlayIcon from "../Icons/PlayIcon";
import ScrollBar from "../components/ScrollBar";
import FontResize from "../components/FontResize";
import AddIcon from "../Icons/AddIcon";



const Playlist = () => {

    const {
        currentSong,
        setCurrentSong,
        setCurrentIndex,
        songContainer,
        isPlaying,
        setIsPlaying,
        playId,
        setPlayId,
        audioId,
    } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);


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

    // selected effect conditions on tr-border
    const [selectedRow, setSelectedRow] = useState(null)
    const trBorderRef = useRef(null)

    const handleClick = (index) => {
        setSelectedRow(index)

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

    
    // function to play, pause and change song to 0th index 

        const handleSongChange = () => {

        if (playId === id) {
            handlePlay();
        } else {
            setCurrentPlaylist(song.map(item => item.song));
            setCurrentSong(song[0].song);
            setCurrentIndex(0);
            setPlayId(id);
        }
    }
  

    // handle song change and play by clicking on song 

    const handleSongChangeOrPlay = (currSong, idx) => {

        

        if (audioId === currSong?._id) {

            handlePlay(currSong?.artist?._id);
           

        } else {
            setCurrentSong(currSong);
            setCurrentIndex(idx);
            setCurrentPlaylist(song.map(item => item.song));
            setPlayId(id);

    
          
        }
           

    }

    // console.log('song ID  :', song[0])
    return (
        <>


            <div
                className="playlist-body h-100 gap-2 text-white rounded"

            >
                <ScrollBar customClassName={'rounded'} height={'80vh'}>
                    {playlist && (
                        <div className="playlist-header">
                            <div className="bg-music position-relative rounded shadow text-center"
                                style={{
                                    height: `${songContainer ? '0' : ''}`,
                                    width: `${songContainer ? '0' : ''}`,
                                }}

                            >
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
                                    <span className="d-grid justify-content-center align-items-end"><EditIcon /></span>
                                    <span className="text-nowrap">Choose Photo</span>
                                </span>
                            </div>

                            <div className="details col">
                                <div className="stats d-flex align-items-center gap-2">
                                    <i className="fab fa-spotify" />

                                </div>
                                <div>Dee</div>

                                <div
                                    data-bs-toggle="modal"
                                    data-bs-target="#UpdatePlaylist"
                                    className="fw-bold pointer"


                                >
                                    <FontResize >
                                        {playlist.name}
                                    </FontResize>

                                </div>

                                <div>Playlist</div>


                            </div>
                        </div>
                    )}

                    <div className="mob-text">
                        {playlist.name}
                    </div>

                    <div className="controls">



                        <div className="mob-del">

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

                        <div
                            className={`play-button`}



                        >
                            {playId === id && isPlaying ?
                                <div
                                    className="pointer smallPlayIcon2 h-100 w-100"
                                    onClick={handlePause}
                                >
                                    <PauseIcon height={18} width={18} fill={"black"} />
                                </div>

                                : <div className="pointer smallPlayIcon2 h-100 w-100"
                                    onClick={() => handleSongChange()}
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

                    <div className="table-container mob-d-none">
                        <table>
                            <thead>
                                <tr>
                                    <th className="track-number">#</th>
                                    <th>Title</th>
                                    <th style={{ width: '40%' }}> Album</th>
                                    {!songContainer && <th >Date added</th>}
                                    <th className="text-center">
                                        <i className="far fa-clock" />
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="">
                                {song &&
                                    song.map((playlistSong, index) => (
                                        <tr key={index}

                                            onClick={() => {
                                                handleClick(index);
                                            }}
                                            className={`tr-border position-relative ${selectedRow === index ? "activeRow" : ""
                                                }`}

                                        >
                                            <td className="track-number">

                                                <div className={`number ${audioId === playlistSong?.song?._id ? 'text-green' : ''}`}>{index + 1}</div>

                                                <div className="popover-target">
                                                    {audioId === playlistSong?.song?._id && isPlaying ?
                                                        (
                                                            <span onClick={handlePause}>

                                                                <PauseIcon />

                                                            </span>
                                                        ) : (
                                                            <span
                                                                onClick={() => {
                                                                    handleSongChangeOrPlay(playlistSong.song, index);
                                                                }}
                                                            >

                                                                <SmallPlayIcon />
                                                            </span>
                                                        )}

                                                </div>

                                            </td>



                                            <td className="track-title">
                                                <img
                                                    src={playlistSong?.song?.image}
                                                    alt="Album cover"
                                                />

                                                <div className="">
                                                    <div className={`song-info ${audioId === playlistSong?.song?._id ? 'text-green' : ''}`}>{playlistSong?.song?.name}</div>
                                                    <div className="song-info">{playlistSong?.artist?.name} </div>
                                                </div>
                                            </td>
                                            <td >
                                                <div className="album-info"> {playlistSong?.album?.name} </div>
                                            </td>
                                            {!songContainer && <td>  {new Date(playlistSong.createdAt).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })} </td>}
                                            <td className="text-center">{playlistSong?.song?.time}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {/* songs  for mobile screens*/}
                    <div className="flex-fill  d-none mob-d-block">

                        {song && song.map((song, index) => (

                            <>
                                <div key={index} className="mob-song-div" >

                                    <div className="d-flex song-div rounded p-1 px-2 align-items-center"

                                        onClick={() => { handleSongChangeOrPlay(song.song, index); }}


                                    >

                                        {/* song name/image  div */}
                                        <div className="d-flex col align-items-center">

                                            <div className="d-flex align-items-center justify-content-center">

                                                <img src={song?.song?.image} alt="song Image" height={42} className="rounded" />

                                            </div>

                                            <div className="px-2">
                                                <span className={`${audioId === song?.song?._id ? "text-green" : ""}`}> {song?.song?.name} </span> <br />
                                                <span className="text-grey"> {song?.artist?.name} </span>
                                            </div>
                                        </div>


                                        <div className="col-1 me-2" >

                                            <AddIcon />
                                        </div >




                                    </div>

                                </div>

                               

                            </>
                        ))}

                         <div className="last-div"></div>

                    </div>
                </ScrollBar >
            </div >

            {/* Delete Playlist Model */}
            {
                playlist && (
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
                )
            }

            {/* Edit Playlist Modal */}

            {
                playlist && (
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
                )
            }
        </>
    );
}

export default Playlist