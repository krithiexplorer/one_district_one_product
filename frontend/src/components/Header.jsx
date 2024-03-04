import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
  return (
    <div>
        <Button>
        <button onClick={()=>{navigate("/")}}>Home</button>
        <button onClick={()=>{navigate("/view_products")}}>Shop</button>
        <button onClick={()=>{navigate("/filter")}}>Filter</button>
        <button onClick={()=>{navigate("/cart")}}>Cart</button>
        <button onClick={()=>{navigate("/wishlist")}}>WishList</button>
        <button onClick={()=>{navigate("/offers")}}>Offers</button>
        </Button>
    </div>
  )
}
