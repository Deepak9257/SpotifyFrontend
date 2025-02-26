import axios from "axios";
import Bottom from "../components/Bottom";
import React, { useEffect, useState } from 'react';
import AddIcon from "../Icons/AddIcon";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import { useContext } from "react";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";
import { Popover } from "@base-ui-components/react/popover";
import LoginBtnContext from "../contexts/RefContext";
import PopoverArrow from "../Icons/PopoverArrow";

const Album = ({ userId }) => {

  const loginBtnRef = useContext(LoginBtnContext)
  const [oneAlbum, setOneAlbum] = useState({})



  const { setCurrentSong, setCurrentIndex } = useContext(songContext);
  const { setCurrentPlaylist } = useContext(playlistContext);


  const [loading, setLoading] = useState(true);

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
    var res = await axios.get("https://spotify-backend-blue.vercel.app/album/get/" + id);
    res = res.data;
    console.log("album data", res.data);
    setAlbum(res.data);

    setLoading(false);
  };

  const getSong = async () => {
    const id = window.location.pathname.split("/album/")[1];
    var res = await axios.get("https://spotify-backend-blue.vercel.app/song/getAllByAlbum/" + id);
    res = res.data;
    console.log(res.data);
    setSongs(res.data);
    setLoading(false);
  };

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
    console.log(res.data);
  };

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    getAllPlaylist();
  }, []);

  const getAllPlaylist = async () => {

    var res = await axios.get("https://spotify-backend-blue.vercel.app/playlist/getAll");
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
    var res = await axios.post("https://spotify-backend-blue.vercel.app/auth/getUser", { token });
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

              {userId ? <div
                className="play-button" onClick={() => { setCurrentPlaylist(songs), setCurrentSong(songs[0]), setCurrentIndex(0) }}>
                <i className="fas fa-play"></i>
              </div> : <div
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
                className="play-button"
                onClick={() => { setOneAlbum(Album); console.log('album set successfully') }}
              >
                <i className="fas fa-play"></i>
              </div>}


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
                        <td class="track-number ">
                          <div className="number">{index + 1}</div>
                        </td>

                        <td className="popover-div">
                          {userId ? <div className="smallplayIcon popover-container">

                            <div className="popover-target" onClick={() => { { setCurrentIndex(index), setCurrentSong(song), setCurrentPlaylist(songs) } }} >
                              <SmallPlayIcon />
                            </div>



                          </div> : <div

                            data-bs-toggle="modal"
                            data-bs-target="#logoutModal"
                            className="smallplayIcon popover-container">

                            <div className="popover-target" onClick={() => { setOneAlbum(song) }} >
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


                          {userId ? <span
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
                          </span> :

                            <Popover.Root>
                              <Popover.Trigger className="addIcon bg-transparent border-0">
                                <span


                                  onClick={() => {
                                    console.log('open popup')
                                  }}
                                >
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
        )}
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


      {/* modal on logout */}

      {oneAlbum && <div className="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog  modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-body p-5 d-flex gap-5 ">

              <div className="col-5">
                <img src={oneAlbum.image} alt="artist image" className="rounded" width={300} height={300} />
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
    </>
  );
};

export default Album;
