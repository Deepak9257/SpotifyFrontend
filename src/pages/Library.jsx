import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MusicIcon from "../Icons/MusicIcon";

const Library = () => {

    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        var user = localStorage.getItem("token");

        if (user) {
            getAllPlaylist();

        }

    }, []);

    const getAllPlaylist = async () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        var res = await axios.get("https://spotify-backend-blue.vercel.app/playlist/getAll");
        res = res.data;
        setPlaylist(res.data);
        console.log(res.data)
        setLoading(false)

    };

    if (loading) {
       return(
         <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        </div>
       )
    }

    return (<>

        <div className="library border-bottom border-black border-3"><h1>Your Library</h1></div>


        {playlist && playlist.map((data, index) => (
            <>
              <Link 
              to={`/playlist/${data._id}`}
              className="text-decoration-none"
              >
              
              
                <div className="mob-song-div">

                    <div className="d-flex song-div p-2 align-items-center text-white" >


                        <div className="d-flex col align-items-center px-2">

                            <div className=" me-3 p-2 musicIcon" >
                                <MusicIcon />
                            </div>

                            <div className="fs-4">
                                {data.name}
                            </div>


                        </div>






                    </div>
                </div>
              </Link>
            </>
        ))}

    </>)
}

export default Library;