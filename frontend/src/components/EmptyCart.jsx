import { Typography } from '@mui/material'
import React from 'react'

export default function EmptyCart() {
  return (
    <div className='flex justify-center'>
        <Typography variant="h3">
            Your cart is Empty!! Add more items to Cart
        </Typography>
    </div>
  )
}
