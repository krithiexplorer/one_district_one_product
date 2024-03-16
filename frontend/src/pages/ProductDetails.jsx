import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card,  Typography } from '@mui/material';
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/products/${productId}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
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
    <div className='h-screen flex justify-center items-center bg-slate-100'>
      <Card>
      <div className='w-4/5 flex'>
        <div>
           <img className="w-96 h-96" src={product.image} alt={product.name} />
        </div>
        <div className='flex flex-col justify-center p-5'>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6">
            Rs.{product.price}
          </Typography>
          <Typography variant="h6">
            Seller: {product.seller}
          </Typography>
          <Typography variant="h6" color="InfoText">
            {product.description}
          </Typography>
          <Typography variant="h6" color="InfoText">
            Love from: {product.district}
          </Typography>
          <div>
            <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={addToCart} ><FaCartArrowDown/></button>
            <button className=' text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={addToWishlist}><FaHeart/></button>
          </div>
        </div>
      </div>
      </Card> 
    </div>
  );
};

export default ProductDetails;
