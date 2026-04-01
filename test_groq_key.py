
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

key1 = os.environ.get("GROQ_API_KEY")
key2 = os.environ.get("VITE_GROQ_CHATBOT_API_KEY")

print(f"GROQ_API_KEY (System): {key1[:5] + '...' if key1 else 'None'}")
print(f"VITE_GROQ_CHATBOT_API_KEY (.env): {key2[:5] + '...' if key2 else 'None'}")

final_key = key1 or key2
print(f"Using Key: {final_key[:5] + '...' if final_key else 'None'}")

if not final_key:
    print("No API Key found!")
    exit(1)

try:
    client = Groq(api_key=final_key)
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Hello",
            }
        ],
        model="llama3-8b-8192",
    )
    print("Success! Response:", chat_completion.choices[0].message.content)
except Exception as e:
    print("Error:", e)
