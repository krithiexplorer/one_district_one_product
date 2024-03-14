import { Typography } from '@mui/material'
import React from 'react'

export default function EmptyWishlist() {
  return (
    <div className='flex justify-center'>
        <Typography variant="h3">
            Your Wishlist is Empty!! Add more items to Wishlist
        </Typography>
    </div>
  )
}
