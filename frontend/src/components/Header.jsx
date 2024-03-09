import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="bg-slate-900 flex justify-between">
        <div>
        <Button onClick={()=>{navigate("/")}}>Home</Button>
        <Button onClick={()=>{navigate("/view_products")}}>Shop</Button>
        <Button onClick={()=>{navigate("/filter")}}>Filter</Button>
        <Button onClick={()=>{navigate("/cart")}}>Cart</Button>
        <Button onClick={()=>{navigate("/wishlist")}}>WishList</Button>
        <Button onClick={()=>{navigate("/offers")}}>Offers</Button>
        <Button onClick={()=>{navigate("/seller/addProduct")}}>Add Product</Button>
        <Button onClick={()=>{navigate("/seller/view_profile")}}>Seller Profile</Button>
        <Button onClick={()=>{navigate("/view_profile")}}>Buyer Profile</Button>
        </div>
        <div>
        <Button onClick={()=>{navigate("/logout")}}>Logout</Button>
        </div>
      </div>
    </div>
  )
}
