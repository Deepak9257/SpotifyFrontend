import {BrowserRouter,Routes,Route} from "react-router-dom"
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




function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
           <Route element={<AppLayout/>}>
           <Route path="/" element={<Home/>}/>
           <Route path="/artist/:id" element={<Artist/>}/>
           <Route path="/album/:id" element={<Album/>}/>

           <Route path="/playlist/:id" element={<Playlist/>}/>
           <Route path="/pricing" element={<Pricing/>}/>
           </Route>

       
          <Route element={<AuthLayout/>}>
     
          <Route path="/signup" element={<SingnUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/resetpassword/:token" element={<ResetPass/>}/> 
           </Route>

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
