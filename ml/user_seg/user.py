# -*- coding: utf-8 -*-
"""
Created on Wed Mar 20 18:19:35 2024

@author: SWETHA
"""

from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Define input data model
class InputData(BaseModel):
    Gender: str
    Age: int
    Annual_Income: int
    Spending_Score: int

# Load the trained model and scaler
kmeans_model = joblib.load('kmeans_model.pkl')
scaler_model = joblib.load('scaler.pkl')

# Define Offer Service to fetch offers based on cluster
class OfferService:
    @staticmethod
    def get_offers(cluster: int) -> str:
        offer_mapping = {
            0: [("Special discounts on locally sourced handicrafts", "HANDICRAFT10 (10% off on local handicrafts)"),
                ("Personalized shopping experience with a dedicated concierge", "VIPSHOPPING (Free VIP shopping experience)")],
            1: [("Exclusive deals on traditional textiles and garments", "TEXTILE20 (20% off on traditional textiles)"),
                ("Complimentary gift wrapping for all purchases", "GIFTWRAPFREE (Free gift wrapping on all orders)")],
            2: [("Early access to limited edition artisanal products", "ARTISANAL15 (15% off on limited edition items)"),
                ("Buy one, get one free on selected items", "BOGOFREE (Buy one, get one free on selected items)")],
            3: [("Customized gift hampers featuring regional specialties", "GIFTLOCAL (Free customization on gift hampers)"),
                ("Special offers on organic agricultural products", "ORGANIC20 (20% off on organic products)")],
            4: [("Special offers on  foods", "FOOD20 (20% off on food)"),
                ("Early bird discount on new arrivals", "EARLYBIRD10 (10% off on new arrivals)")],
            }
        return offer_mapping.get(cluster, "No offers available")

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
@app.post('/predict')
async def predict(input_data: InputData):
    # Prepare input data for prediction
    new_data = pd.DataFrame({
        'Age': [input_data.Age],
        'Annual_Income': [input_data.Annual_Income],
        'Spending_Score': [input_data.Spending_Score],
        'Gender_Male': [1 if input_data.Gender == 'Male' else 0]
    })

    # Scale input data
    scaled_new_data = scaler_model.transform(new_data)

    # Predict cluster for the scaled data
    predicted_cluster = kmeans_model.predict(scaled_new_data)

    # Fetch offers based on predicted cluster
    offers = OfferService.get_offers(int(predicted_cluster[0]))

    return {'predicted_cluster': int(predicted_cluster[0]), 'offers': offers}


