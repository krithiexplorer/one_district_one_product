import React, { useState } from 'react';
import axios from 'axios';

const ProductRec = () => {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleGetRecommendations = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/recommendations/${userId}`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div>
      <h1>Product Recommendations</h1>
      <div>
        <label htmlFor="userId">Enter UserID: </label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleUserIdChange}
        />
        <button onClick={handleGetRecommendations}>Get Recommendations</button>
      </div>
      <div>
        <h2>Recommended Products:</h2>
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductRec;

