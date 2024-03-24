# -*- coding: utf-8 -*-
"""
Created on Fri Mar 22 12:17:14 2024

@author: SWETHA
"""

import json
import requests

# Define the URL of the prediction endpoint
url = 'http://127.0.0.1:8000/predict_sales'

# Get input from the user for ProductID and Date
product_id = input("Enter the ProductID: ")
date = input("Enter the date (YYYY-MM-DD): ")
days = input("Enter the number of days: ")

# Define the input data
input_data = {
    'ProductID': int(product_id),
    'Date': date,
    'No_Days': int(days)
}

# Send POST request to the prediction endpoint
response = requests.post(url, json=input_data)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Get the predicted sales from the response
    predicted_sales = response.json()['predicted_sales']
    
    # Check if predicted_sales is a list
    if isinstance(predicted_sales, list):
        print("Error: Predicted sales format is incorrect.")
    else:
        # Iterate over each predicted date and sales
        for date, sales in predicted_sales.items():
            print(f"Predicted sales for {date}: {int(round(sales))}")
else:
    print("Error:", response.text)
