
import market_engine
import os
from dotenv import load_dotenv
import json

load_dotenv(override=True)

# Mock Data
prices = [{'commodity': 'Onion', 'modal_price': 15, 'variety': 'Red'}]

print("Generating Market Trends (Manual Construction Test)...")
try:
    result = market_engine.get_market_trends("Gujarat", "Ahmedabad", prices)
    
    # Check English
    en_script = result.get('voice_script_en', '')
    print(f"\n✅ EN Script ({len(en_script)} chars):")
    print(en_script[:100] + "...")
    
    # Check Hindi
    hi_script = result.get('voice_script_hi', '')
    print(f"\n✅ HI Script ({len(hi_script)} chars):")
    print(hi_script[:100] + "...")
    
    if "Tip 1:" in en_script and "Salah 1:" in hi_script:
        print("\n✅ SUCCESS: Scripts are structured correctly with Advice!")
    else:
        print("\n⚠️ PARTIAL: Check script content.")

except Exception as e:
    print(f"Error: {e}")
