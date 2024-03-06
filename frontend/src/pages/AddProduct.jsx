import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { FetchSellerDetails } from '../store/selectors/FetchSellerDetails';
import { useRecoilValue } from 'recoil';

const ProductUploadComponent = () => {
  const fetchSellerDetails = useRecoilValue(FetchSellerDetails)
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    seller: '',
    image: null,
    description: '',
    offer: '',
    category: '',
    district: '',
    quantity : 0
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
      formData.append('seller',fetchSellerDetails.seller);
      formData.append('image', productDetails.image);
      formData.append('description', productDetails.description);
      formData.append('offer', productDetails.offer);
      formData.append('category', productDetails.category);
      formData.append('district',fetchSellerDetails.district);
      formData.append('quantity', productDetails.quantity);
      

      const entry = await axios.post('http://localhost:3000/api/v1/sellers/addProduct', {
        name:productDetails.name,
        price:productDetails.price,
        seller:fetchSellerDetails.seller,
        image:productDetails.image,
        description:productDetails.description,
        offer:productDetails.offer,
        category:productDetails.category,
        district:fetchSellerDetails.district,
        quantity:productDetails.quantity
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': "Bearer " + localStorage.getItem('token')
        },
      });

      if(entry)
      {
        return <>
          <h2>Success</h2>
        </>
      }
      // Handle success or navigate to a different page

    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div>
      <div>
      <label>Name:</label>
      <input type="text" name="name" value={productDetails.name} onChange={handleInputChange} />

      <label>Price:</label>
      <input type="text" name="price" value={productDetails.price} onChange={handleInputChange} />

      <label>Quantity:</label>
      <input type="number" name="quantity" value={productDetails.quantity} onChange={handleInputChange} />

      <label>Description:</label>
      <input type="text" name="description" value={productDetails.description} onChange={handleInputChange} />

      <label>Category:</label>
      <input type="text" name="category" value={productDetails.category} onChange={handleInputChange} />

      <label>Offer:</label>
      <input type="text" name="offer" value={productDetails.offer} onChange={handleInputChange} />

      <label>Image:</label>
      <input type="file" name="image" onChange={handleImageChange} />

      <Button><button onClick={handleProductUpload}>Upload Product</button></Button>
      </div> 
    </div>
  );
};

export default ProductUploadComponent;
