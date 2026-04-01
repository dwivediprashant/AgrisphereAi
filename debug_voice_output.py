
import market_engine
import os
from dotenv import load_dotenv
import json

load_dotenv(override=True)

# Mock Data
prices = [
    {'commodity': 'Tomato', 'modal_price': 15, 'variety': 'Hybrid'},
    {'commodity': 'Potato', 'modal_price': 8, 'variety': 'Local'},
]

print("Generating Market Trends...")
try:
    result = market_engine.get_market_trends("Gujarat", "Ahmedabad", prices)
    print("\n--- Summary ---")
    print(result.get('market_summary', 'MISSING'))
    
    print("\n--- English Script ---")
    en_script = result.get('voice_script_en', 'MISSING')
    print(en_script)
    print(f"Length: {len(en_script.split())} words")
    
    print("\n--- Hindi Script ---")
    hi_script = result.get('voice_script_hi', 'MISSING')
    print(hi_script)
    print(f"Length: {len(hi_script.split())} words")
    
except Exception as e:
    print(f"Error: {e}")
