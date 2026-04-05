const fs = require('fs');

// 1. Patch en_block.json with missing keys
const en = JSON.parse(fs.readFileSync('en_block.json','utf8'));
const t = en.translation;

// Feature bullets
t.home.features.f1.b1="Pest Detection"; t.home.features.f1.b2="Nutrient Deficiency"; t.home.features.f1.b3="Fungal Infections"; t.home.features.f1.b4="Soil Texture Analysis";
t.home.features.f2.b1="Field Boundaries"; t.home.features.f2.b2="Soil Zones"; t.home.features.f2.b3="Irrigation Zones"; t.home.features.f2.b4="Growth Stages";
t.home.features.f3.b1="Weather Analysis"; t.home.features.f3.b2="Soil Type Mapping"; t.home.features.f3.b3="Historical Data"; t.home.features.f3.b4="ML Forecasting";
t.home.features.f4.b1="Flood Alerts"; t.home.features.f4.b2="Drought Warning"; t.home.features.f4.b3="Heatwave Detection"; t.home.features.f4.b4="SMS Alerts";
t.home.features.f5.b1="NPK Analysis"; t.home.features.f5.b2="Water Prediction"; t.home.features.f5.b3="Smart Scheduling"; t.home.features.f5.b4="Nutrition Optimization";

// Learn more
t.home.learnMore = "Learn more";

// Advanced section
if(!t.home.advanced) t.home.advanced = {};
t.home.advanced.title = "Advanced AI Intelligence";
t.home.advanced.desc = "Cutting-edge features that set AgriSphere AI apart";
t.home.advanced.pests = { title:"Pest Attack Prediction", desc:"AI forecasts pest attack probability (0-100%) for next 7 days", b1:"Climate Analysis", b2:"7-Day Risk Forecast", b3:"Prevention Alerts", b4:"Treatment Recommendations" };
t.home.advanced.seedToMarket = { title:"Seed-to-Market Advisory", desc:"Complete guidance from seed selection to market pricing", b1:"Seed Selection", b2:"Sowing Time", b3:"Harvest Prediction", b4:"Market Pricing" };
t.home.advanced.voice = { title:"Voice Assistant (Hindi)", desc:"Farmers speak in local language, AI responds with advice", b1:"Hindi Support", b2:"Voice Recognition", b3:"Local Languages", b4:"Audio Responses" };
t.home.advanced.schemes = { title:"Government Schemes AI", desc:"Auto-identifies subsidies, loans, and PM-KISAN benefits", b1:"Subsidy Matching", b2:"Loan Eligibility", b3:"Insurance Plans", b4:"PM-KISAN" };
t.home.advanced.marketplace = { title:"Farmer-Buyer Marketplace", desc:"Direct selling platform with AI pricing and logistics", b1:"Direct Selling", b2:"AI Pricing", b3:"Logistics", b4:"Income Boost" };
t.home.advanced.blockchain = { title:"Blockchain Traceability", desc:"Track crop origin and supply chain for quality assurance", b1:"Origin Tracking", b2:"Supply Chain", b3:"Authenticity", b4:"Quality Assurance" };

// Rural
if(!t.home.rural) t.home.rural = {};
t.home.rural.title = "Built for Rural India"; t.home.rural.subtitle = "Accessible technology designed for village farmers";
t.home.rural.offline = { title:"Offline Mode", desc:"Works without internet with local caching" };
t.home.rural.languages = { title:"Hindi + Local Languages", desc:"Full support for regional languages and voice" };
t.home.rural.sms = { title:"SMS Fallback Alerts", desc:"Critical alerts sent via SMS when offline" };
t.home.rural.community = { title:"Community Forums", desc:"Farmers discuss pests and schemes" };

// Women
if(!t.home.women) t.home.women = {};
t.home.women.title = "Rural Women Agri-Entrepreneur"; t.home.women.subtitle = "Empowering women-led microbusinesses in agriculture";
t.home.women.microbusiness = { title:"Microbusiness Support", desc:"Training for honey, spices, and handicraft businesses" };
t.home.women.training = { title:"Training Modules", desc:"Comprehensive training for women entrepreneurs" };
t.home.women.marketAccess = { title:"Marketplace Access", desc:"Direct listings for women-led products" };

// Testimonials
if(!t.home.testimonials) t.home.testimonials = {};
t.home.testimonials.title = "What Farmers Say"; t.home.testimonials.subtitle = "Real stories from farmers transforming their operations";
t.home.testimonials.t1 = { name:"Rajesh Kumar", loc:"Punjab, India", text:"AgriSphere's multi-class AI detected stem borer in my wheat early. The pest prediction saved my entire 10-acre crop and increased yield by 35%!", benefit:"35% yield increase" };
t.home.testimonials.t2 = { name:"Anita Sharma", loc:"Maharashtra, India", text:"The GIS digital twin mapped my field perfectly. AI-powered management cut water usage by 45%. Marketplace got me ₹2000/quintal extra!", benefit:"45% water savings" };
t.home.testimonials.t3 = { name:"Vikram Patel", loc:"Gujarat, India", text:"Voice assistant in Hindi is amazing! 'Tamatar mein rog hai' - instantly got disease type, treatment cost. Offline mode works perfectly in my village.", benefit:"Hindi voice support" };

// Tech
if(!t.home.tech) t.home.tech = {};
t.home.tech.title = "Built on Cutting-Edge Technology"; t.home.tech.subtitle = "Enterprise-grade tech stack powering your farm";
t.home.tech.t1="Yield prediction"; t.home.tech.t2="Time series analysis"; t.home.tech.t3="Advanced regression"; t.home.tech.t4="Digital twin mapping";
t.home.tech.t5="Disease detection"; t.home.tech.t6="Supply traceability"; t.home.tech.t7="Hindi commands"; t.home.tech.t8="Village accessibility";
t.home.tech.t9="Alert fallback"; t.home.tech.t10="Instant notifications"; t.home.tech.t11="Data security";

// Footer
if(!t.home.footer) t.home.footer = {};
t.home.footer.tagline = "Empowering farmers with AI and GIS technology for sustainable, profitable agriculture.";
t.home.footer.col1 = "Features"; t.home.footer.col2 = "Platform"; t.home.footer.col3 = "Support";
t.home.footer.iot = "IoT Monitoring"; t.home.footer.weather = "Weather Alerts"; t.home.footer.community = "Community";
t.home.footer.help = "Help Center"; t.home.footer.docs = "Documentation"; t.home.footer.api = "API Guide"; t.home.footer.contact = "Contact";
t.home.footer.copyright = "© 2025 AgriSphere AI. All rights reserved.";

// heroBadge
t.home.heroBadge = "AI-Powered Smart Agriculture";

fs.writeFileSync('en_block.json', JSON.stringify(en, null, 2));
console.log('en_block.json patched with all home keys!');

// 2. Patch rebuild script with Hindi translations for these new keys
let script = fs.readFileSync('rebuild_i18n.mjs','utf8');

const hiHome = `
// HOME PAGE HINDI - bullets, advanced, rural, women, testimonials, tech, footer
const hi_home = resources.hi.translation.home;
hi_home.heroBadge = "AI-संचालित स्मार्ट कृषि";
hi_home.learnMore = "और जानें";
hi_home.features.f1.b1="कीट पहचान"; hi_home.features.f1.b2="पोषक तत्व कमी"; hi_home.features.f1.b3="फफूंद संक्रमण"; hi_home.features.f1.b4="मिट्टी बनावट विश्लेषण";
hi_home.features.f2.b1="खेत सीमाएं"; hi_home.features.f2.b2="मिट्टी क्षेत्र"; hi_home.features.f2.b3="सिंचाई क्षेत्र"; hi_home.features.f2.b4="विकास अवस्थाएं";
hi_home.features.f3.b1="मौसम विश्लेषण"; hi_home.features.f3.b2="मिट्टी प्रकार मानचित्रण"; hi_home.features.f3.b3="ऐतिहासिक डेटा"; hi_home.features.f3.b4="ML पूर्वानुमान";
hi_home.features.f4.b1="बाढ़ अलर्ट"; hi_home.features.f4.b2="सूखा चेतावनी"; hi_home.features.f4.b3="लू का पता लगाना"; hi_home.features.f4.b4="SMS अलर्ट";
hi_home.features.f5.b1="NPK विश्लेषण"; hi_home.features.f5.b2="जल पूर्वानुमान"; hi_home.features.f5.b3="स्मार्ट शेड्यूलिंग"; hi_home.features.f5.b4="पोषण अनुकूलन";

if(!hi_home.advanced) hi_home.advanced = {};
hi_home.advanced.title = "उन्नत AI इंटेलिजेंस";
hi_home.advanced.desc = "अत्याधुनिक सुविधाएं जो AgriSphere AI को अलग बनाती हैं";
hi_home.advanced.pests = { title:"कीट हमले का पूर्वानुमान", desc:"AI अगले 7 दिनों के लिए कीट हमले की संभावना पूर्वानुमान करता है", b1:"जलवायु विश्लेषण", b2:"7-दिन जोखिम पूर्वानुमान", b3:"रोकथाम अलर्ट", b4:"उपचार सिफारिशें" };
hi_home.advanced.seedToMarket = { title:"बीज-से-बाजार सलाह", desc:"बीज चयन से बाजार मूल्य तक सम्पूर्ण मार्गदर्शन", b1:"बीज चयन", b2:"बुवाई का समय", b3:"फसल पूर्वानुमान", b4:"बाजार मूल्य" };
hi_home.advanced.voice = { title:"वॉयस असिस्टेंट (हिंदी)", desc:"किसान स्थानीय भाषा में बोलते हैं, AI सलाह देता है", b1:"हिंदी समर्थन", b2:"वॉयस पहचान", b3:"स्थानीय भाषाएं", b4:"ऑडियो प्रतिक्रियाएं" };
hi_home.advanced.schemes = { title:"सरकारी योजनाएं AI", desc:"स्वत: सब्सिडी, ऋण और PM-KISAN लाभ की पहचान", b1:"सब्सिडी मिलान", b2:"ऋण पात्रता", b3:"बीमा योजनाएं", b4:"PM-KISAN" };
hi_home.advanced.marketplace = { title:"किसान-खरीदार बाजार", desc:"AI मूल्य और लॉजिस्टिक्स के साथ प्रत्यक्ष बिक्री", b1:"प्रत्यक्ष बिक्री", b2:"AI मूल्य", b3:"लॉजिस्टिक्स", b4:"आय वृद्धि" };
hi_home.advanced.blockchain = { title:"ब्लॉकचेन ट्रेसेबिलिटी", desc:"गुणवत्ता आश्वासन के लिए फसल मूल ट्रैक करें", b1:"मूल ट्रैकिंग", b2:"आपूर्ति श्रृंखला", b3:"प्रामाणिकता", b4:"गुणवत्ता आश्वासन" };

if(!hi_home.rural) hi_home.rural = {};
hi_home.rural.title = "ग्रामीण भारत के लिए निर्मित"; hi_home.rural.subtitle = "गांव के किसानों के लिए सुलभ तकनीक";
hi_home.rural.offline = { title:"ऑफलाइन मोड", desc:"स्थानीय कैशिंग के साथ इंटरनेट के बिना काम करता है" };
hi_home.rural.languages = { title:"हिंदी + स्थानीय भाषाएं", desc:"क्षेत्रीय भाषाओं और वॉयस के लिए पूर्ण समर्थन" };
hi_home.rural.sms = { title:"SMS फॉलबैक अलर्ट", desc:"ऑफलाइन होने पर SMS द्वारा महत्वपूर्ण अलर्ट" };
hi_home.rural.community = { title:"सामुदायिक फोरम", desc:"किसान कीट और योजनाओं पर चर्चा करते हैं" };

if(!hi_home.women) hi_home.women = {};
hi_home.women.title = "ग्रामीण महिला कृषि उद्यमी"; hi_home.women.subtitle = "महिलाओं के नेतृत्व वाले लघु व्यवसायों को सशक्त बनाना";
hi_home.women.microbusiness = { title:"लघु व्यवसाय सहायता", desc:"शहद, मसाले और हस्तशिल्प व्यवसायों के लिए प्रशिक्षण" };
hi_home.women.training = { title:"प्रशिक्षण मॉड्यूल", desc:"महिला उद्यमियों के लिए व्यापक प्रशिक्षण" };
hi_home.women.marketAccess = { title:"मार्केटप्लेस पहुंच", desc:"महिलाओं के नेतृत्व वाले उत्पादों की प्रत्यक्ष लिस्टिंग" };

if(!hi_home.testimonials) hi_home.testimonials = {};
hi_home.testimonials.title = "किसान क्या कहते हैं"; hi_home.testimonials.subtitle = "किसानों की वास्तविक कहानियां";
hi_home.testimonials.t1 = { name:"राजेश कुमार", loc:"पंजाब, भारत", text:"AgriSphere के बहु-वर्ग AI ने मेरे गेहूं में तना छेदक को समय पर पकड़ लिया। 10 एकड़ की फसल बच गई और उपज 35% बढ़ी!", benefit:"35% उपज वृद्धि" };
hi_home.testimonials.t2 = { name:"अनीता शर्मा", loc:"महाराष्ट्र, भारत", text:"GIS डिजिटल ट्विन ने मेरे खेत का सही मानचित्रण किया। पानी 45% कम लगा। मार्केटप्लेस से ₹2000/क्विंटल अधिक मिला!", benefit:"45% पानी बचत" };
hi_home.testimonials.t3 = { name:"विक्रम पटेल", loc:"गुजरात, भारत", text:"हिंदी वॉयस असिस्टेंट शानदार है! 'टमाटर में रोग है' - तुरंत रोग प्रकार और उपचार लागत मिली। ऑफलाइन मोड गांव में बढ़िया चलता है।", benefit:"हिंदी वॉयस सपोर्ट" };

if(!hi_home.tech) hi_home.tech = {};
hi_home.tech.title = "अत्याधुनिक तकनीक पर निर्मित"; hi_home.tech.subtitle = "आपके खेत को शक्ति देने वाला उद्यम-श्रेणी तकनीकी स्टैक";
hi_home.tech.t1="उपज पूर्वानुमान"; hi_home.tech.t2="समय श्रृंखला विश्लेषण"; hi_home.tech.t3="उन्नत प्रतिगमन"; hi_home.tech.t4="डिजिटल ट्विन मैपिंग";
hi_home.tech.t5="रोग पहचान"; hi_home.tech.t6="आपूर्ति ट्रेसेबिलिटी"; hi_home.tech.t7="हिंदी कमांड"; hi_home.tech.t8="गांव सुलभता";
hi_home.tech.t9="अलर्ट फॉलबैक"; hi_home.tech.t10="तत्काल सूचनाएं"; hi_home.tech.t11="डेटा सुरक्षा";

if(!hi_home.footer) hi_home.footer = {};
hi_home.footer.tagline = "टिकाऊ, लाभदायक कृषि के लिए AI और GIS तकनीक से किसानों को सशक्त बनाना।";
hi_home.footer.col1 = "सुविधाएं"; hi_home.footer.col2 = "प्लेटफॉर्म"; hi_home.footer.col3 = "सहायता";
hi_home.footer.iot = "IoT निगरानी"; hi_home.footer.weather = "मौसम अलर्ट"; hi_home.footer.community = "समुदाय";
hi_home.footer.help = "सहायता केंद्र"; hi_home.footer.docs = "दस्तावेज़ीकरण"; hi_home.footer.api = "API मार्गदर्शिका"; hi_home.footer.contact = "संपर्क";
hi_home.footer.copyright = "© 2025 AgriSphere AI. सर्वाधिकार सुरक्षित।";
`;

script = script.replace('// Write out the fixed i18n.ts', hiHome + '\n// Write out the fixed i18n.ts');
fs.writeFileSync('rebuild_i18n.mjs', script);
console.log('All home page Hindi keys injected into rebuild script!');
