import axios from 'axios'
import { useEffect, useState } from 'react';
const Pricing = () => {

  const [pricingplan, setpricingplan] = useState([]);


  useEffect(() => {

    getpricingplan()

  }, [])

  const getpricingplan = async () => {

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    var res = await axios.get("http://127.0.0.1:5000/pricing/getAll");
    res = res.data;

    setpricingplan(res.data);

  }



  const handlepayment = async (plan) => {

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      
  
    var res= await axios.post("http://127.0.0.1:5000/payment/createOrder", {
     amount:plan.amount * 100
    });
    res = res.data

    var  options = {
      "key": "rzp_test_wBx5t6uUqEzSp6", // Enter the Key ID generated from the Dashboard
      "amount": res.amount, // Amount is in currency subunits. Default currency is INR. Hence, 80000 refers to 80000 paise
      "currency": res.currency,
      "name": "Spotify", //your business name
      "description": "Test Transaction",
      "image": "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png",
        "order_id": res.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      
        console.log(response)
        var res= await axios.post("http://127.0.0.1:5000/payment/create", {
          orderId:response.razorpay_order_id, paymentId:response.razorpay_payment_id, amount:plan.amount, status:"pending", razorpay_signature:response.razorpay_signature
        });
       


      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Deepak Kumar", //your customer's name
        "email": "gauravkumar@example.com",
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#121212"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();

  }


  return (
    <>
      <div className="row m-5 p-5">

        {pricingplan && pricingplan.map((item, index) => (
          <div className="col-lg-4 mb-lg-0 mb-4">
            <div className="card shadow-lg" key={index}>
              <span className="badge rounded-pill  bg-light p-2 text-dark w-30 mt-n2 mx-auto">
                {item.name}
              </span>
              <div className="card-header text-center pt-4 pb-3">
                <h1 className="font-weight-bold mt-2">
                  <small className="text-lg align-top me-1">$</small>{item.amount}
                  <small className="text-lg">/mo</small>
                </h1>
              </div>
              <div className="card-body text-lg-start text-center pt-0">
                {item.content}

                <a
                  href="javascript:;" onClick={() => handlepayment(item)}
                  className="btn btn-primary btn-lg bg-gradient-dark d-lg-block mt-3 mb-0"
                >
                  Join Now
                  <i className="fas fa-arrow-right ms-1" />
                </a>
              </div>
            </div>
          </div>
        ))}


      </div>

    </>
  )

}

export default Pricing;