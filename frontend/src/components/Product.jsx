import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

export default function Product({ product }) {
  const addToCart = async () => {
    const productId = product._id;

    try {
      const response = await axios.put(`http://localhost:3000/api/v1/users/cart/${productId}`, {}, {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      });

      // Handle the response, e.g., show a success message
      console.log(response.data.msg);
    } catch (error) {
      // Handle errors, e.g., show an error message
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
    <div>
        <h4>{product.name}</h4>
        <h5>{product.price}</h5>
        <p>{product.quantity}</p>
        <h4>{product.district}</h4>32
        <h4>{product.dealer}</h4>
        <h4>{product.offer}</h4>
        <h4>{product.description}</h4>
        <h4>{product.image}</h4> 
      <Button onClick={addToCart}>Add to Cart</Button>
      <Button onClick={addToWishlist}>Add to Wishlist</Button>
    </div>
  );
}

