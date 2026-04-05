import re
import os

file_path = r'c:\Users\muska_ak5dqij\OneDrive\Desktop\A\Agrisphere\src\lib\i18n.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add to English section
en_search = r'("listingError": "Failed to post listing.")'
en_replace = r'\1,\n          "negotiate": {\n            "title": "Negotiate for {{crop}}",\n            "desc": "Propose a counter-offer to {{seller}}. The farmer will review and respond.",\n            "send": "Send Counter-Offer"\n          },\n          "negotiations": {\n            "myOffers": "My Sent Offers",\n            "receivedOffers": "Offers Received from Buyers",\n            "accept": "Accept Offer",\n            "reject": "Reject",\n            "statusUpdated": "Negotiation status updated.",\n            "newOffer": "New Counter-Offer Received!"\n          }'

# Add to Hindi section
hi_search = r'("listingError": "लिस्टिंग पोस्ट करने में विफल।")'
hi_replace = r'\1,\n              "negotiate": {\n                "title": "{{crop}} के लिए मोलभाव करें",\n                "desc": "{{seller}} को एक काउंटर-ऑफर प्रस्तावित करें। किसान समीक्षा करेंगे और जवाब देंगे।",\n                "send": "काउंटर-ऑफर भेजें"\n              },\n              "negotiations": {\n                "myOffers": "मेरे द्वारा भेजे गए ऑफर",\n                "receivedOffers": "खरीदारों से प्राप्त ऑफर",\n                "accept": "ऑफर स्वीकार करें",\n                "reject": "अस्वीकार करें",\n                "statusUpdated": "मोलभाव की स्थिति अपडेट की गई।",\n                "newOffer": "नया काउंटर-ऑफर प्राप्त हुआ!"\n              }'

# Apply replacements
if re.search(en_search, content):
    content = re.sub(en_search, en_replace, content)
    print("English keys added.")
else:
    print("English key not found or already added.")

if re.search(hi_search, content):
    content = re.sub(hi_search, hi_replace, content)
    print("Hindi keys added.")
else:
    print("Hindi key not found or already added.")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
