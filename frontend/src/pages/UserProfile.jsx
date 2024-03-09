import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/users/user_details",{
                headers:{
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            }).then((res) => {
      setUserDetails(res.data.details);
    });
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <h2>{userDetails.firstName}</h2>
      <h2>{userDetails.username}</h2>
    </div>
  );
}
