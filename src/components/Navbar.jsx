import React from 'react';
import HomeIcon from '../Icons/HomeIcon';
import FileIcon from '../Icons/FileIcon';
import SearchIcon from '../Icons/SearchIcon';
import SpotifyIcon from '../Icons/SpotifyIcon';
import {useNavigate} from "react-router-dom"


function Navbar({ user }) {

    user = user?._id ? user : null;


    const handleLogout = () => {
        
        const confirm = window.confirm("Are you sure?");
        if (confirm) {
            localStorage.removeItem("token");
            window.location.reload();
            useNavigate("/")

        }
    }

    return (

        <>
            <div className="container-fluid">
                <nav className="navbar row justify-content-between px-2">
                    <div className="col-2">
                        <a className="navbar-brand text-white ms-3" href="/">
                            <SpotifyIcon />
                        </a>
                    </div>

                    <div className="col-4 d-flex align-items-center gap-2 text-white ">
                        <div className='home-icon p-2 d-flex align-items-center'> <a href="/" className="d-flex align-items-center">  <HomeIcon /> </a>  </div>
                        <div className="d-flex bg-base rounded-pill align-items-center py-1 justify-content-between container-fluid" >
                            <div className='col-10 d-flex align-items-center'>
                                <div className='col-1 py-1'>  <SearchIcon /> </div>

                                <input
                                    className="col p-2 bg-base rounded-pill border-0 txt w-100"
                                    placeholder="What do you want to play?"
                                />

                            </div>

                            <div className='col-1'> <FileIcon /> </div>
                        </div>

                    </div>



                    {!user && <div className="text-end col-2">

                        <a href="/signup">
                            <button type="button" className="btn me-2 nav-signup-btn" >
                                <span className='signup-text text-decoration-none fw-bold'>
                                    Sign-up
                                </span>
                            </button>
                        </a>

                        <a href="/login" >
                            <button type="button" className="btn btn-light rounded-pill w-50 padding nav-login-btn" >
                                <span className='text-decoration-none text-black fw-bold'>
                                    Login
                                </span>
                            </button>
                        </a>
                    </div>}

                    {/* Logout section */}

                    {user && <>
                        <div className='col-3'>

                            <div className='row'>
                                <div className='col-4'>
                                    <a href="/pricing" >
                                        <button type="button" className="btn btn-light rounded-pill" >
                                            <span className='text-decoration-none text-nowrap text-black fw-bold'>
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
                                        <i class="fas fa-user fa-2x"></i>
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