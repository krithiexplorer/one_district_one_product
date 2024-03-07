import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { FetchSellerDetails } from '../store/selectors/FetchSellerDetails';
import { useRecoilState } from 'recoil';


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
      <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col bg-slate-500'>
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
      
    </div>
  );
};

export default ProductUploadComponent;
