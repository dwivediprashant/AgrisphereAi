const fs = require('fs');

let script = fs.readFileSync('rebuild_i18n.mjs', 'utf8');

const hiPatch = `
// =====================================================================
// COMPREHENSIVE HINDI (hi) TRANSLATIONS
// =====================================================================

Object.assign(resources.hi.translation.disease, {
  title: "AI फसल रोग पहचान",
  backHome: "होम पर वापस जाएं",
  desc: "पत्ती, तना, फल और मिट्टी की छवियों से 95%+ सटीकता के साथ रोगों, कीटों, पोषक तत्वों की कमी और मिट्टी की बनावट का पता लगाने वाली क्रांतिकारी बहु-वर्ग AI प्रणाली।",
  startBtn: "पहचान शुरू करें",
  uploadBtn: "छवियां अपलोड करें",
  saveBtn: "सहेजी गई रिपोर्ट",
  hideBtn: "छुपाएं",
  reportsTitle: "ऑफलाइन रोग रिपोर्ट",
  noReports: "कोई सहेजी गई रिपोर्ट नहीं मिली।",
  capTitle: "बहु-वर्ग पहचान क्षमताएं",
  pestTitle: "कीट पहचान एवं उपचार",
  aiTitle: "उन्नत बहु-वर्ग AI पहचान",
  howTitle: "AI पहचान कैसे काम करती है",
  accuracy: "सटीकता",
  types: {
    leaf: { title: "पत्ती रोग पहचान", desc: "फफूंद, जीवाणु और वायरल संक्रमणों के लिए पत्ती की छवियों का विश्लेषण", d1: "झुलसा", d2: "जंग", d3: "मोज़ेक वायरस", d4: "जीवाणु धब्बा" },
    stem: { title: "तना विश्लेषण", desc: "तने में बोरर, सड़न और संरचनात्मक क्षति का पता लगाएं", d1: "तना छेदक", d2: "तना सड़न", d3: "कैंकर", d4: "मुरझाना" },
    fruit: { title: "फल निरीक्षण", desc: "फल रोगों, कीट क्षति और गुणवत्ता समस्याओं की पहचान", d1: "फल सड़न", d2: "कीट क्षति", d3: "दरारें", d4: "रंग बदलना" },
    soil: { title: "मिट्टी स्वास्थ्य विश्लेषण", desc: "AI-संचालित मिट्टी की बनावट और पोषक तत्व कमी पहचान", d1: "पोषक तत्व कमी", d2: "pH असंतुलन", d3: "लवणता", d4: "संघनन" }
  },
  pests: {
    p1: { name: "माहू", damage: "रस चूसना", treatment: "नीम तेल छिड़काव" },
    p2: { name: "थ्रिप्स", damage: "पत्ती क्षति", treatment: "नीले चिपचिपे जाल" },
    p3: { name: "सफेद मक्खी", damage: "वायरस प्रसार", treatment: "पीले जाल" },
    p4: { name: "इल्लियां", damage: "पत्ती खाना", treatment: "Bt छिड़काव" }
  },
  how: {
    s1: { title: "छवि कैप्चर", desc: "प्रभावित पौधे के हिस्से की फोटो लें" },
    s2: { title: "AI विश्लेषण", desc: "CNN मॉडल छवि डेटा संसाधित करते हैं" },
    s3: { title: "वर्गीकरण", desc: "बहु-वर्ग पहचान परिणाम" },
    s4: { title: "उपचार योजना", desc: "कार्रवाई योग्य सिफारिशें" }
  },
  stats: { disease: "रोग गतिविधि", diseaseDesc: "मौसम और फसलों के आधार पर", pest: "कीट पहचान", pests: "कीट दबाव", pestDesc: "अगले 7 दिनों का पूर्वानुमान", soil: "मिट्टी स्वास्थ्य इतिहास", soilDesc: "हालिया पोषक तत्व जांच" },
  score: "स्कोर",
  issues: "समस्याएं",
  diseasesCount: "निगरानी किए गए रोग",
  pestsCount: "सक्रिय कीट खतरे",
  viewSummary: "त्वरित सारांश देखें"
});

Object.assign(resources.hi.translation.yield, {
  title: "अनुकूलित उपज पूर्वानुमान",
  desc: "मौसम डेटा पर प्रशिक्षित उन्नत ML मॉडल का उपयोग करके फसल उपज का पूर्वानुमान।",
  inputTitle: "इनपुट पैरामीटर",
  predictBtn: "पूर्वानुमान उत्पन्न करें",
  analyzing: "विश्लेषण हो रहा है...",
  resultsTitle: "पूर्वानुमान परिणाम",
  totalProduction: "कुल अनुमानित उत्पादन",
  revenue: "राजस्व",
  supportedCrops: "समर्थित फसलें",
  selectCrop: "फसल चुनें",
  area: "क्षेत्र (एकड़)",
  yieldEfficiency: "उपज दक्षता",
  potentialRevenue: "संभावित राजस्व",
  perHectare: "प्रति हेक्टेयर",
  approx: "लगभग",
  confidence: "विश्वसनीयता",
  modelUsed: "उपयोग किया गया मॉडल",
  trainingData: "प्रशिक्षण डेटा",
  readyDesc: "पैरामीटर दर्ज करें और क्लिक करें।",
  predictionSuccess: "पूर्वानुमान सफल",
  tonsUnit: "टन",
  rainfall: "वर्षा (मिमी)",
  avgTemp: "औसत तापमान (°C)"
});

Object.assign(resources.hi.translation.pest, {
  title: "कीट आक्रमण पूर्वानुमान",
  inputTitle: "खेत की स्थितियां",
  inputDesc: "वर्तमान मौसम की जानकारी दर्ज करें",
  predictBtn: "जोखिम का पूर्वानुमान करें",
  analyzing: "विश्लेषण हो रहा है...",
  resultsTitle: "पूर्वानुमान परिणाम",
  probability: "हमले की संभावना",
  riskLevel: "{{level}} जोखिम",
  primaryThreat: "प्राथमिक खतरा",
  recommendation: "सिफारिश",
  forecast7Days: "7 दिनों का पूर्वानुमान",
  readyDesc: "स्लाइडर सेट करें और पूर्वानुमान पाने के लिए क्लिक करें",
  selectCrop: "फसल चुनें",
  temp: "तापमान",
  humidity: "आर्द्रता",
  rainfall: "वर्षा",
  advisorTitle: "AI कृषि सलाहकार",
  advisorDesc: "हिंदी या अंग्रेजी में विस्तृत विवरण सुनें",
  stopBtn: "रोकें"
});

Object.assign(resources.hi.translation.fertilizer, {
  title: "स्मार्ट उर्वरक और सिंचाई",
  subtitle: "इष्टतम फसल पोषण और जल प्रबंधन के लिए AI सिफारिशें",
  inputTitle: "पैरामीटर",
  cropType: "फसल प्रकार",
  selectCrop: "फसल चुनें",
  nitrogen: "नाइट्रोजन (N)",
  phosphorus: "फास्फोरस (P)",
  potassium: "पोटाशियम (K)",
  moisture: "मिट्टी की नमी (%)",
  moistureDry: "सूखी",
  moistureWet: "गीली",
  rainfall: "वर्षा पूर्वानुमान (मिमी)",
  soilPh: "मिट्टी का pH",
  growthStage: "विकास अवस्था",
  selectStage: "अवस्था चुनें",
  stages: { sowing: "बुवाई", vegetative: "वानस्पतिक", flowering: "फूलों की अवस्था", harvest: "कटाई" },
  analyzing: "विश्लेषण हो रहा है...",
  getBtn: "सिफारिश प्राप्त करें",
  results: {
    noDataTitle: "कोई सिफारिश नहीं",
    noDataDesc: "पैरामीटर भरें और क्लिक करें।",
    planTitle: "उर्वरक योजना",
    adjustments: "स्मार्ट समायोजन",
    irrigationTitle: "सिंचाई अनुसूची",
    phAlert: "pH चेतावनी",
    waterAmount: "पानी की मात्रा",
    applyWater: "{{amount}} पानी लगाएं।",
    rainNote: "अगले 3 दिनों में बारिश की संभावना।",
    moistureNote: "नमी इष्टतम बनाए रखें।",
    temperature: "तापमान",
    windSpeed: "हवा की गति",
    normal: "सामान्य"
  }
});

Object.assign(resources.hi.translation.home, {
  features: {
    f1: { title: "AI रोग पहचान", desc: "उन्नत ML मॉडल 95% सटीकता के साथ रोगों और कीटों का पता लगाते हैं", bullets: ["कीट पहचान","पोषक तत्व कमी","फफूंद संक्रमण","मिट्टी बनावट विश्लेषण"] },
    f2: { title: "GIS डिजिटल ट्विन", desc: "मैपिंग और विकास ट्रैकिंग के साथ पूर्ण फार्म प्रतिकृति", bullets: ["खेत सीमाएं","मिट्टी क्षेत्र","सिंचाई क्षेत्र","विकास अवस्थाएं"] },
    f3: { title: "उपज पूर्वानुमान", desc: "मौसम और मिट्टी के डेटा का उपयोग करके उपज का पूर्वानुमान", bullets: ["मौसम विश्लेषण","मिट्टी प्रकार मानचित्रण","ऐतिहासिक डेटा","ML पूर्वानुमान"] },
    f4: { title: "मौसम जोखिम इंजन", desc: "बाढ़, सूखे और लू के लिए रीयल-टाइम अलर्ट", bullets: ["बाढ़ अलर्ट","सूखा चेतावनी","लू का पता लगाना","SMS अलर्ट"] },
    f5: { title: "उर्वरक और सिंचाई AI", desc: "इष्टतम पोषण के लिए स्मार्ट NPK और सिंचाई शेड्यूलिंग", bullets: ["NPK विश्लेषण","जल पूर्वानुमान","स्मार्ट शेड्यूलिंग","पोषण अनुकूलन"] }
  },
  advancedTitle: "उन्नत AI इंटेलिजेंस",
  advancedDesc: "अत्याधुनिक सुविधाएं जो AgriSphere AI को अलग बनाती हैं",
  advFeatures: {
    a1: { title: "कीट हमले का पूर्वानुमान", desc: "AI अगले 7 दिनों के लिए कीट हमले की संभावना (0-100%) पूर्वानुमान करता है", tags: ["जलवायु विश्लेषण","7-दिन जोखिम पूर्वानुमान","रोकथाम अलर्ट","उपचार सिफारिशें"] },
    a2: { title: "बीज-से-बाजार सलाह", desc: "बीज चयन से बाजार मूल्य निर्धारण तक सम्पूर्ण मार्गदर्शन", tags: ["बीज चयन","बुवाई का समय","फसल पूर्वानुमान","बाजार मूल्य"] },
    a3: { title: "वॉयस असिस्टेंट (हिंदी)", desc: "किसान स्थानीय भाषा में बोलते हैं, AI सलाह के साथ जवाब देता है", tags: ["हिंदी समर्थन","वॉयस पहचान","स्थानीय भाषाएं","ऑडियो प्रतिक्रियाएं"] },
    a4: { title: "सरकारी योजनाएं AI", desc: "स्वत: सब्सिडी, ऋण और PM-KISAN लाभ की पहचान करता है", tags: ["सब्सिडी मिलान","ऋण पात्रता","बीमा योजनाएं","PM-KISAN"] },
    a5: { title: "किसान-खरीदार बाजार", desc: "AI मूल्य और लॉजिस्टिक्स के साथ प्रत्यक्ष बिक्री प्लेटफॉर्म", tags: ["प्रत्यक्ष बिक्री","AI मूल्य","लॉजिस्टिक्स","आय वृद्धि"] },
    a6: { title: "ब्लॉकचेन ट्रेसेबिलिटी", desc: "गुणवत्ता आश्वासन के लिए फसल मूल और आपूर्ति श्रृंखला ट्रैक करें", tags: ["मूल ट्रैकिंग","आपूर्ति श्रृंखला","प्रामाणिकता","गुणवत्ता आश्वासन"] }
  },
  learnMore: "और जानें",
  ruralTitle: "ग्रामीण भारत के लिए निर्मित",
  ruralDesc: "गांव के किसानों के लिए डिज़ाइन की गई सुलभ तकनीक",
  ruralFeatures: {
    r1: { title: "ऑफलाइन मोड", desc: "स्थानीय कैशिंग के साथ इंटरनेट के बिना काम करता है" },
    r2: { title: "हिंदी + स्थानीय भाषाएं", desc: "क्षेत्रीय भाषाओं और वॉयस के लिए पूर्ण समर्थन" },
    r3: { title: "SMS फॉलबैक अलर्ट", desc: "ऑफलाइन होने पर SMS के माध्यम से महत्वपूर्ण अलर्ट" },
    r4: { title: "सामुदायिक फोरम", desc: "किसान कीट और योजनाओं पर चर्चा करते हैं" }
  },
  womenTitle: "ग्रामीण महिला कृषि उद्यमी",
  womenDesc: "कृषि में महिलाओं के नेतृत्व वाले लघु व्यवसायों को सशक्त बनाना",
  womenFeatures: {
    w1: { title: "लघु व्यवसाय सहायता", desc: "शहद, मसाले और हस्तशिल्प व्यवसायों के लिए प्रशिक्षण" },
    w2: { title: "प्रशिक्षण मॉड्यूल", desc: "महिला उद्यमियों के लिए व्यापक प्रशिक्षण" },
    w3: { title: "मार्केटप्लेस पहुंच", desc: "महिलाओं के नेतृत्व वाले उत्पादों की प्रत्यक्ष लिस्टिंग" }
  },
  testimonialsTitle: "किसान क्या कहते हैं",
  testimonialsDesc: "किसानों की वास्तविक कहानियां",
  stats: { activeFarmers: "सक्रिय किसान", accuracyRate: "सटीकता दर", fieldsMapped: "मैप किए गए क्षेत्र", yieldIncrease: "उपज वृद्धि" }
});

// Hindi marketplace medium/low/high fix
if(resources.hi.translation.marketplace && resources.hi.translation.marketplace.trends) {
  resources.hi.translation.marketplace.trends.low = "कम";
  resources.hi.translation.marketplace.trends.medium = "मध्यम";
  resources.hi.translation.marketplace.trends.high = "अधिक";
}
`;

script = script.replace('// Write out the fixed i18n.ts', hiPatch + '\n// Write out the fixed i18n.ts');
fs.writeFileSync('rebuild_i18n.mjs', script);
console.log('Hindi comprehensive translations injected!');
