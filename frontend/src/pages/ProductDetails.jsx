import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
      <h1>{product.name}</h1>
      <h5>Rs.{product.price}</h5>
      <h5>Seller : {product.seller}</h5>
      <h5>Love from: {product.district}</h5>
      <img src={product.image} alt={product.name} />
      <h3>Product Description:</h3>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
