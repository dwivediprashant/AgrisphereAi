
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

key = os.environ.get("VITE_OPENAI_API_KEY")
print(f"Testing OpenAI Key: {key[:5] + '...' if key else 'None'}")

if not key:
    print("No OpenAI Key found")
    exit(1)

try:
    client = OpenAI(api_key=key)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Hello"}],
        max_tokens=5
    )
    print("Success! Response:", response.choices[0].message.content)
except Exception as e:
    print("Error:", e)
