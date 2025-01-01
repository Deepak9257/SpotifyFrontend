import LibraryIcon from "../Icons/LibraryIcon";
import PlusIcon from "../Icons/PlusIcon";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MusicIcon from "../Icons/MusicIcon";

function Leftbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const createPlaylist = async (e) => {
    e.preventDefault();
    var res = await axios.post("http://127.0.0.1:5000/playlist/create", {
      name, image, status,
    });
    res = res.data;
    window.location.reload();
  };

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    var user = localStorage.getItem("token");
    if (user) {
      getAllPlaylist();
    }
  }, []);

  const getAllPlaylist = async () => {
    var res = await axios.get("http://127.0.0.1:5000/playlist/getAll");
    res = res.data;
    setPlaylist(res.data);
    console.log(res.data);
    setLoading(false);
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
             
            <a href="#" data-bs-toggle="modal" data-bs-target="#CreatePlaylist">
               
              <PlusIcon /> 
            </a> 
          </span> 
        </div>

        {playlist && playlist.length > 0 ? (
          playlist &&
          playlist.map((item, index) => (
            <a href={`/playlist/${item._id}`} className="text-decoration-none">
               
      
              <div className="d-flex gap-2 align-items-center text-white rounded p-2">
                 <div className="p-2" style={{ backgroundColor: "#2c2c2c" }}>     
                 <MusicIcon /> 
               </div>

               <div>
               {item.name} 
                
                 </div>

              </div> 
            </a>
          ))
        ) : (
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
              <a
                href="/playlist"
                className="text-decoration-none text-dark"
                data-bs-toggle="modal"
                data-bs-target="#CreatePlaylist"
              >
                 
                <div className="px-3">
                   
                  <button
                    type="button"
                    className="btn btn-light rounded-5 text-black"
                  >
                     
                    Create Playlist
                  </button>
                </div>
              </a>
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
