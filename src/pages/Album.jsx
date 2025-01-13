import axios from "axios";
import Bottom from "../components/Bottom";
import React, { useEffect, useState } from 'react';
import Player from "../components/AudioPlayer";
import AddIcon from "../Icons/AddIcon";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import { useContext } from "react";
import songContext from "../contexts/createContext";

const Album = () => {

    const {currentSong, setCurrentSong} = useContext(songContext);
   

    const [loading, setLoading] = useState(true);
    const [PlayerSong, setPlayerSong] = useState("");

    const [Album, setAlbum] = useState({});
    const [songs, setSongs] = useState([]);
    const [songId, setSongId] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    const [artistID, setArtistID] = useState("");
    const [albumID, setAlbumID] = useState("");

    useEffect(() => {
        getAlbum();
        getSong();
    }, []);

    const getAlbum = async () => {
        const id = window.location.pathname.split("/album/")[1];
        var res = await axios.get("https://spotify-backend-ten.vercel.app/album/get/" + id);
        res = res.data;
        console.log("album data", res.data);
        setAlbum(res.data);
        setLoading(false);
    };

    const getSong = async () => {
        const id = window.location.pathname.split("/album/")[1];
        var res = await axios.get("https://spotify-backend-ten.vercel.app/song/getAllByAlbum/" + id);
        res = res.data;
        console.log(res.data);
        setSongs(res.data);
        setLoading(false);
    };

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

    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        getAllPlaylist();
    }, []);

    const getAllPlaylist = async () => {
        
        var res = await axios.get("https://spotify-backend-ten.vercel.app/playlist/getAll");
        res = res.data;
        setPlaylist(res.data);
        console.log(res.data);
    };

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
        );
    }

    const user2 = user?._id ? user : null;
    
    return (
        <>
            <div className="w-100 float-center text-white container-fluid">
                {Album && (
                    <div
                        className="mx-1 row justify-content-between gap-2 text-white p-3 rounded overflow-auto scroll"
                        style={{ backgroundColor: "#121212", height: "78vh" }}
                    >
                        <div class="header rounded-top-3">
                            <img
                                src={Album.image}
                                alt="Album cover with raindrops on a window"
                                className="object-fit-cover"
                            />
                            <div class="details">
                                <p>Album</p>
                                <h1>{Album.name}</h1>
                                <p className="">{Album?.artist?.name} </p>
                                <div class="stats">
                                    <i class="fab fa-spotify"></i>
                                    <span>1,510,293 saves • 325 songs, about 13 hr</span>
                                </div>
                            </div>
                        </div>
                        <div class="controls">
                            <button class="play-button">
                                <i class="fas fa-play"></i>
                            </button>
                            <div class="other-controls">
                                <i class="fas fa-plus"></i>
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
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

                                                <td className="popover-div" onClick={() => setCurrentSong(song)}>

                                                    <div className="smallplayIcon popover-container">

                                                        <div className="popover-target">
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
                )}
            </div>

            {!user2 && <Bottom />}

            {currentSong && <Player file={currentSong.songfile} />}

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
    );
};

export default Album;
