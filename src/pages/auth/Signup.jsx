import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SingnUp() {
  const [uname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [upassword, setPassword] = useState('');
  const [msg, setMsg] = useState({});
  const [openForm, setOpenForm] = useState(false)
  const navigate = useNavigate();


  const validateEmail = async (e) => {
    e.preventDefault();
    setMsg('')
    var res = await axios.post('http://spotifybackend.ap-1.evennode.com//auth/validateEmail', { email })
    res = res.data;

    if (res.status == true) {
      setOpenForm(true)
      setMsg({ status: "success", message: res.message})

    } else {
      setMsg({ status: "success", message: res.message})
    }
    console.log(res.data);

    return false


  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    var res = await axios.post("http://spotifybackend.ap-1.evennode.com//auth/register", {
      name: uname, email: email, password: upassword
    })

    console.log(res.data)

    if (res.data) {

      if (res.data.status == true) {

        setMsg({ status: "success", message: res.data.message + '   Opening Login Page...' });

        new Promise(setTimeout(() => {
          navigate('/login')

        }, 2500))



      } else {
        setMsg({ status: "failed", message: res.data.message });

      }



    } else {
      console.log("something wrong");
    }


  }


  return <>
    <div className="text-center d-flex justify-content-center container-fluid p-5">
      <div className=" px-4 w-25">

        <header className="text-white mb-5">
          <i class="fa-brands fa-spotify fa-3x "></i>

          <h1 className="fw-bold mt-4">
            Sign up to <br/> start listening
          </h1>
        </header>
        {msg && msg.status && <div className={`alert alert${msg.status == "success" ? `-success` : '-danger'}`}>{msg.message}</div>}


        {openForm ?
       (   <form method='post' onSubmit={handleSubmit}>
            <div className="text-white text-start fw-bold "> <label htmlFor="name">Name</label></div>
            <div className="">
              <input
                type="text"
                onKeyUp={(e) => setName(e.target.value)}
                className="w-100 p-2 rounded hvr bg-dark b"
                id="name"
                placeholder="name"
                required

              />

            </div>


            <div className="text-white text-start fw-bold "> <label htmlFor="password">Password</label></div>
            <div className="">
              <input
                type="password"
                onKeyUp={(e) => setPassword(e.target.value)}

                className="w-100 p-2 rounded hvr bg-dark b"
                id="password"
                placeholder="password"
                required
              />

            </div>

            <div className='text-start pt-1'> <p> <a href="#" className="link-underline-success text-success"> use phone number instead </a> </p>
            </div>


            <button className="btn btn-success w-100 py-2 rounded-pill my-3" type="submit"> Submit </button>

          </form>) : 
          
      (    <form method='post' onSubmit={validateEmail}>


            <div className="text-white text-start fw-bold "> <label htmlFor="email">Email address</label></div>
            <div className="">
              <input
                type="email"
                onKeyUp={(e) => setEmail(e.target.value)}
                className="w-100 p-2 rounded hvr bg-dark b"
                id="email"
                placeholder="name@example.com"
                required
              />

            </div>


            <button className="btn btn-success w-100 py-2 rounded-pill my-3" type="submit"> Next </button>

          </form>)}

        <hr className='text-light mb-4' />
        <fieldset>
          <button className="btn b hvr text-white w-100 p-2 rounded-pill fw-bold my-1" type="submit"> Sign up with Google </button>
          <button className="btn b hvr text-white w-100 p-2 rounded-pill fw-bold my-1" type="submit"> Sign up with Google </button>
          <button className="btn b hvr text-white w-100 py-2 rounded-pill fw-bold my-1" type="submit"> Sign up with Google </button>
        </fieldset>
        <hr className='text-light' />



        <footer className='text-secondary'>
          <h5> Already have an account? <a href="http://localhost:5173/login" className="green-link fw-bold wyt"> Log in here. </a></h5>
          <p>
            This site is protected by reCAPTCHA and the Google
            <a href="#" className="link text-secondary"> Privacy Policy </a>  and <a href="#" className="link text-secondary">  Terms of Service </a> apply.</p>

        </footer>

      </div>

    </div >



  </>



}

export default SingnUp;