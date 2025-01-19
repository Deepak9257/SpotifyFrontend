import { useState } from "react";
import axios from "axios";

function ResetPass() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.location.pathname.split('/resetpassword/')[1];
    var res = await axios.post("https://spotify-backend-blue.vercel.app/auth/resetpassword", {
      password,
      token
    });

    console.log(res);
    if (res.data) {
      if (res.data.status == true) {
        setMsg({ status: "success", message: res.data.message });
      } else {
        setMsg({ status: "failed", message: res.data.message });
      }
    } else {
      console.log("something wrong");
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <div className=" p-5  w-sm-100 rounded d-flex flex-column align-items-center">
          <div className="w-25 d-flex flex-column" style={{ height: "90vh" }}>
            {msg && msg.status && (
              <div
                className={`w-100 alert alert${msg.status == "success" ? `-success` : "-danger"
                  }`}
              >
                {msg.message}
              </div>
            )}

            <div className="mb-auto">
              <div className="mb-3 text-white text-center">
                <i class="fa-brands fa-spotify fa-3x mb-4"></i>

                <h1 className="fw-bold fs-3 w-100 text-justify">
                  Create new password
                </h1>

                <p className="text-start">
                  Please enter your new password below for your Spotify account.
                </p>
              </div>

              <div className="text-white text-start fw-bold col mb-2">
                <label htmlFor="pswrd">New Password</label>
              </div>
              <div className="col">
                <input
                  type="password"
                  onKeyUp={(e) => setPassword(e.target.value)}
                  className="w-100 p-2 rounded hvr grey b"
                  id="pswrd"
                  placeholder="Password"
                />
              </div>

              <div className="text-white text-start col my-2">
                <p className="fw-bold">Your password must contain at least</p>

                <ul className="font-size">
                  <li>10 characters</li>
                  <li>1 letter</li>
                  <li>1 number or special character (example: # ? ! &)</li>
                </ul>
              </div>

              <div className="text-white text-start fw-bold col mb-2">
                <label htmlFor="pswrd1">Confirm new password</label>
              </div>
              <div className="col">
                <input
                  type="password"
                  className="w-100 p-2 rounded hvr grey b"
                  id="pswrd1"
                  placeholder="Password"
                />
              </div>

              <div className="text-start py-3">
                <p>
                  <a href="#" className="link-underline-white green-link wyt">
                    Need support?
                  </a>
                </p>
              </div>

              <button
                className="btn btn-success text-black w-100 p-2 rounded-pill fw-bold my-1"
                type="submit"
              >
                Send Link
              </button>
            </div>

            <div className="text-white text-center ">
              This site is protected by reCAPTCHA and the Google
              <a href="#" className="green-link wyt">
                Privacy Policy
              </a>
              and
              <a href="#" className="green-link wyt">
                Terms of Service
              </a>
              apply.
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ResetPass;
