import React, { useState } from 'react';
import axios from 'axios';

const SalesPredictionForm = () => {
  const [productId, setProductId] = useState('');
  const [date, setDate] = useState('');
  const [numDays, setNumDays] = useState('');
  const [predictedSales, setPredictedSales] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict_sales', {
        ProductID: parseInt(productId),
        Date: date,
        No_Days: parseInt(numDays)
      });
      setPredictedSales(response.data.predicted_sales);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setPredictedSales(null);
    }
  };

  return (
    <div>
      <h2>Sales Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="number"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date (YYYY-MM-DD):</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="numDays">Number of Days:</label>
          <input
            type="number"
            id="numDays"
            value={numDays}
            onChange={(e) => setNumDays(e.target.value)}
            required
          />
        </div>
        <button type="submit">Predict Sales</button>
      </form>
      {predictedSales && (
        <div>
          <h3>Predicted Sales:</h3>
          <ul>
            {Object.entries(predictedSales).map(([date, sales]) => (
              <li key={date}>{date}: {sales}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SalesPredictionForm;