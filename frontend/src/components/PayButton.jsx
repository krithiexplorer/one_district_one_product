import axios from 'axios';
import React from 'react'

export default function PayButton({cartProducts}) {

    const checkoutItems = {
        name : cartProducts.name,
        price: cartProducts.price
    }

    function checkout(){
        axios.post("http://localhost:3000/api/v1/payments/create-checkout-session",{checkoutItems},{
            headers:{
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data.url)
            {
                window.location.href = res.data.url
            }
        }).catch(err => {
            console.log(err);
        })
    }
  return (
    <div>
        <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={checkout}>Proceed to Checkout</button>
    </div>
  )
}
