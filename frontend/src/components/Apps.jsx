import React, { useState } from 'react';
import axios from 'axios';

function Apps() {
  const [inputData, setInputData] = useState({
    Gender: '',
    Age: '',
    Annual_Income: '',
    Spending_Score: ''
  });
  const [prediction, setPrediction] = useState('');
  const [offers, setOffers] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const predictCluster = async () => {
    try {
      // Make POST request to the prediction endpoint
      const response = await axios.post('http://127.0.0.1:8000/predict', inputData);

      // Set prediction and offers state with response data
      setPrediction(response.data.predicted_cluster);
      setOffers(response.data.offers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>User Segmentation</h1>
      <div>
        <label>Gender:</label>
        <input type="text" name="Gender" value={inputData.Gender} onChange={handleChange} />
      </div>
      <div>
        <label>Age:</label>
        <input type="text" name="Age" value={inputData.Age} onChange={handleChange} />
      </div>
      <div>
        <label>Annual Income:</label>
        <input type="text" name="Annual_Income" value={inputData.Annual_Income} onChange={handleChange} />
      </div>
      <div>
        <label>Spending Score:</label>
        <input type="text" name="Spending_Score" value={inputData.Spending_Score} onChange={handleChange} />
      </div>
      <button onClick={predictCluster}>Predict</button>
      <div>Predicted Cluster: {prediction}</div>
      <div>Offers:</div>
      <ul>
        {offers && offers.map((offer, index) => (
          <li key={index}>{offer}</li>
        ))}
      </ul>
    </div>
  );
}

export default Apps;