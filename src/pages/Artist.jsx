import axios from "axios";
import Bottom from "../components/Bottom"
import { useEffect, useState } from "react";
import VerifiedIcon from "../Icons/Verified";

const Artist = () => {

    const [loading, setLoading] = useState(true)



    
    const [Artist, setArtist] = useState({});
    useEffect(() => {
        getArtist()

    }, []);

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
        res=res.data; 
        setUser(res.data);


    }

    const user2 = user?._id ? user : null;



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
    return (
        <>
            <div className="w-100 float-center text-white container-fluid" >


                {Artist &&

                    <div className="mx-1 row justify-content-between gap-2 text-white p-3 rounded overflow-auto scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>

                        <div class="artist-header rounded-top-3">
                            <img src={Artist.image} alt="" srcset="" className="object-fit-cover rounded-circle" />

                            <div className="">
                                <div> <VerifiedIcon/> Verified Artist </div>
                                <span className="fw-bold text ">{Artist.name}</span> <br />
                                <span>42,405,290 monthly listeners                              </span>


                            </div>
                        </div>
                        <div class="controls ">
                            <div class="play-button">
                                <i class="fas fa-play"></i>
                            </div>

                            <div class="other-controls d-flex gap-4">
                                <div className="px-3 border rounded-pill py-1">Follow</div>
                            </div>

                            <div> <i class="fas fa-ellipsis-h py-2"></i> </div>
                            
                        </div>
                        <div>  <span className="fs-2 fw-bold">Popular</span> </div>

                        <div class="table-container">
                            <table>
                           
                                <tbody>
                                    <tr>
                                        <td class="track-number">1</td>
                                        <td class="track-title">
                                            <img src="https://placehold.co/40x40" alt="Album cover for Slumber Rain" />
                                            <div>
                                                <div>Slumber Rain</div>
                                                <div>Nature Of Sweden</div>
                                            </div>
                                        </td>
                                        <td>Rainy Mind</td>
                                        <td>Jul 12, 2024</td>
                                        <td>2:26</td>
                                    </tr>
                                    <tr>
                                        <td class="track-number">2</td>
                                        <td class="track-title">
                                            <img src="https://placehold.co/40x40" alt="Album cover for Stormy Night Reflections: Rain Soundscape" />
                                            <div>
                                                <div>Stormy Night Reflections: Rain Soundscape</div>
                                                <div>24H Rain Sounds</div>
                                            </div>
                                        </td>
                                        <td>Stormy Night Reflections: Rain Soundscape</td>
                                        <td>Jul 12, 2024</td>
                                        <td>2:35</td>
                                    </tr>
                                    <tr>
                                        <td class="track-number">3</td>
                                        <td class="track-title">
                                            <img src="https://placehold.co/40x40" alt="Album cover for Clarity" />
                                            <div>
                                                <div>Clarity</div>
                                                <div>Relaxcation</div>
                                            </div>
                                        </td>
                                        <td>Drizzle & Shower</td>
                                        <td>Jul 12, 2024</td>
                                        <td>2:19</td>
                                    </tr>
                                    <tr>
                                        <td class="track-number">4</td>
                                        <td class="track-title">
                                            <img src="https://placehold.co/40x40" alt="Album cover for Watch The Storm" />
                                            <div>
                                                <div>Watch The Storm</div>
                                                <div>Distantic</div>
                                            </div>
                                        </td>
                                        <td>It's A Storm</td>
                                        <td>Jul 12, 2024</td>
                                        <td>2:33</td>
                                    </tr>
                                    <tr>
                                        <td class="track-number">5</td>
                                        <td class="track-title">
                                            <img src="https://placehold.co/40x40" alt="Album cover for Healing Night Rain" />
                                            <div>
                                                <div>Healing Night Rain</div>
                                                <div>Sprightly Showers</div>
                                            </div>
                                        </td>
                                        <td>Healing Night Rain</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                }



            </div>





            {!user2 &&
                <Bottom />}

        </>
    )
}

export default Artist