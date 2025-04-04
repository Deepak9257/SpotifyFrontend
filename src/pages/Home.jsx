
import { useEffect, useState } from "react";
import RytBar from "../components/RytBar";
import axios from "axios";




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
        var res = await axios.post("https://spotify-backend-blue.vercel.app/auth/getUser", {token});
        res = res.data;
        
        setUser(res.data);
       
        
       }




    return (
        <>

            <RytBar user={user}/>

        </>
    )


}

export default Home;