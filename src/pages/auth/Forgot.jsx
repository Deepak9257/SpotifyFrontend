import { useState } from "react";
import axios from "axios";

function Forgot() {
  const [uemail, setEmail] = useState("");
  const [msg, setMsg] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    var res = await axios.post("http://127.0.0.1:5000/auth/forgot", {
      email: uemail,
    });

    console.log(res);
    if(res.data){
         
      if(res.data.status==true) {
        setMsg({status: "success", message : res.data.message});  
   
      }else{
       setMsg({status: "failed", message : res.data.message});  
   
      }
   
   
   
       }else{
         console.log("something wrong");
       }
    
  };

  return (
    <>
    <form method="post" onSubmit={handleSubmit}>
        
      <div className=" p-5  w-sm-100 rounded d-flex flex-column align-items-center">
        <div className="w-25 d-flex flex-column" style={{height:"90vh"}}>

        {msg && msg.status &&  <div className={`w-100 alert alert${msg.status=="success" ? `-success` : '-danger'}`}>{msg.message}</div> }

            <div className="mb-auto">  
          <div className="mb-3 text-white text-center">
            <i class="fa-brands fa-spotify fa-3x mb-4"></i>

            <h1 className="fw-bold fs-3 text-start w-100">
              Reset your password
            </h1>

            <p className="text-start">
              Enter the email address or username linked to your Spotify account
              and we'll send you an email.
            </p>
          </div>

          <div className="text-white text-start fw-bold col mb-2">
            <label htmlFor="email">Email or Username</label>
          </div>
          <div className="col">
            <input
              type="email"
              onKeyUp={(e) => setEmail(e.target.value)}
              className="w-100 p-2 rounded hvr grey b"
              id="email"
              placeholder="Email or Username"
            />
          </div>

          <div className='text-start py-3'> <p> <a href="#" className="link-underline-white green-link wyt"> Need support? </a> </p> </div>

          <button className="btn btn-success text-black w-100 p-2 rounded-pill fw-bold my-1" type="submit"> Send Link </button>
             

          </div>

          <div className='text-white text-center '>This site is protected by reCAPTCHA and the Google <a href="#" className="green-link wyt"> Privacy Policy </a>  and <a href="#" className="green-link wyt">  Terms of Service </a> apply.</div>


        </div>
      </div>
      
      </form>
    </>
  );
}

export default Forgot;
