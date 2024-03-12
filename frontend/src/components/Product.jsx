import React from 'react';
import axios from 'axios';
import { CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      console.log(response.data.msg);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
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

      // Handle the response, e.g., show a success message
      console.log(response.data.msg);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error adding to wishlist:", error.message);
    }
  };


  return (
    <CardContent>
        <h1>{product.name}</h1>
        <h5>Rs.{product.price}</h5>
        <img src={product.image} alt={product.name} />
        <CardActionArea>
        <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={addToCart}>Add to Cart</button>
        <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={addToWishlist}>Add to Wishlist</button>
        <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={viewDetails}>View Details</button>
        </CardActionArea>
      
    </CardContent>
  );
}

