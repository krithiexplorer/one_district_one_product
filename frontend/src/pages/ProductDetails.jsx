import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

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

  return (
    <div>
    <Card>
    <CardMedia title={product.name}/>
    <CardContent>
      <div>
        <Typography variant="h5" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="h5">
          Rs.{product.price}
        </Typography>
          <img src={product.image} alt={product.name} />
          <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' >Add to Cart</button>
          <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' >Add to Wishlist</button>
      </div>
      <Typography variant="body2" color="InfoText">
        {product.description}
      </Typography>
      <Typography variant="h6" color="InfoText">
        Love from: {product.district}
      </Typography>
    </CardContent>   
</Card>
    </div>
  );
};

export default ProductDetails;
