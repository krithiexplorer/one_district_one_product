import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { FetchSellerDetails } from '../store/selectors/FetchSellerDetails';
import { useRecoilState } from 'recoil';
import { toast } from "react-toastify";

const ProductUploadComponent = () => {

  const [sellerDetails, setSellerDetails] = useRecoilState(FetchSellerDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/sellers/details", {
          headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
          }
        });
        setSellerDetails(response.data.details);
      } catch (error) {
        console.error("Error fetching seller details:", error);
      }
    };

    fetchData();
  }, [setSellerDetails]);

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
      const entry = await axios.post('http://localhost:3000/api/v1/sellers/addProduct', {
        name:productDetails.name,
        price:productDetails.price,
        seller:sellerDetails.seller,
        image:productDetails.image,
        description:productDetails.description,
        offer:productDetails.offer,
        category:productDetails.category,
        district:sellerDetails.district,
        quantity:productDetails.quantity
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': "Bearer " + localStorage.getItem('token')
        },
      });

      if(entry)
      {
        toast.success("Product added successfully");
        setTimeout(()=>{
          window.location.reload();
        },2000)
      }
      // Handle success or navigate to a different page

    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div>
      <div className='h-screen flex flex-col justify-center items-center bg-slate-200'>
      <Typography variant="h3">Add a new Product</Typography>
      <div className='w-full flex flex-col bg-white p-5 rounded-md' >
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

      <button className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={handleProductUpload}>Upload Product</button>
      </div> 
      </div>
      
    </div>
  );
};

export default ProductUploadComponent;
