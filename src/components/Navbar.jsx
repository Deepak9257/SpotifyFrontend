import React, { useState, useEffect, useRef, useContext } from 'react';
import HomeIcon from '../Icons/HomeIcon';
import FileIcon from '../Icons/FileIcon';
import SearchIcon from '../Icons/SearchIcon';
import SpotifyIcon from '../Icons/SpotifyIcon';
import { useNavigate, Link, useLocation } from "react-router-dom"

import HomeIcon2 from '../Icons/HomeIcon2';
import LoginBtnContext from '../contexts/RefContext';






function Navbar({ user }) {

    const navigate = useNavigate()
    const location = useLocation();
    // const [searchValue, setSearchValue] = useState('');

    const loginBtnRef = useContext(LoginBtnContext)    

    const handleLogout = () => {

        const confirm = window.confirm("Are you sure?");
        if (confirm) {
            localStorage.removeItem("token");
            navigate("/")
            window.location.reload();

        }
    }

    const url = location.pathname
    // console.log("url:",url )

    const handleChange = (e) => {

        

        const value = e.target.value?.trim() || ""
        // console.log("value:",`/search/${value}`)
        
        if(value === ""){
        navigate(`/search`);
        return;
        }   
        
        navigate(`/search/${value}`);
    }

    user = user?._id ? user : null;

    return (

        <>
            <div className="container-fluid navbar-div" 
                style={{height:"10%"}}
            >

                <nav className="navbar  px-2 h-100">
                    <div className="col navbar-brand text-white ms-3">
                        <Link to={"/"}>

                            <SpotifyIcon />

                        </Link>
                    </div>

                    <div className="col d-flex align-items-center gap-2 text-white ">
                    <Link className='home-icon p-2 d-flex align-items-center' to={"/"}>   <div>  {url === "/" ? <HomeIcon /> : <HomeIcon2 />} </div> </Link> 
                        <div className="d-flex bg-base search-bar rounded-pill align-items-center py-1 justify-content-between container-fluid" >
                            <div className='col-10 d-flex align-items-center'>
                                <div className='col-1 py-1 search-Icon'>  <SearchIcon /> </div>

                                <input
                                    className="col-11 search-input p-2 rounded-pill border-0 txt w-100"
                                    placeholder="What do you want to play?"
                                    onChange={(e) => { handleChange(e); }}
                                />

                            </div>

                            <div className='col-1 file-icon'> <FileIcon /> </div>
                        </div>

                    </div>



                    {!user && <div className="text-end col">

                      <div className=''>
                      <a href="/signup">
                            <button type="button" className="btn me-2 nav-signup-btn" >
                                <span className='signup-text text-decoration-none fw-bold '>
                                    Sign-up
                                </span>
                            </button>
                        </a>

                        <a href="/login" >
                            <button ref={loginBtnRef} type="button" className="btn btn-light rounded-pill w-25  padding nav-login-btn" >
                                <span className='text-decoration-none text-black fw-bold'>
                                    Login
                                </span>
                            </button>
                        </a>
                      </div>
                    </div>}

            

                    {user && <>
                        <div className='col'>

                            <div className='row align-items-center justify-content-between flex-nowrap'>
                                <div className='col ms-5 premium-btn'>
                                    <a href="/pricing" className='text-decoration-none'>
                                        <button type="button" className="btn btn-light rounded-pill w-100 "  style={{
                                            height:"5vh",
                                            display:"flex",
                                            justifyContent:'center',
                                            alignItems:'center',
                                           
                                        }}>
                                            <span className=' text-nowrap text-black fw-bold'>
                                                Explore Premium
                                            </span>
                                        </button>
                                    </a>
                                </div>

                                <div className="col nav-item dropdown text-white d-flex justify-content-end text-end gap-2 align-items-center">
                                    {user.name}
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >

                                        {/* You can also use icon as follows: */}
                                        <i className="fas fa-user fa-2x"></i>
                                    </a>

                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <i className="fas fa-sliders-h fa-fw" /> Account
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <i className="fas fa-cog fa-fw" /> Settings
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={handleLogout}>
                                                <i className="fas fa-sign-out-alt fa-fw" /> Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </>
                    }


                </nav>


            </div>

        </>
    )

}

export default Navbar;