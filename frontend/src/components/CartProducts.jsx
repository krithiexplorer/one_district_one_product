import React from 'react';
import { CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartProducts({ product }) {
  const productId = product._id;
  const navigate = useNavigate();  

  const viewDetails = () =>{
    navigate(`/product/${productId}`)
  }

  const removeProduct = () =>{
      axios.delete(`http://localhost:3000/api/v1/users/cart/${productId}`,{
        headers:{
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      }).then(res => {
        return <h4>Removed</h4>
      })
  }
  return (
    <CardContent>
        <h1>{product.name}</h1>
        <h5>Rs.{product.price}</h5>
        <img src={product.image} alt={product.name} />
        <CardActionArea>
        <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={viewDetails} >View Details</button>
        <button className=' text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={removeProduct} >Remove Product</button>
        </CardActionArea>      
    </CardContent>
  );
}
