import React from 'react';
import axios from 'axios';
import { CardActionArea, CardContent, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Product({ product }) {
  const navigate = useNavigate();

  const viewDetails = () =>{
    navigate(`/product/${product._id}`)
  }

  const addToCart = async () => {
    const productId = product._id;

    try {
      const response = await axios.put(`http://localhost:3000/api/v1/users/cart/${productId}`, {}, {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      });
      if(response)
      {
        toast.success("Product added to cart")
      }
    } catch (error) {
      toast.error("Error adding to cart"+error)
    }
  };

  const addToWishlist = async () => {
    const productId = product._id;

    try {
      const response = await axios.put(`http://localhost:3000/api/v1/users/wishlist/${productId}`, {}, {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      });
      if(response)
      {
        toast.success("Product added to wishlist")
      }
    } catch (error) {
      toast.error("Error adding to wishlist"+error)
    }
  };


  return (
    <Card>
       <CardContent>
        <h1>{product.name}</h1>
        <h5>Rs.{product.price}</h5>
        <img className='w-60 h-60' src={product.image} alt={product.name} />
        <CardActionArea>
        <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={addToCart}><FaCartArrowDown /></button>
        <button className=' text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={addToWishlist}><FaHeart /></button>
        <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={viewDetails}>View Details</button>
        </CardActionArea>
      
      </CardContent>
    </Card>
  );
}
