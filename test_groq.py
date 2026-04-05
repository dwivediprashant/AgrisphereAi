import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def test_pest_prediction():
    api_key = os.getenv("GROQ_API_KEY") or os.getenv("VITE_GROQ_CHATBOT_API_KEY")
    if not api_key:
        print("GROQ_API_KEY not found")
        return

    client = Groq(api_key=api_key)
    
    from datetime import datetime, timedelta
    days = [(datetime.now() + timedelta(days=i)).strftime("%a") for i in range(7)]
    days_str = ", ".join(days)

    prompt = f"""
    You are an expert agricultural entomologist.
    Conditions:
    - Crop: Rice
    - Temperature: 30°C
    - Humidity: 80%
    - Rainfall: 10 mm

    Return ONLY valid JSON in this exact structure:
    {{
        "primary_pest": {{
            "pest_name": "Name of Pest",
            "risk_score": 85,
            "risk_level": "High",
            "recommendation": "Specific advice"
        }},
        "forecast_7_days": [
            {{ "day": "{days[0]}", "risk_score": 80 }},
            {{ "day": "{days[1]}", "risk_score": 82 }},
            {{ "day": "{days[2]}", "risk_score": 75 }},
            {{ "day": "{days[3]}", "risk_score": 70 }},
            {{ "day": "{days[4]}", "risk_score": 65 }},
            {{ "day": "{days[5]}", "risk_score": 60 }},
            {{ "day": "{days[6]}", "risk_score": 55 }}
        ]
    }}
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a helpful agricultural AI. Output valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            max_tokens=600,
            response_format={"type": "json_object"}
        )

        response_content = completion.choices[0].message.content
        print("Response content:", response_content)
        result = json.loads(response_content)
        print("Parsed result:", result)
    except Exception as e:
        print("Error during Groq call:", e)

if __name__ == "__main__":
    test_pest_prediction()
