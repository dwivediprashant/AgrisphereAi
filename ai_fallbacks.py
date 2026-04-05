import json
from datetime import datetime, timedelta

def get_simulated_pest_prediction(data):
    """
    Rule-based fallback for pest prediction when AI is unavailable.
    """
    crop = data.get('crop', 'General Crop').capitalize()
    temp = float(data.get('temp', 25))
    humidity = float(data.get('humidity', 70))
    rainfall = float(data.get('rainfall', 0))
    
    # 1. Prediction logic based on weather
    if humidity > 80 and temp > 25:
        pest = "Stem Borer" if crop == "Rice" else "Aphids"
        risk_score = 85
        risk_level = "High"
        rec = f"High humidity and temp detected. Apply organic neem oil spray to {crop} immediately."
    elif humidity > 60:
        pest = "Leaf Folder" if crop == "Rice" else "Thrips"
        risk_score = 55
        risk_level = "Medium"
        rec = "Moderate risk. Monitor crop undersides daily for early signs of infestation."
    else:
        pest = "None Significant"
        risk_score = 20
        risk_level = "Low"
        rec = "Conditions are currently safe. Maintain regular crop monitoring."

    # 2. Generate 7-day forecast
    days = [(datetime.now() + timedelta(days=i)).strftime("%a") for i in range(7)]
    forecast = []
    base_score = risk_score
    for i, day in enumerate(days):
        # Add some pseudo-random variance
        variance = (i * 2) - 5 # Simple linear change
        forecast.append({
            "day": day,
            "risk_score": max(10, min(95, int(base_score + variance)))
        })

    return {
        "primary_pest": {
            "pest_name": pest,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "recommendation": rec,
            "is_simulated": True,
            "source": "AgriSphere Rulebook (Offline Fallback)"
        },
        "forecast_7_days": forecast
    }

def get_simulated_fertilizer_recommendation(data):
    """
    Rule-based fallback for fertilizer recommendation when AI is unavailable.
    """
    crop = data.get('crop', 'General Crop')
    soil_n = float(data.get('soil_n', 50))
    soil_p = float(data.get('soil_p', 30))
    soil_k = float(data.get('soil_k', 20))
    ph = float(data.get('soil_ph', 6.5))
    
    # Simple NPK logic
    n_rec = "60 kg/ha" if soil_n < 40 else "30 kg/ha" if soil_n < 80 else "0 kg/ha"
    p_rec = "40 kg/ha" if soil_p < 25 else "20 kg/ha" if soil_p < 50 else "0 kg/ha"
    k_rec = "20 kg/ha" if soil_k < 15 else "10 kg/ha" if soil_k < 30 else "0 kg/ha"
    
    ph_rec = "Apply lime to increase pH" if ph < 5.5 else "Apply sulfur to decrease pH" if ph > 7.5 else "Soil pH is optimal"
    
    return {
        "source": "AgriSphere Rulebook (Offline Fallback)",
        "fertilizer": {
            "nitrogen": n_rec,
            "phosphorus": p_rec,
            "potassium": k_rec,
            "adjustments": [
                "Apply fertilizer in 2 split doses for better efficiency.",
                "Ensure soil is sufficiently moist before application."
            ]
        },
        "soil_health": {
            "ph_status": ph,
            "ph_recommendation": ph_rec,
            "recommendation": f"Balanced NPK is critical for {crop} growth stages."
        },
        "irrigation": {
            "status": "No Irrigation Needed" if float(data.get('rainfall', 0)) > 10 else "Maintain standard schedule",
            "water_amount": "15 mm",
            "schedule": {
                "next_3_days": "Monitor weather for changes"
            }
        },
        "is_simulated": True
    }
