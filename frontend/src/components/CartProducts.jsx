import React, { useEffect, useState } from 'react';
import { CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

export default function CartProducts({ product }) {
  const productId = product._id;
  const navigate = useNavigate();  
  
  const viewDetails = () =>{
    navigate(`/product/${productId}`)
    window.location.reload();
  }

  const removeProduct = () =>{
      axios.delete(`http://localhost:3000/api/v1/users/cart/${productId}`,{
        headers:{
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      }).then(()=>{
        toast.error("Product removed from cart")
        setTimeout(()=>{
          window.location.reload();
        },2000)
      })
  }
  return (
       <CardContent>
        <div className='flex justify-between'>
          <div>
          <h1>{product.name}</h1>
          <h5>Rs.{product.price}</h5>
          </div>
          <div>
            <img className='w-20 h-20' src={product.image} alt={product.name} />
          </div>
        </div>
        <CardActionArea>
        <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={viewDetails} >View Details</button>
        <button className=' text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={removeProduct} ><FaTrash /></button>
        </CardActionArea>      
       </CardContent>
  );
}
