import axios from "axios";

import Bottom from "../components/Bottom";
import { useState, useEffect } from "react";
import RytBar from "../components/RytBar";



function Home() {



    const [user, setUser] = useState({});

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user) {

            getUser();

        }

    }, []);


    const getUser = async () => {

        const token = localStorage.getItem("token");
        var res = await axios.post("http://spotifybackend.ap-1.evennode.com//auth/getUser", { token });
        res = res.data;

        setUser(res.data);


    }

    return (
        <>
            <RytBar />
            <Bottom user={user} />
        </>
    )


}

export default Home;