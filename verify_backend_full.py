
import requests
import json
import time

url = "http://localhost:5000/market-trends"
payload = {
    "state": "Gujarat",
    "district": "Ahmedabad",
    "market": "Ahmedabad APMC",
    "category": "All Commodities"
}

print(f"Testing {url}...")
try:
    start = time.time()
    response = requests.post(url, json=payload, timeout=30)
    duration = time.time() - start
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Success! (Time: {duration:.2f}s)")
        
        # Check for AI Analysis
        analysis = data.get("analysis", {})
        if analysis and "market_summary" in analysis:
            print(f"✅ AI Analysis Present.")
            print(f"Summary: {analysis['market_summary'][:50]}...")
            if analysis.get("advice"):
                print(f"✅ Advice Count: {len(analysis['advice'])}")
            if analysis.get("trends"):
                print(f"✅ Trends Count: {len(analysis['trends'])}")
        else:
            print("⚠️ AI Analysis MISSING or null. Check server logs.")
            print(f"Analysis Key: {analysis}")
            
    else:
        print(f"❌ API Error: {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"❌ Connection Error: {e}")
    print("Ensure 'python api_server.py' is running!")
