import React from 'react';
import { CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CartProducts({ product }) {
  const navigate = useNavigate();  

  const viewDetails = () =>{
    navigate(`/product/${product._id}`)
  }
  return (
    <CardContent>
        <h1>{product.name}</h1>
        <h5>Rs.{product.price}</h5>
        <img src={product.image} alt={product.name} />
        <CardActionArea>
        <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={viewDetails} >View Details</button>
        </CardActionArea>      
    </CardContent>
  );
}
