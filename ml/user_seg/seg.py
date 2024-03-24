# -*- coding: utf-8 -*-
"""
Created on Wed Mar 20 18:20:18 2024

@author: SWETHA
"""

import json
import requests

# URL of the FastAPI server
url = 'http://127.0.0.1:8000/predict'  # Replace this with the actual URL of your FastAPI server

# Input data
gender = input("Enter the gender: ")
age = input("Enter the age: ")
income = input("Enter the annual income: ")
score = input("Enter the spending score: ")

# Example input data
input_data = {
    'Gender': gender,
    'Age': int(age),
    'Annual_Income': int(income),
    'Spending_Score': int(score)
}

# Make a POST request to the prediction endpoint
response = requests.post(url, json=input_data)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Get the predicted cluster from the response
    prediction = response.json()['predicted_cluster']
    ofs = response.json()['offers']
    print('Predicted Cluster:', prediction)
    print('Offers:')
    for offer in ofs:
        print('-', offer)
else:
    print('Error:', response.text)
