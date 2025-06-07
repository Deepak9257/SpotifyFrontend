import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../Icons/HomeIcon";
import LibraryIcon from "../Icons/LibraryIcon";
import SearchIcon from "../Icons/SearchIcon";
import SpotifyIcon from "../Icons/SpotifyIcon";
import HomeIcon2 from "../Icons/HomeIcon2";
import SearchIcon2 from "../Icons/SearchIcon2";


const MobNavbar = () => {


    const location = useLocation();

    const path = location.pathname

    return (<>

        <div className="mob-navbar">

            <Link to={"/"} className="text-decoration-none"> <div className={`${path === "/" ? "text-white" : ''}`}> {path === "/" ? <HomeIcon height="28" /> : <HomeIcon2 height={28} fill="#565656" />} Home</div> </Link>

            <Link to={"/search"} className="text-decoration-none">
                <div className={`${path === "/search" ? "text-white" : ''}`}>
                    {path === "/search" ? <SearchIcon2 fill={'white'} height="30" /> : <SearchIcon fill={`${path === "/search" ? "#fff" : "#565656"}`} height="28" />}
                    Search
                </div>
            </Link>

            <Link to={"/library"} className="text-decoration-none">  <div className={`${path === "/library" ? "text-white" : ''}`}> <LibraryIcon height="28" fill={`${path === "/library" ? "#fff" : "#565656"}`} /> Your Library</div> </Link>

            <Link to={"/pricing"} className="text-decoration-none">  <div className={`${path === "/pricing" ? "text-white" : ''}`}> <SpotifyIcon height="28" fill={`${path === "/pricing" ? "#fff" : "#565656"}`} /> Premium</div> </Link>

        </div>

    </>)
}

export default MobNavbar;