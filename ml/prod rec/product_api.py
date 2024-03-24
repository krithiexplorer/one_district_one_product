
from fastapi import FastAPI
import pandas as pd
from surprise import Dataset, Reader, KNNBasic
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Load the model
model = joblib.load("collaborative_filtering_model.pkl")

# Load the dataset
data = pd.read_csv('ratings_data.csv')

# Define a Reader object
reader = Reader(rating_scale=(1, 5))

# Create a Surprise Dataset object
data_surprise = Dataset.load_from_df(data[['UserID', 'ProductID', 'Ratings']], reader)
trainset = data_surprise.build_full_trainset()

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

# Function to get recommendations for a user
def get_recommendations(user_id, top_n=3):
    # Convert user_id to its corresponding internal user ID
    inner_user_id = trainset.to_inner_uid(user_id)
    # Get top-N neighbors for the user
    neighbors = model.get_neighbors(inner_user_id, k=top_n)
    # Extract product IDs corresponding to the neighbors
    recommendations = [trainset.to_raw_iid(item_id) for item_id in neighbors]
    return recommendations

# Define endpoint to get recommendations
@app.get('/recommendations/{user_id}')
async def get_recommendations_endpoint(user_id: str):
    recommendations = get_recommendations(user_id)
    return {'user_id': user_id, 'recommendations': recommendations}



