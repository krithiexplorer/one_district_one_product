import { Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function CheckoutSuccess() {
  const { products } = useParams();
  const {message, setMessage} = useState("");
  useEffect(() => {
    if (products) {
      axios.get(`http://localhost:3000/api/v1/orders/purchase-success?products=${encodeURIComponent(JSON.stringify(products))}`)
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
        
    </div>
  )
}
