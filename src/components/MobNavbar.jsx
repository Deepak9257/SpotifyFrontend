import { Link } from "react-router-dom";
import HomeIcon from "../Icons/HomeIcon";
import LibraryIcon from "../Icons/LibraryIcon";
import SearchIcon from "../Icons/SearchIcon";
import SpotifyIcon from "../Icons/SpotifyIcon";

const MobNavbar = () => {

    return (<>

        <div className="mob-navbar text-white">

            <Link to={"/"} className="text-decoration-none"> <div ><HomeIcon height="28" />Home</div> </Link>

            <Link to={"/search"} className="text-decoration-none">  <div><SearchIcon fill={'white'} height="28" /> Search</div>  </Link>

            <Link to={""} className="text-decoration-none">  <div><LibraryIcon height="28" /> Your Library</div> </Link>

            <Link to={"/pricing"} className="text-decoration-none">  <div><SpotifyIcon height="28" /> Premium</div> </Link>

        </div>

    </>)
}

export default MobNavbar;