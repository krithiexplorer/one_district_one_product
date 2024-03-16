import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CheckoutSuccess() {
  const { products } = useParams();
  const {message, setMessage} = useState("");
  useEffect(() => {
    if (products) {
      axios.get(`http://localhost:3000/api/v1/orders/purchase-success?products=${products}`)
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [products]);

  return (
    <div className='flex justify-center'>
        <Typography variant="h3">
            Product Purchase Success {message}
        </Typography>
        <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={navigateToHome}>Continue Shopping</button>
        
    </div>
  )
}
