import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';

const ProductUploadComponent = () => {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    category: '',
    offer: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      image: selectedImage,
    }));
  };

  const handleProductUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productDetails.name);
      formData.append('price', productDetails.price);
      formData.append('quantity', productDetails.quantity);
      formData.append('description', productDetails.description);
      formData.append('category', productDetails.category);
      formData.append('offer', productDetails.offer);
      formData.append('image', productDetails.image);

      const entry = await axios.post('http://localhost:3000/api/v1/sellers/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(entry)
      {
        navigate("/")
      }
      // Handle success or navigate to a different page

    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div>
      <div className='p-50 flex shadow bg-slate-900'>
      <label>Name:</label>
      <input type="text" name="name" value={productDetails.name} onChange={handleInputChange} />

      <label>Price:</label>
      <input type="text" name="price" value={productDetails.price} onChange={handleInputChange} />

      <label>Quantity:</label>
      <input type="text" name="quantity" value={productDetails.quantity} onChange={handleInputChange} />

      <label>Description:</label>
      <input type="text" name="quantity" value={productDetails.description} onChange={handleInputChange} />

      <label>Category:</label>
      <input type="text" name="quantity" value={productDetails.category} onChange={handleInputChange} />

      <label>Offer:</label>
      <input type="text" name="quantity" value={productDetails.offer} onChange={handleInputChange} />

      <label>Image:</label>
      <input type="file" name="image" onChange={handleImageChange} />

      <Button><button onClick={handleProductUpload}>Upload Product</button></Button>
      </div> 
    </div>
  );
};

export default ProductUploadComponent;
