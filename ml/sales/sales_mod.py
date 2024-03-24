# -*- coding: utf-8 -*-
"""
Created on Fri Mar 22 12:09:37 2024

@author: SWETHA
"""

# Import necessary libraries
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Define a request body model
class InputData(BaseModel):
    ProductID: int
    Date: str
    No_Days: int

# Load the trained model
sales_prediction_model = joblib.load('sales_prediction_model.pkl')

# Define FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define prediction endpoint
@app.post('/predict_sales')
async def predict(input_data: InputData):
    # Extract input data
    new_data = pd.DataFrame({
        'ProductID': [input_data.ProductID],
        'Day': [pd.to_datetime(input_data.Date, format='%Y-%m-%d').day],
        'Month': [pd.to_datetime(input_data.Date, format='%Y-%m-%d').month],
        'Year': [pd.to_datetime(input_data.Date, format='%Y-%m-%d').year],
        'No_Days': [input_data.No_Days]
    })

    # Predict sales for the specified date and the next `num_days` days
    predicted_sales = []
    for i in range(input_data.No_Days):
        # Predict sales for the current input data
        sales = sales_prediction_model.predict(new_data)
        predicted_sales.append(int(round(sales[0])))
        
        # Increment date for the next prediction
        new_data['Day'] += 1
        if new_data['Day'].iloc[0] > 31:
            new_data['Day'] = 1
            new_data['Month'] += 1
            if new_data['Month'].iloc[0] > 12:
                new_data['Month'] = 1
                new_data['Year'] += 1
    
    # Create a list of dates for the predictions
    prediction_dates = pd.date_range(start=input_data.Date, periods=input_data.No_Days).strftime('%Y-%m-%d').tolist()
    
    # Combine the dates and predicted sales into a dictionary
    result = {'predicted_sales': {date: sales for date, sales in zip(prediction_dates, predicted_sales)}}
    
    return result
