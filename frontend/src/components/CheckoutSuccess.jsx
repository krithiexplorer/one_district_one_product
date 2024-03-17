import { Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function CheckoutSuccess() {
  const { products } = useParams();
  const {message, setMessage} = useState("");

  return (
    <div className='flex justify-center'>
        <Typography variant="h3">
            Product Purchase Success
        </Typography>
        
    </div>
  )
}
