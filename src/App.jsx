import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SingnUp from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Forgot from "./pages/auth/Forgot"
import ResetPass from "./pages/auth/ResetPass"
import "../src/components/index.css"
import "../src/pages/App.css"
import AppLayout from "./layout/AppLayout"
import AuthLayout from "./layout/AuthLayout"
import Album from "./pages/Album"
import Artist from "./pages/Artist"
import Playlist from "./pages/Playlist"
import Pricing from "./pages/Pricing"
import songContext from "./contexts/SongContext"
import playlistContext from "./contexts/PlaylistContext"
import { useEffect, useRef, useState } from "react"
// import SearchSong from "./pages/SongSearch"
import SearchLayout from "./layout/SearchLayout"
import SongSearch from "./pages/SongSearch"
import ArtistSearch from "./pages/ArtistSearch"
import AlbumSearch from "./pages/AlbumSearch"
import Browse from "./pages/Browse"
import LoginBtnContext from "./contexts/RefContext";
import axios from "axios"
import AllSearch from "./pages/AllSearch"
import Library from "./pages/Library"




function App() {


  const [user, setUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      getUser();

    }

  }, []);


  const getUser = async () => {

    const token = localStorage.getItem("token");
    var res = await axios.post("https://spotify-backend-blue.vercel.app/auth/getUser", { token });
    res = res.data;

    setUser(res.data);


  }


  const userId = user?._id ? user : null;


  const [currentSong, setCurrentSong] = useState({});
  const [currentIndex, setCurrentIndex] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songContainer, setSongContainer] = useState(true);
  const [fullMode, setFullMode] = useState(false);
  const [playId, setPlayId] = useState("");
  const [audioId, setAudioId]=useState("");

  const loginBtnRef = useRef(null)

  return (
    <>

      <BrowserRouter>

        <Routes>

          <Route element={
            
            <songContext.Provider value={{
            currentSong,
            setCurrentSong,
            currentIndex,
            setCurrentIndex,
            songContainer,
            setSongContainer,
            fullMode,
            setFullMode,
            isPlaying,
            setIsPlaying,
            playId,
            setPlayId,
            audioId,
            setAudioId

          }} >

            <playlistContext.Provider value={{ currentPlaylist, setCurrentPlaylist }}>

              <LoginBtnContext.Provider value={loginBtnRef}>

                <AppLayout />

              </LoginBtnContext.Provider>

            </playlistContext.Provider>
          </songContext.Provider>}>

            <Route path="/" element={<Home />} />
            <Route path="/artist/:id" element={<Artist userId={userId} />} />
            <Route path="/album/:id" element={<Album userId={userId} />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/library" element={<Library />} />
            
            <Route element={<SearchLayout />} >

              <Route path="/search" element={<Browse userId={userId}/>} />
              <Route path="/search/:q" element={<AllSearch userId={userId} />} />
              <Route path="/search/:q/song" element={<SongSearch userId={userId} />} />
              <Route path="/search/:q/artist" element={<ArtistSearch userId={userId} />} />
              <Route path="/search/:q/album" element={<AlbumSearch userId={userId} />} />

            </Route>

          </Route>


          <Route element={<AuthLayout />}>

            <Route path="/signup" element={<SingnUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetpassword/:token" element={<ResetPass />} />

          </Route>

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
