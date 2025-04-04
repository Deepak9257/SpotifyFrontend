import LibraryIcon from "../Icons/LibraryIcon";
import PlusIcon from "../Icons/PlusIcon";
import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MusicIcon from "../Icons/MusicIcon";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import AddPlaylistIcon from "../Icons/AddPlaylistIcon";
import { Popover } from "@base-ui-components/react/popover"
import PopoverArrow from "../Icons/PopoverArrow";
import ScrollBar from "./scrollBar";
import { toast, Zoom } from 'react-toastify';
import PlayIcon from "../Icons/PlayIcon";
import playlistContext from "../contexts/PlaylistContext";
import PauseIcon from "../Icons/PauseIcon";
import songContext from "../contexts/SongContext";
import VolumeIcon from "../Icons/VolumeIcon";



function Leftbar({ user }) {

  const user2 = user?._id ? user : null;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);

  const { playId } = useContext(songContext);
  const { isPlaying } = useContext(songContext);

  // popover state variables
  const popoverAnchorRef = useRef(null);
  const popupTriggerRef = useRef(null)

  const createPlaylist = async (e) => {
    e.preventDefault();
    var res = await axios.post("https://spotify-backend-blue.vercel.app/playlist/create", {
      name, image, status, userId: user?._id
    });
    res = res.data;
    getAllPlaylist();
    // console.log('playlist created successfully:', res.data)
  };



  const [playlist, setPlaylist] = useState([]);

  console.log('playlist :', playlist)

  useEffect(() => {
    var user = localStorage.getItem("token");

    if (user) {
      getAllPlaylist();

    } else {
      setLoading(false)
    }
  }, [useLocation()]);

  const getAllPlaylist = async () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    var res = await axios.get("https://spotify-backend-blue.vercel.app/playlist/getAll");
    res = res.data;
    setPlaylist(res.data);
    setLoading(false)

  };


  // shadow effect code //

  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef(null)

  const handleScroll = () => {

    if (scrollRef.current) {

      if (scrollRef.current.scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  };

  useEffect(() => {

    const element = scrollRef.current;

    if (element) {

      element.addEventListener('scroll', handleScroll);
    } else (
      console.log("element does not set yet")
    )

    // Cleanup
    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };

  }, [handleScroll]);



  const handleClick = () => {

    if (popupTriggerRef.current) {
      popupTriggerRef.current.click();
    }

  }



  // loading code
  if (loading) {
    return (

      <div
        className="d-flex rounded flex-column leftbar-container"
        style={{ backgroundColor: "#121212", height: "78vh" }}
      >
        <div className=" fw-bold w-100 text-grey p-3 d-flex justify-content-between align-items-center">

          <span className="d-flex gap-3 align-items-center">

            <LibraryIcon /> Your library
          </span>
          <span>

            <PlusIcon />

          </span>
        </div>

        <div
          className="scroll py-2 w-100"
          style={{ backgroundColor: "#121212" }}
        >
          <div
            className="rounded d-flex justify-content-center text-success align-items-center my-3 p-2"
            style={{ backgroundColor: "#2c2c2c", height: "20vh" }}
          >
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-white mt-5">
            <div className="">

              <a href="#" className="text-decoration-none text-white">

                Legal
              </a>
              <a href="#" className="text-decoration-none text-white">

                Safety & PrivacyCenter
              </a>
              <a href="#" className="text-decoration-none text-white">

                Privacy Policy
              </a>
            </div>
            <div className="">Cookies AboutAds Accessibility</div>

            <div className="col-4">Cookies</div>
          </div>

          <div className="px-3 my-3 text-white">

            <button
              type="button"
              className="btn rounded-5 border border-white text-white"
            >

              English
            </button>
          </div>

        </div>



      </div>

    );
  }



  return (
    <>
      <div
        className="d-flex rounded flex-column leftbar-container"
        style={{ backgroundColor: "#121212", height: "78vh" }}
      >
        <div className="fw-bold text-grey  align-items-center ">

          <div className={`d-flex p-3 sticky-top library-div rounded-top justify-content-between ${isScrolled ? 'library-div-shadow' : ''} `}>

            <div className="d-flex gap-3 align-items-center">
              <LibraryIcon /> Your library
            </div>

            <Popover.Root>
              <Popover.Trigger className="border-0 btn plusIcon rounded-circle p-2 d-flex align-items-center">
                <PlusIcon />
              </Popover.Trigger>

              <Popover.Portal >
                <Popover.Positioner sideOffset={8} alignOffset={-100} side="bottom" className="z-9999">
                  <Popover.Popup className="Popup2">

                    <Popover.Description className="p-1 m-0" >
                      <Popover.Close className={'bg-transparent border-0 p-0'}>
                        <div
                          onClick={(e) => { if (user2) { createPlaylist(e) } else { handleClick() } }}
                          className="text-white createPlaylist d-flex align-items-center p-2 gap-2">

                          <div className="d-flex">
                            <AddPlaylistIcon />
                          </div>

                          <div className="">
                            Create a new playlist
                          </div>

                        </div>
                      </Popover.Close>
                    </Popover.Description>
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>

          </div>


          <ScrollBar>

            <div className=" rounded p-2" ref={scrollRef} id="createPlaylistdiv" style={{ maxHeight: "35vh" }} >

              {playlist && playlist.length > 0
                ? (
                  playlist &&
                  playlist.map((item, index) => (

                    <NavLink
                      key={index}
                      to={`/playlist/${item._id}`} className={`text-decoration-none `}  >


                      <div className="d-flex rounded playlist-bar gap-2 align-items-center rounded p-2">
                        <div className="p-2 musicIcon rounded position-relative" onClick={(e) => { e.preventDefault() }}>

                          <MusicIcon />

                          <div className="smallPlayIcon" >
                            {playId === item._id && isPlaying ? <PauseIcon /> : <PlayIcon />}
                          </div>

                        </div>

                        <div className={`w-100 ${playId===item._id && isPlaying ? 'text-green' : 'text-white'}`}>

                          {item.name}

                        </div>

                        <div className={`d-flex ${playId===item._id && isPlaying ? '':'d-none'}`}>
                          <VolumeIcon fill={'#1ed760'} filled={true}/>
                        </div>

                      </div>
                    </NavLink>
                  ))
                ) :

                (


                  <div

                    className="w-100"
                    style={{ backgroundColor: "#121212", height: "35vh" }}
                  >

                    <div
                      ref={popoverAnchorRef}
                      className="rounded text-white p-3"
                      style={{ backgroundColor: "#2c2c2c" }}
                    >
                      <p>Create your first playlist</p>
                      <p>It's easy, we'll help you</p>
                      <Popover.Root>
                        <div className="px-3">

                          <Popover.Trigger
                            render={() => {

                              if (user2) {
                                return <button
                                  onClick={(e) => createPlaylist(e)}
                                  className="text-black fw-bold btn btn-light rounded-5 text-black nav-login-btn"

                                >Create Playlist</button>;

                              } else {
                                return <Popover.Trigger
                                  ref={popupTriggerRef}
                                  className="text-black fw-bold btn btn-light rounded-5 text-black nav-login-btn"
                                >

                                  Create Playlist

                                </Popover.Trigger>

                              }

                            }}


                          >

                          </Popover.Trigger>



                          <Popover.Portal >
                            <Popover.Positioner className="z-9999" anchor={popoverAnchorRef} sideOffset={25} side="right">
                              <Popover.Popup className="Popup">

                                <Popover.Arrow className="Arrow">
                                  <PopoverArrow />
                                </Popover.Arrow>


                                <div className="text-black fw-bold">Create a playlist</div>

                                <div className="text-black mt-2"> Log in to create and share playlists.</div>

                                <div className="d-flex align-items-center gap-2 flex-row-reverse  mt-4">

                                  <a href="/login"><div className="px-3 py-1 text-black fw-bold btn btn-light rounded-pill text-black nav-login-btn">Login</div>
                                  </a>
                                  <Popover.Close className="text-black bg-transparent border-0 fw-bold nav-login-btn"> Not now</Popover.Close>

                                </div>



                              </Popover.Popup>
                            </Popover.Positioner>


                          </Popover.Portal>


                        </div>
                      </Popover.Root>

                    </div>

                    <div
                      className="rounded text-white my-3 p-3"
                      style={{ backgroundColor: "#2c2c2c" }}
                    >
                      <p>Let's find some podcasts to follow</p>
                      <p>We'll keep you updated on new episodes</p>
                      <div className="px-3">

                        <button type="button" className=" text-black fw-bold btn btn-light rounded-5">
                          Browse podcasts
                        </button>
                      </div>
                    </div>
                  </div>




                )}


            </div>
          </ScrollBar>


        </div>



        {!user2 && <div>
          <div className="text-white px-3 mt-5">
            <div className="">

              <a href="#" className="text-decoration-none text-white">

                Legal
              </a>
              <a href="#" className="text-decoration-none text-white">

                Safety & PrivacyCenter
              </a>
              <a href="#" className="text-decoration-none text-white">

                Privacy Policy
              </a>
            </div>
            <div className="">Cookies AboutAds Accessibility</div>

            <div className="col-4">Cookies</div>
          </div>

          <div className="px-3 my-3 text-white">

            <button
              type="button"
              className="btn rounded-5 border border-white text-white"
            >

              English
            </button>
          </div>

        </div>}


      </div>




    </>
  );
}
export default Leftbar;
