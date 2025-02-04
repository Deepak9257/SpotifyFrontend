import LibraryIcon from "../Icons/LibraryIcon";
import PlusIcon from "../Icons/PlusIcon";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import MusicIcon from "../Icons/MusicIcon";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import Popover from "./Popover";
import AddPlaylistIcon from "../Icons/AddPlaylistIcon";

function Leftbar({ user }) {

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);


  // popover state variables
  const [popover, setPopover] = useState(false);
  const targetRef = useRef(null);

  const createPlaylist = async (e) => {
    e.preventDefault();
    var res = await axios.post("https://spotify-backend-blue.vercel.app/playlist/create", {
      name, image, status, userId: user?._id
    });
    res = res.data;
    getAllPlaylist();
    console.log(res.data)
  };


  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    var user = localStorage.getItem("token");
    if (user) {
      getAllPlaylist();

    } else {
      setLoading(false)
    }
  }, []);

  const getAllPlaylist = async () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    var res = await axios.get("https://spotify-backend-blue.vercel.app/playlist/getAll");
    res = res.data;
    setPlaylist(res.data);
    setLoading(false)

  };


  // loading condition
  if (loading) {
    return (
      <>
        <div
          className="d-flex container flex-column w-25 float-start rounded ms-3 me-2 "
          style={{ backgroundColor: "#121212", height: "78vh" }}
        >
          <div className=" fw-bold text-grey p-3 d-flex justify-content-between align-items-center">

            <span className="d-flex gap-3 align-items-center">

              <LibraryIcon /> Your library
            </span>
            <span>

              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#CreatePlaylist"
              >

                <PlusIcon />
              </a>
            </span>
          </div>

          <div
            className="scroll py-2 w-100"
            style={{ backgroundColor: "#121212", maxHeight: "35vh" }}
          >
            <div
              className="rounded d-flex justify-content-center text-success align-items-center my-3 p-2"
              style={{ backgroundColor: "#2c2c2c", height: "20vh" }}
            >
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>

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
      </>
    );
  }




  const user2 = user?._id ? user : null;



  // popover code

  const handleClose = () => {
    setPopover(false);

  };

  const togglePopover = () => {
    setPopover(!popover)
  }



  return (
    <>
      <div
        className="d-flex container flex-column w-25 float-start rounded ms-3 me-2 "
        style={{ backgroundColor: "#121212", height: "78vh" }}
      >
        <div className=" fw-bold text-grey p-3 d-flex justify-content-between align-items-center">

          <span className="d-flex gap-3 align-items-center">

            <LibraryIcon /> Your library
          </span>

          <span ref={targetRef} onClick={togglePopover} className="plusIcon rounded-circle p-2 d-flex align-items-center">

           <PlusIcon />

          </span>


          {popover &&  <Popover
              targetRef={targetRef}
              onClose={handleClose}
              setPopover={setPopover}
              customPosition={{top:"125", left:"180"}}

              position="left" 
              style={{ backgroundColor: "#282828" , padding:"5px" }}
            >

              <div className=" text-white d-flex createPlaylist gap-2 align-items-center p-2">
               
                <div className="d-flex">
                  <AddPlaylistIcon/>
                </div>

                <div>
                  
                  Create Playlist 

                </div>
              </div>

            </Popover>}


        </div>

        {playlist && playlist.length > 0 ? (
          playlist &&
          playlist.map((item) => (
            <NavLink to={`/playlist/${item._id}`} className={`text-decoration-none`}  >


              <div className="d-flex position-relative rounded playlist-bar gap-2 align-items-center text-white rounded p-2">
                <div className="p-2" style={{ backgroundColor: "#2c2c2c" }}>
                  <MusicIcon />
                </div>
                <div
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  data-bs-title={`Play ${item.name}`}


                  className="position-absolute smallPlayIcon">
                  <SmallPlayIcon />
                </div>
                <div>

                  {item.name}

                </div>

              </div>
            </NavLink>
          ))
        ) :

          !user2 ? (
            <>

              <div
                className="scroll py-2 w-100"
                style={{ backgroundColor: "#121212", maxHeight: "35vh" }}
              >
                <div
                  className="rounded text-white my-3 p-2"
                  style={{ backgroundColor: "#2c2c2c" }}
                >
                  <h4>Create your first playlist</h4>
                  <h5>It's easy, we'll help you</h5>
                  <div className="px-3 border">
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#LoginModal"
                    >


                      <button
                        type="button"
                        className="btn btn-light rounded-5 text-black"
                      >
                        Create Playlist
                      </button>
                    </a>
                  </div>

                </div>

                <div
                  className="rounded text-white my-3 p-2"
                  style={{ backgroundColor: "#2c2c2c" }}
                >
                  <h4>Let's find some podcasts to follow</h4>
                  <h5>We'll keep you updated on new episodes</h5>
                  <div className="px-3">

                    <button type="button" className="btn btn-light rounded-5">
                      Browse podcasts
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal for Login */}
              <div
                className="modal fade"
                id="LoginModal"
                tabIndex="-1"
                aria-labelledby="LoginModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="LoginModalLabel">Login</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>Please log in to create a playlist.</p>
                      {/* Login form or other components */}
                      <form>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input type="email" className="form-control" id="email" required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input type="password" className="form-control" id="password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </>

          ) : (
            <>

              <div
                className="scroll py-2 w-100"
                style={{ backgroundColor: "#121212", maxHeight: "35vh" }}
              >
                <div
                  className="rounded text-white my-3 p-2"
                  style={{ backgroundColor: "#2c2c2c" }}
                >
                  <h4>Create your first playlist</h4>
                  <h5>It's easy, we'll help you</h5>

                  <div className="px-3 border">

                    <a
                      href="/playlist"
                      className="text-decoration-none text-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#CreatePlaylist"
                    >


                      <button
                        type="button"
                        className="btn btn-light rounded-5 text-black"
                      >

                        Create Playlist
                      </button>
                    </a>




                  </div>
                </div>

                <div
                  className="rounded text-white my-3 p-2"
                  style={{ backgroundColor: "#2c2c2c" }}
                >
                  <h4>Let's find some podcasts to follow</h4>
                  <h5>We'll keep you updated on new episodes</h5>
                  <div className="px-3">

                    <button type="button" className="btn btn-light rounded-5">
                      Browse podcasts
                    </button>
                  </div>
                </div>
              </div>
            </>

          )}


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

        {/* Create Playlist Modal */}
        <div
          className="modal fade"
          id="CreatePlaylist"
          tabIndex={-1}
          aria-labelledby="CreatePlaylist"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="CreatePlaylist">
                  Create new playlist
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <form method="post" onSubmit={createPlaylist}>
                <div className="modal-body bg-dark text-white">
                  <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control border px-2"
                      placeholder="Enter Name"
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
                        Select Status
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
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Leftbar;
