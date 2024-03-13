import React from 'react';
import { Card, CardContent,CardMedia,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function WishListProducts({ product }) {
  const productId = product._id;
  const navigate = useNavigate();  

  const viewDetails = () =>{
    navigate(`/product/${productId}`)
  }

  const addToCart = async () => {
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

  const removeProduct = () =>{
      axios.delete(`http://localhost:3000/api/v1/users/wishlist/${productId}`,{
        headers:{
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      }).then(res => {
        return <h4>Removed</h4>
      })
  }
  return (
    <Card className={classes.root}>
    <CardMedia className={classes.media} title={product.name}/>
    <CardContent>
      <div className={classes.CardContent}>
        <Typography variant="h5" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="h5">
          Rs.{product.price}
        </Typography>
          <img src={product.image} alt={product.name} />
          <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={addToCart}>Add to Cart</button>
          <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={viewDetails}>View Details</button>
          <button className=' text-white bg-red-600 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={removeProduct}>Remove Product</button>
      </div>
      <Typography variant="h3" color="InfoText">
        {product.description}
      </Typography>
      <Typography variant="h4" color="InfoText">
        Love from: {product.district}
      </Typography>
    </CardContent>   
</Card>
  );
}
