import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheckoutSuccess() {
    const navigate = useNavigate();
    function navigateToHome()
    {
        navigate("/view_products")
    }

  return (
    <div className='flex justify-center'>
        <Typography variant="h3">
            Product Purchase Success 
        </Typography>
        <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={navigateToHome}>Continue Shopping</button>
        
    </div>
  )
}
