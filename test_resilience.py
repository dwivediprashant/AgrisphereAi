import requests
import json

def test_api_pest():
    print("Testing /predict-pest...")
    url = "http://localhost:5000/predict-pest"
    data = {
        "crop": "Rice",
        "temp": 32,
        "humidity": 85,
        "rainfall": 5
    }
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Request failed: {e}")

def test_api_fertilizer():
    print("\nTesting /recommend-fertilizer...")
    url = "http://localhost:5000/recommend-fertilizer"
    data = {
        "crop": "Rice",
        "soil_n": 30,
        "soil_p": 20,
        "soil_k": 10,
        "soil_ph": 6.2,
        "soil_moisture": 45,
        "rainfall": 5,
        "stage": "Vegetative",
        "soil_type": "Loamy"
    }
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    # Note: Ensure api_server.py is running on localhost:5000
    # If the API key is rate limited, we should see the 'is_simulated' flag or the fallback model results.
    test_api_pest()
    test_api_fertilizer()
