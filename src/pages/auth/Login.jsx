import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Eye from '../../Icons/Eye';
import CloseEye from '../../Icons/CloseEye';



function Login() {

  const [uemail, setEmail] = useState('');
  const [upassword, setPassword] = useState('');
  const [msg, setMsg] = useState({});
  const [active, inactive] = useState(false)
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    var res = await axios.post("https://spotify-backend-blue.vercel.app/auth/login", {
      email: uemail, password: upassword
    })

    console.log(res.data)

    if (res.data) {

      if (res.data.status == true) {
        setMsg({ status: "success", message: res.data.message });
        localStorage.setItem("token", res.data.data.token)
        navigate("/")


      } else {
        setMsg({ status: "failed", message: res.data.message });

      }



    } else {
      console.log("something wrong");
    }


  };

  const handleClick = () => {
    inactive(current => !current)
  }

  const [pswrd, setPswrd] = useState(true)

  const handlePswrd = () => {
    setPswrd(!pswrd)
    console.log(pswrd);

  }



  return (
    <>
      <div className="text-center container-fluid d-flex justify-content-center p-5 login">
        <div className=" p-5 grey w-50 w-sm-100 rounded d-flex flex-column align-items-center">
          <div className="w-50">
            <div className="mb-3 text-white">
              <i className="fa-brands fa-spotify fa-3x"></i>

              <h1 className="fw-bold fs-3">Log in to Spotify</h1>
            </div>

            <div className=" d-flex flex-column align-items-center p-0">
              <button
                className="btn b hvr text-white w-100  rounded-pill fw-bold my-2 d-flex justify-content-evenly align-items-center"
                type="submit"
              >

                <span className="fs-4 col-3">

                  <i className="bi bi-google"></i>
                </span>
                <span className="col"> Continue with Google</span>
              </button>
              <button
                className="btn b hvr text-white w-100  rounded-pill fw-bold my-2 d-flex justify-content-evenly align-items-center"
                type="submit"
              >

                <span className="fs-4 col-3">

                  <i className="bi bi-facebook"></i>
                </span>
                <span className="col"> Continue with Facebook</span>
              </button>
              <button
                className="btn b hvr text-white w-100 rounded-pill fw-bold my-2 d-flex justify-content-evenly align-items-center"
                type="submit"
              >

                <span className="fs-4 col-3">

                  <i className="bi bi-apple"></i>
                </span>
                <span className="col"> Continue with Apple</span>
              </button>
              <button
                className="btn b hvr text-white w-100 rounded-pill fw-bold my-2 d-flex justify-content-evenly align-items-center"
                type="submit"
              >

                <span className="my-2"> Continue with phone number</span>
              </button>
            </div>
          </div>

          <div className="text-light w-75">

            <hr />
          </div>

          <form method="post" onSubmit={handleSubmit}>
            <div className="">
              {msg && msg.status && (
                <div
                  className={`w-100 alert alert${msg.status == "success" ? `-success` : "-danger"
                    }`}
                >
                  {msg.message}
                </div>
              )}

              <div className="row-gap-3 d-grid p-3 ">
                <div className="text-white text-start fw-bold col">

                  <label htmlFor="email">Email or Username</label>
                </div>
                <div className="col">
                  <input
                    onFocus={handleClick}
                    type="email"
                    onKeyUp={(e) => setEmail(e.target.value)}
                    className={"w-100 p-2 rounded hvr grey b text-white"}
                    id="email"
                    placeholder="Email or Username"
                    required
                  />
                </div>

                <div className="text-white text-start fw-bold col">

                  <label htmlFor="pswrd">Password</label>
                </div>
                <div className="col position-relative z-0 d-flex align-items-center">

                  <div className="w-100" >
                    <input
                      type={pswrd ? "password" : "text"}
                      onKeyUp={(e) => setPassword(e.target.value)}
                      className="w-100 p-2 rounded hvr grey b"
                      id="pswrd"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="" onClick={handlePswrd}>

                    {pswrd ? (
                      <span className='eye position-absolute'> <CloseEye /> </span>

                    ) : (
                      <span className='eye position-absolute'> <Eye /> </span>
                    )}
                  </div>
                </div>

                <button
                  className="btn login-btn btn-success text-black w-100 p-2 rounded-pill fw-bold"
                  type="submit"
                >

                  Log in
                </button>
                <div>

                  <p>

                    <a href="/forgot" className="fw-bold green-link wyt">

                      Forgot your password?
                    </a>
                  </p>
                </div>
                <div className="text-nowrap">

                  <p>

                    Don't have an account?
                    <a href="/signup" className="green-link fw-bold wyt">

                      Sign up for spotify
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>


      {/* for small screen */}

      <div className="d-none sm-screen text-center d-flex justify-content-center">
        <div className="w-100 p-2 d-flex flex-column align-items-center">
          <div className="w-100">
            <div className="mb-3 text-white">
              <i className="fa-brands fa-spotify fa-3x"></i>

              <h1 className="fw-bold fs-3">Log in to Spotify</h1>
            </div>

            <div className=" d-flex flex-column align-items-center p-0">
              <button
                className="btn b hvr text-white w-100  rounded-pill fw-bold my-2 d-flex justify-content-evenly align-items-center"
                type="submit"
              >

                <span className="fs-4 col-3">

                  <i className="bi bi-google"></i>
                </span>
                <span className="col"> Continue with Google</span>
              </button>
              <button
                className="btn b hvr text-white w-100  rounded-pill fw-bold my-2 d-flex justify-content-evenly align-items-center"
                type="submit"
              >

                <span className="fs-4 col-3">

                  <i className="bi bi-facebook"></i>
                </span>
                <span className="col"> Continue with Facebook</span>
              </button>
              <button
                className="btn b hvr text-white w-100 rounded-pill fw-bold my-2 d-flex justify-content-evenly align-items-center"
                type="submit"
              >

                <span className="fs-4 col-3">

                  <i className="bi bi-apple"></i>
                </span>
                <span className="col"> Continue with Apple</span>
              </button>
              <button
                className="btn b hvr text-white w-100 rounded-pill fw-bold my-2 d-flex justify-content-evenly align-items-center"
                type="submit"
              >

                <span className="my-2"> Continue with phone number</span>
              </button>
            </div>
          </div>

          <div className="text-light w-75">

            <hr />
          </div>

          <form method="post" onSubmit={handleSubmit}>
            <div className="">
              {msg && msg.status && (
                <div
                  className={`w-100 alert alert${msg.status == "success" ? `-success` : "-danger"
                    }`}
                >
                  {msg.message}
                </div>
              )}

              <div className="row-gap-3 d-grid p-3 ">
                <div className="text-white text-start fw-bold col">

                  <label htmlFor="email2">Email or Username</label>
                </div>
                <div className="col">
                  <input
                    onFocus={handleClick}
                    type="email"
                    onKeyUp={(e) => setEmail(e.target.value)}
                    className={"w-100 p-2 rounded hvr grey b text-white"}
                    id="email2"
                    placeholder="Email or Username"
                    required
                  />
                </div>

                <div className="text-white text-start fw-bold col">

                  <label htmlFor="2">Password</label>
                </div>
                <div className="col position-relative z-0 d-flex align-items-center">

                  <div className="w-100" >
                    <input
                      type={pswrd ? "password" : "text"}
                      onKeyUp={(e) => setPassword(e.target.value)}
                      className="w-100 p-2 rounded hvr grey b"
                      id="pswrd2"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="" onClick={handlePswrd}>

                    {pswrd ? (
                      <span className='eye position-absolute'> <CloseEye /> </span>

                    ) : (
                      <span className='eye position-absolute'> <Eye /> </span>
                    )}
                  </div>
                </div>

                <button
                  className="btn login-btn btn-success text-black w-100 p-2 rounded-pill fw-bold"
                  type="submit"
                >

                  Log in
                </button>
                <div>

                  <p>

                    <a href="/forgot" className="fw-bold green-link wyt">

                      Forgot your password?
                    </a>
                  </p>
                </div>
                <div className="text-nowrap">

                  <p>

                    Don't have an account?
                    <a href="/signup" className="green-link fw-bold wyt">

                      Sign up for spotify
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>


      <div className="login-bottom text-white text-center p-5">
        This site is protected by reCAPTCHA and the Google
        <a href="#" className="link text-secondary">

          Privacy Policy
        </a>
        and
        <a href="#" className="link text-secondary">

          Terms of Service
        </a>
        apply.
      </div>
    </>
  );
}

export default Login;
