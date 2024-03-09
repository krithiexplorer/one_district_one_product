import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function SellerProfile() {
  const [sellerDetails, setSellerDetails] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/sellers/seller_details",{
                headers:{
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            }).then((res) => {
      setSellerDetails(res.data.details);
    });
  }, []);

  return (
    <div>
      <h1>Seller Profile</h1>
      <h2>{sellerDetails.firstName}</h2>
      <h2>{sellerDetails.username}</h2>
    </div>
  );
}

