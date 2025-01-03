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
        var res = await axios.post("https://spotify-backend-ten.vercel.app/auth/getUser", { token });
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