import React from 'react';
import axios from 'axios';
import { CardActionArea, CardContent,Card,Button } from '@mui/material';
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
    <>
       <h1>edit in local</h1>
    </>
    
  );

}
