
import os
from dotenv import load_dotenv
from groq import Groq

# Force reload to pick up the new key immediately
load_dotenv(override=True)
key_env = os.environ.get("VITE_GROQ_CHATBOT_API_KEY")

print(f"Testing New Key: {key_env[:10]}...{key_env[-5:] if key_env else ''}")

try:
    client = Groq(api_key=key_env)
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": "Hello, are you working?"}],
        model="llama-3.3-70b-versatile"
    )
    print("✅ Key is VALID!")
    print(f"Response: {response.choices[0].message.content[:50]}...")
except Exception as e:
    print(f"❌ Key is INVALID: {e}")
