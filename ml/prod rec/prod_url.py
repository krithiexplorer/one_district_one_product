# -*- coding: utf-8 -*-
"""
Created on Sun Mar 24 13:03:58 2024

@author: SWETHA
"""

import requests

# Define the API URL
url = "http://127.0.0.1:8000/recommendations/65e8ae6cf746c78c89779ac4"  # Replace with the appropriate user ID

# Send a GET request to the API endpoint
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Extract the JSON response
    data = response.json()
    user_id = data['user_id']
    recommendations = data['recommendations']
    
    # Print the recommendations
    print(f"Recommendations for User {user_id}:")
    for recommendation in recommendations:
        print(recommendation)
else:
    # Print the error message if the request failed
    print(f"Error: {response.text}")