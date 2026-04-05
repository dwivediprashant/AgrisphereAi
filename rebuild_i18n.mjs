import fs from 'fs';
import path from 'path';

// 1. Load the English block
const en = JSON.parse(fs.readFileSync('en_block.json', 'utf8')).translation;
// Fix stages/steps bug
if (en.marketplace && en.marketplace.advisory && en.marketplace.advisory.steps) {
  en.marketplace.advisory.stages = en.marketplace.advisory.steps;
}


if (en.disease && en.disease.stats) {
  en.disease.stats.diseaseDesc = "Based on weather & crops";
  en.disease.stats.pest = "Pest Detection";
  en.disease.stats.pestDesc = "Forecast for next 7 days";
  en.disease.stats.soilDesc = "Recent nutrient checks";
}

// 2. Load the existing Hindi block (has nav, home, disease, marketplace subset)
const hiExisting = JSON.parse(fs.readFileSync('hi_block.json', 'utf8')).translation;

// Create translation objects
const resources = {
  en: { translation: en },
  hi: { translation: JSON.parse(JSON.stringify(en)) },
  bn: { translation: JSON.parse(JSON.stringify(en)) },
  as: { translation: JSON.parse(JSON.stringify(en)) },
  kn: { translation: JSON.parse(JSON.stringify(en)) }
};

// Deep merge hiExisting into hi to preserve the translations we already have
const deepMerge = (target, source) => {
  for (const key in source) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
};
deepMerge(resources.hi.translation, hiExisting);

// Add some critical Hindi translations for Yield Prediction & Advisory Hub to demonstrate real support
Object.assign(resources.hi.translation.yield, {
  title: "अनुकूलित उपज की भविष्यवाणी",
  desc: "23 वर्षों के जलवायु डेटा पर प्रशिक्षित उन्नत मॉडल का उपयोग करके फसल की उपज की भविष्यवाणी करें।",
  supportedCrops: "समर्थित फसलें",
  inputTitle: "खेत पैरामीटर",
  selectCrop: "फसल चुनें",
  predictBtn: "भविष्यवाणी उत्पन्न करें",
  analyzing: "विश्लेषण कर रहा है...",
  resultsTitle: "भविष्यवाणी परिणाम",
  totalProduction: "कुल अनुमानित उत्पादन",
  potentialRevenue: "संभावित राजस्व"
});

Object.assign(resources.hi.translation.advisoryHub, {
  title: "एग्रीस्फेयर सलाहकार केंद्र",
  subtitle: "स्मार्ट खेती के लिए वास्तविक समय योजनाएं, समाचार और वीडियो।",
  tabs: {
    schemes: "योजनाएं और सब्सिडी",
    calculator: "उर्वरक कैलकुलेटर",
    news: "खेती के समाचार",
    videos: "वीडियो ट्यूटोरियल"
  },
  eligibility: {
    title: "पात्रता जांचें",
    desc: "प्रासंगिक सरकारी योजनाओं को देखने के लिए अपनी प्रोफ़ाइल अपडेट करें।",
    state: "राज्य",
    landSize: "भूमि का आकार (एकड़)",
    farmerType: "किसान का प्रकार"
  }
});

Object.assign(resources.hi.translation.nav, {
  advisoryHub: "सलाहकार केंद्र",
  yieldPrediction: "उपज भविष्यवाणी",
  fertilizerAi: "उर्वरक एआई",
  pestForecast: "कीट का पूर्वानुमान",
  digitalTwin: "डिजिटल ツिन",
  marketplace: "बाज़ार"
});





Object.assign(resources.hi.translation.voiceAssistant, {
  hero: {
    title: "किसानों के लिए वॉयस असिस्टेंट",
    desc: "हिंदी या अपनी स्थानीय भाषा में स्वाभाविक रूप से बोलें। ग्रामीण किसानों के लिए डिज़ाइन की गई आवाज़ प्रतिक्रियाओं के साथ तत्काल एआई कृषि सलाह प्राप्त करें।",
    startBtn: "बोलना शुरू करें",
    chooseLangBtn: "भाषा चुनें"
  },
  features: {
    sectionTitle: "आवाज़ सहायक की विशेषताएँ",
    f1: {
      title: "हिंदी ध्वनि पहचान",
      desc: "हिंदी में स्वाभाविक रूप से बोलें और तत्काल प्रतिक्रियाएं प्राप्त करें",
      example: "गेहूं में रोग आ गया है, क्या करें?",
      response: "गेहूं के रोग का पता चला। फफूंदनाशक स्प्रे लागू करें।"
    },
    f2: {
      title: "स्थानीय भाषा समर्थन",
      desc: "पूरे भारत में क्षेत्रीय भाषाओं का समर्थन"
    },
    f3: {
      title: "ऑडियो प्रतिक्रियाएं",
      desc: "अपनी पसंदीदा भाषा में विस्तृत ऑडियो प्रतिक्रियाएं प्राप्त करें",
      item1: "स्पष्ट उच्चारण",
      item2: "धीमी/तेज़ गति",
      item3: "दोहराने का विकल्प",
      item4: "ऑडियो सेव करें"
    },
    f4: {
      title: "ऑफ़लाइन वॉयस कमांड",
      desc: "बुनियादी वॉयस कमांड बिना इंटरनेट के भी काम करते हैं",
      item1: "मौसम की जानकारी",
      item2: "फसल कैलेंडर",
      item3: "बुनियादी निदान",
      item4: "आपातकालीन मदद"
    }
  },
  examples: {
    sectionTitle: "वास्तविक बातचीत के उदाहरण",
    solutionPrefix: "समाधान",
    e1: {
      farmer: "टमाटर में पत्ते पीले हो रहे हैं",
      farmerTrans: "Tomato leaves are turning yellow",
      ai: "यह नाइट्रोजन की कमी हो सकती है। यूरिया का छिड़काव करें।",
      aiTrans: "This could be nitrogen deficiency. Apply urea spray.",
      solution: "पानी के छिड़काव के साथ 2 किलोग्राम यूरिया प्रति एकड़ फैलाएं"
    },
    e2: {
      farmer: "क्या आज पानी देना चाहिए?",
      farmerTrans: "Should I water today?",
      ai: "मिट्टी में नमी 40% है। 2 दिन बाद पानी दें।",
      aiTrans: "Soil moisture is 40%. Water after 2 days.",
      solution: "2 दिन रुकें, फिर 25 मिमी सिंचाई करें"
    },
    e3: {
      farmer: "फसल कब काटनी चाहिए?",
      farmerTrans: "When should I harvest the crop?",
      ai: "आपकी गेहूं 15 दिन में तैयार होगी। दाने सुनहरे होने का इंतज़ार करें।",
      aiTrans: "Your wheat will be ready in 15 days. Wait for golden grains.",
      solution: "जब नमी की मात्रा 12-14% हो तब कटाई करें"
    }
  },
  demo: {
    sectionTitle: "वॉयस असिस्टेंट को आजमाएं",
    selectLang: "भाषा चुनें",
    listening: "सुन रहा हूँ...",
    pressToSpeak: "बोलने के लिए दबाएं",
    processing: "प्रोसेसिंग...",
    youSaid: "आपने कहा:",
    aiResponse: "🤖 एआई का जवाब:",
    exampleQuestionsTitle: "उदाहरण प्रश्न:",
    noteTitle: "नोट",
    noteDesc: "वॉयस रिकग्निशन के लिए आधुनिक ब्राउज़र और माइक्रोफ़ोन अनुमति की आवश्यकता होती है। क्रोम/एज में सबसे अच्छा काम करता है।",
    noteHindiDesc: "नोट: आवाज़ पहचान के लिए आधुनिक ब्राउज़र और माइक्रोफ़ोन की अनुमति चाहिए।"
  },
  langs: {
    sectionTitle: "समर्थित भाषाएं",
    hindi: "हिंदी",
    english: "अंग्रेज़ी (भारत)",
    fullSupport: "पूर्ण समर्थन"
  },
  howItWorks: {
    sectionTitle: "वॉयस असिस्टेंट कैसे काम करता है",
    s1: { title: "सवाल पूछें", desc: "हिंदी या स्थानीय भाषा में पूछें" },
    s2: { title: "एआई प्रसंस्करण", desc: "आवाज़ पहचान और समझ" },
    s3: { title: "प्रतिक्रिया उत्पन्न करें", desc: "व्यक्तिगत उत्तर बनाता है" },
    s4: { title: "ऑडियो उत्तर", desc: "अपनी भाषा में प्रतिक्रिया सुनें" }
  },
  benefits: {
    sectionTitle: "वॉयस असिस्टेंट के लाभ",
    b1: { title: "उपयोग में आसान", desc: "टाइपिंग नहीं चाहिए, बस बोलें" },
    b2: { title: "ग्रामीण अनुकूल", desc: "निरक्षर किसानों के लिए काम करता है" },
    b3: { title: "तत्काल मदद", desc: "कुछ ही सेकंड में उत्तर प्राप्त करें" },
    b4: { title: "स्थानीय भाषा", desc: "हिंदी में समझें और जवाब दें" }
  }
});

// ADD BENGALI (bn) TRANSLATIONS
Object.assign(resources.bn.translation.nav, {
  home: "হোম",
  marketplace: "মার্কেটপ্লেস",
  communityForum: "কমিউনিটি ফোরাম",
  advisoryHub: "পরামর্শ কেন্দ্র",
  voiceAssistant: "ভয়েস সহকারী",
  fertilizerAi: "সার এআই",
  pestForecast: "কীটপতঙ্গের পূর্বাভাস",
  adminDashboard: "অ্যাডমিন ড্যাশবোর্ড",
  buyerDashboard: "ক্রেতার ড্যাশবোর্ড",
  farmerDashboard: "কৃষক ড্যাশবোর্ড",
  diseaseDetection: "রোগ চিহ্নিতকরণ",
  yieldPrediction: "ফলন পূর্বাভাস",
  digitalTwin: "ডিজিটাল টুইন",
  login: "লগইন",
  getStarted: "শুরু করুন"
});

Object.assign(resources.bn.translation.home, {
  heroTitle1: "ভারতের প্রথম",
  heroTitle2: "AI + GIS স্মার্ট ফার্মিং",
  heroSubtitle: "ইন্টেলিজেন্স প্ল্যাটফর্ম",
  heroDescription: "কীটপতঙ্গ, পুষ্টির ঘাটতি এবং ছত্রাক সংক্রমণ সনাক্ত করুন। 30% ফলন বৃদ্ধি করুন এবং 40% খরচ বাঁচান।",
  exploreFeatures: "ডেমো দেখুন",
  floatingAlert: "আবহাওয়া ঝুঁকি পরীক্ষা করুন"
});

Object.assign(resources.bn.translation.voiceAssistant.hero, {
  title: "কৃষকদের জন্য ভয়েস সহকারী",
  desc: "আপনার আঞ্চলিক ভাষায় কথা বলুন। এআই এর মাধ্যমে তাত্ক্ষণিক কৃষি পরামর্শ পান।",
  startBtn: "কথা বলা শুরু করুন",
  chooseLangBtn: "ভাষা নির্বাচন করুন"
});

// ADD ASSAMESE (as) TRANSLATIONS
Object.assign(resources.as.translation.nav, {
  home: "হোম",
  marketplace: "বজাৰ",
  communityForum: "কৃষক সমাজ",
  advisoryHub: "পৰামৰ্শ কেন্দ্ৰ",
  voiceAssistant: "ভইচ সহায়ক",
  fertilizerAi: "সাৰ এআই",
  pestForecast: "কীট-পতংগৰ পূৰ্বানুমান",
  adminDashboard: "প্ৰশাসন ডেশ্ববৰ্ড",
  buyerDashboard: "ক্ৰেতাৰ ডেশ্ববৰ্ড",
  farmerDashboard: "কৃষক ডেশ্ববৰ্ড",
  diseaseDetection: "ৰোগ চিনাক্তকৰণ",
  yieldPrediction: "উৎপাদনৰ পূৰ্বানুমান",
  digitalTwin: "ডিজিটেল টুইন",
  login: "লগইন",
  getStarted: "আৰম্ভ কৰক"
});

Object.assign(resources.as.translation.home, {
  heroTitle1: "ভাৰতৰ প্ৰথম",
  heroTitle2: "AI + GIS স্মাৰ্ট কৃষি",
  heroSubtitle: "ইণ্টেলিজেন্স প্লেটফৰ্ম",
  heroDescription: "কীট-পতংগ, পুষ্টিৰ অভাৱ আৰু ভেঁকুৰৰ সংক্ৰমণ চিনাক্ত কৰক। উৎপাদন ৩০% লৈ বৃদ্ধি কৰক আৰু খৰচ ৪০% লৈ হ্ৰাস কৰক।",
  exploreFeatures: "ডেমো চাওক",
  floatingAlert: "বতৰৰ আশংকা পৰীক্ষা কৰক"
});

Object.assign(resources.as.translation.voiceAssistant.hero, {
  title: "কৃষকৰ বাবে ভইচ সহায়ক",
  desc: "আপোনাৰ নিজৰ ভাষাত কথা কওক। গাঁৱলীয়া কৃষকৰ বাবে বিশেষভাৱে প্ৰস্তুত কৰা এআই সহায়কৰ পৰা ততালিকে কৃষি পৰামৰ্শ পাওক।",
  startBtn: "কথা ক'বলৈ আৰম্ভ কৰক",
  chooseLangBtn: "ভাষা বাছনি কৰক"
});

// ADD KANNADA (kn) TRANSLATIONS
Object.assign(resources.kn.translation.nav, {
  home: "ಮುಖಪುಟ",
  marketplace: "ಮಾರುಕಟ್ಟೆ",
  communityForum: "ರೈತ ಸಮುದಾಯ",
  advisoryHub: "ಸಲಹಾ ಕೇಂದ್ರ",
  voiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕ",
  fertilizerAi: "ಗೊಬ್ಬರ ಎಐ",
  pestForecast: "ಕೀಟ ಮುನ್ಸೂಚನೆ",
  adminDashboard: "ಆಡಳಿತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  buyerDashboard: "ಖರೀದಿದಾರರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  farmerDashboard: "ರೈತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  diseaseDetection: "ರೋಗ ಪತ್ತೆ",
  yieldPrediction: "ಇಳುವರಿ ಮುನ್ಸೂಚನೆ",
  digitalTwin: "ಡಿಜಿಟಲ್ ಟ್ವಿನ್",
  login: "ಲಾಗಿನ್",
  getStarted: "ಪ್ರಾರಂಭಿಸಿ"
});

Object.assign(resources.kn.translation.home, {
  heroTitle1: "ಭಾರತದ ಮೊದಲ",
  heroTitle2: "AI + GIS ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
  heroSubtitle: "ಇಂಟೆಲಿಜೆನ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
  heroDescription: "ಕೀಟಗಳು, ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ ಮತ್ತು ಶಿಲೀಂಧ್ರ ಸೋಂಕುಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ. ಇಳುವರಿಯನ್ನು 30% ಹೆಚ್ಚಿಸಿ, ವೆಚ್ಚವನ್ನು 40% ಕಡಿಮೆ ಮಾಡಿ.",
  exploreFeatures: "ಡೆಮೋ ವೀಕ್ಷಿಸಿ",
  floatingAlert: "ಹವಾಮಾನ ಅಪಾಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ"
});

Object.assign(resources.kn.translation.voiceAssistant.hero, {
  title: "ರೈತರಿಗಾಗಿ ಧ್ವನಿ ಸಹಾಯಕ",
  desc: "ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಸ್ವಾಭಾವಿಕವಾಗಿ ಮಾತನಾಡಿ. ತಕ್ಷಣದ ಎಐ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
  startBtn: "ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಿ",
  chooseLangBtn: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ"
});


// KANNADA MARKETPLACE & HOME FIXES
Object.assign(resources.kn.translation.marketplace, {
  title: "ಸ್ಮಾರ್ಟ್ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಸಲಹೆ",
  subtitle: "AI ಆಧರಿತ ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಿರಿ ಮತ್ತು ಸ್ಥಳೀಯ ಖರೀದಿದಾರರು/ಮಾರಾಟಗಾರರೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
  tabs: { advisory: "ಸಲಹೆ", listings: "ಪಟ್ಟಿಗಳು", trends: "ಟ್ರೆಂಡ್ಸ್", demands: "ಖರೀದಿದಾರರ ಬೇಡಿಕೆಗಳು" },
  demands: { title: "ಪ್ರಸ್ತುತ ಖರೀದಿದಾರರ ಬೇಡಿಕೆಗಳು", noDemands: "ಯಾವುದೇ ಬೇಡಿಕೆಗಳಿಲ್ಲ.", verified: "ಪರಿಶೀಲಿಸಿದ ಖರೀದಿದಾರ", targetPrice: "ಗಮ್ಯ ಬೆಲೆ", contactBtn: "ಸಂಪರ್ಕಿಸಿ" },
  advisory: {
    title: "AgriSphere ಸ್ಮಾರ್ಟ್ ಸಲಹೆ", desc: "ವೈಯಕ್ತಿಕ AI ಸಲಹೆ.", selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ", chooseCrop: "ಆಯ್ಕೆಮಾಡಿ...",
    state: "ರಾಜ್ಯ", selectState: "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ", sowingDate: "ಬಿತ್ತನೆ ದಿನಾಂಕ", pickDate: "ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ",
    fieldSize: "ಕ್ಷೇತ್ರದ ಗಾತ್ರ", analyzeBtn: "AI ವರದಿ ರಚಿಸಿ", analyzing: "ರಚಿಸಲಾಗುತ್ತಿದೆ...", missingInfo: "ಮಾಹಿತಿ ಕಾಣೆಯಾಗಿದೆ",
    selectPrompt: "ದಯವಿಟ್ಟು ಬಿತ್ತನೆ ದಿನಾಂಕ, ರಾಜ್ಯ ಮತ್ತು ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ.", readyTitle: "ಕೃಷಿ ಸಲಹಾ ವರದಿ:"
  },
  trends: { title: "AI ಮಾರುಕಟ್ಟೆ ಒಳನೋಟಗಳು", livePrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", forecast: "ಬೆಲೆ ಮುನ್ಸೂಚನೆ", fetched: "ದರಗಳನ್ನು ಪಡೆಯಲಾಗಿದೆ.", fetchError: "ವಿಫಲವಾಗಿದೆ.", detailsMissing: "ಸ್ಥಳ ಕಾಣೆಯಾಗಿದೆ", enterStateDistrict: "ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆಯನ್ನು ನಮೂದಿಸಿ.", findMandiRates: "ಇಂದಿನ ಮಂಡಿ ದರಗಳನ್ನು ಹುಡುಕಿ", selectState: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ", enterDistrict: "ಜಿಲ್ಲೆಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ", typeDistrict: "ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...", category: "ವರ್ಗ", checkRates: "ದರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ", forecastTitle: "7 ದಿನಗಳ ಬೆಲೆ ಮುನ್ಸೂಚನೆ", noRates: "ಯಾವುದೇ ಡೇಟಾ ಕಂಡುಬಂದಿಲ್ಲ." },
  listings: { filters: "ಮಾರುಕಟ್ಟೆ ಫಿಲ್ಟರ್‌ಗಳು", search: "ಹುಡುಕಿ...", contactFarmer: "ರೈತರನ್ನು ಸಂಪರ್ಕಿಸಿ", noListings: "ಯಾವುದೇ ಪಟ್ಟಿಗಳಿಲ್ಲ.", form: { postTitle: "ಬೆಳೆಯನ್ನು ಮಾರಿ", postSubtitle: "ಉಚಿತ ಪಟ್ಟಿಯನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ.", name: "ಹೆಸರು", contact: "ಫೋನ್ ಸಂಖ್ಯೆ", crop: "ಬೆಳೆ", qty: "ಪ್ರಮಾಣ", price: "ಬೆಲೆ", selectState: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ", submit: "ಪೋಸ್ಟ್ ಮಾಡಿ" }, fillAllFields: "ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿಮಾಡಿ.", listingPosted: "ಪೋಸ್ಟ್ ಮಾಡಲಾಗಿದೆ!" }
});

Object.assign(resources.kn.translation.home, {
  featuresTitle: "ಆಧುನಿಕ ಕೃಷಿಗಾಗಿ", featuresSubtitle: "ಬುದ್ಧಿವಂತ ವೈಶಿಷ್ಟ್ಯಗಳು", featuresDesc: "ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಕ್ರಾಂತಿಗೊಳಿಸುವ ತಂತ್ರಜ್ಞಾನ",
  aboutTitle: "AgriSphere AI ಭಾರತದ ಮೊದಲ AI + GIS ಕೃಷಿ ವೇದಿಕೆಯಾಗಿದೆ.", aboutDesc: "ರೋಗ ಪತ್ತೆ, ಇಳುವರಿ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.",
  howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", howItWorksSubtitle: "4 ಸುಲಭ ಹಂತಗಳಲ್ಲಿ ಪ್ರಾರಂಭಿಸಿ",
  stats: { activeFarmers: "ಸಕ್ರಿಯ ರೈತರು", accuracyRate: "ನಿಖರತೆ", fieldsMapped: "ಕ್ಷೇತ್ರಗಳ ಮ್ಯಾಪಿಂಗ್", yieldIncrease: "ಇಳುವರಿ ಹೆಚ್ಚಳ" },
  rural: { title: "ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ", subtitle: "ಗ್ರಾಮದ ರೈತರಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ" },
  women: { title: "ಗ್ರಾಮೀಣ ಮಹಿಳಾ ಕೃಷಿ ಉದ್ಯಮಿ", subtitle: "ಮಹಿಳೆಯರ ವ್ಯವಹಾರಗಳ ಸಬಲೀಕರಣ" },
  ctaTitle: "ನಿಮ್ಮ ಕೃಷಿ ವ್ಯವಹಾರವನ್ನು ಬದಲಾಯಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?", ctaSubtitle: "ಇಂದು ಸೇರಿಕೊಳ್ಳಿ!", ctaDesc: "AgriSphere AI ಅನ್ನು ಬಳಸಿ ಲಾಭ ಪಡೆಯಿರಿ.", ctaFreeTrial: "ಉಚಿತ ಪ್ರಯೋಗ ಪ್ರಾರಂಭಿಸಿ", ctaDemo: "ಡೆಮೊ ವೀಕ್ಷಿಸಿ"
});

// BENGALI MARKETPLACE & HOME FIXES
Object.assign(resources.bn.translation.marketplace, {
  title: "স্মার্ট মার্কেটপ্লেস এবং পরামর্শ", subtitle: "AI থেকে শস্য নিয়ে পরামর্শ নিন এবং সরাসরি ক্রেতা/বিক্রেতার সাথে যোগাযোগ করুন।",
  tabs: { advisory: "পরামর্শ", listings: "তালিকা", trends: "প্রবণতা", demands: "ক্রেতার চাহিদা" },
  demands: { title: "লাইভ ক্রেতার চাহিদা", noDemands: "কোনো ক্রেতার চাহিদা নেই।", verified: "ভেরিফাইড ক্রেতা", targetPrice: "টার্গেট মূল্য", contactBtn: "যোগাযোগ করুন" },
  advisory: { title: "AgriSphere স্মার্ট পরামর্শ", desc: "ব্যক্তিগতকৃত AI পরামর্শ।", selectCrop: "ফসল নির্বাচন করুন", chooseCrop: "নির্বাচন করুন...", state: "রাজ্য", selectState: "રાજ্য নির্বাচন করুন", sowingDate: "বপন তারিখ", pickDate: "তারিখ নির্বাচন করুন", fieldSize: "আকার (একর)", analyzeBtn: "রিপোর্ট তৈরি করুন", analyzing: "তৈরি হচ্ছে...", missingInfo: "উপস্থিত নয়", selectPrompt: "দয়া করে ফসল, রাজ্য এবং বপনের তারিখ টিপুন।", readyTitle: "কৃষি পরামর্শ রিপোর্ট:" },
  trends: { title: "AI বাজার বিশ্লেষণ", livePrices: "বাজার মূল্য", forecast: "মূল্য পূর্বাভাস", fetched: "দর পাওয়া গেছে।", fetchError: "সমস্যা হয়েছে।", detailsMissing: "অবস্থান অনুপস্থিত", enterStateDistrict: "রাজ্য এবং জেলা লিখুন।", findMandiRates: "দামের খোঁজ", selectState: "রাজ্য নির্বাচন করুন", enterDistrict: "জেলার নাম লিখুন", typeDistrict: "টাইপ করুন...", category: "বিভাগ", checkRates: "বাজার দর চেক করুন", forecastTitle: "৭ দিনের পূর্বাভাস", noRates: "কোন তথ্য নেই।" },
  listings: { filters: "ফিল্টার", search: "খুঁজুন...", contactFarmer: "কৃষকের সাথে যোগাযোগ", noListings: "কোন তালিকা নেই।", form: { postTitle: "ফসল বিক্রি করুন", postSubtitle: "তালিকা পোস্ট করুন।", name: "আপনার নাম", contact: "ফোন", crop: "ফসল", qty: "পরিমাণ", price: "দাম", selectState: "আপনার রাজ্য বেছে নিন", submit: "পোস্ট করুন" }, fillAllFields: "বিবরণ পূরণ করুন।", listingPosted: "সফলভাবে পোস্ট করা হয়েছে!" }
});

Object.assign(resources.bn.translation.home, {
  featuresTitle: "আধুনিক কৃষির জন্য", featuresSubtitle: "ইন্টেলিজেন্ট ফিটচার", featuresDesc: "কৃষি উদ্ভাবনী প্রযুক্তি",
  aboutTitle: "AgriSphere AI হলো ভারতের প্রথম প্রযুক্তি নির্ভর প্ল্যাটফর্ম।", aboutDesc: "কীটপতঙ্গ, পুষ্টির ঘাটতি সনাক্ত করুন এবং ফলন বৃদ্ধি করুন।",
  howItWorks: "যেভাবে কাজ করে", howItWorksSubtitle: "৪টি ধাপ",
  stats: { activeFarmers: "সক্রিয় কৃষক", accuracyRate: "নির্ভুলতা", fieldsMapped: "ম্যাপ করা জমি", yieldIncrease: "ফলন বৃদ্ধি" },
  rural: { title: "গ্রামীণ ভারতের জন্য তৈরি", subtitle: "গ্রামের কৃষকদের জন্য" },
  women: { title: "গ্রামীণ মহিলা কৃষি উদ্যোক্তা", subtitle: "নারীদের ক্ষমতায়ন" },
  ctaTitle: "আপনার কৃষি ব্যবসা পরিবর্তন করতে প্রস্তুত?", ctaSubtitle: "আজই শুরু করুন!", ctaDesc: "AgriSphere AI ব্যবহার করে লাভ বাড়ান।", ctaFreeTrial: "বিনামূল্যে ট্রায়াল", ctaDemo: "ডেমো"
});

// ASSAMESE MARKETPLACE & HOME FIXES
Object.assign(resources.as.translation.marketplace, {
  title: "স্মাৰ্ট বজাৰ আৰু পৰামৰ্শ", subtitle: "এআই পৰামৰ্শ লাভ কৰক আৰু ক্ৰেতা/বিক্ৰেতাৰ সৈতে যোগাযোগ কৰক।",
  tabs: { advisory: "পৰামৰ্শ", listings: "তালিকাভুক্ত কৰক", trends: "প্ৰৱণতা", demands: "ক্ৰেতাৰ চাহিদা" },
  demands: { title: "ক্ৰেতাৰ লাইভ চাহিদা", noDemands: "কোনো চাহিদা নাই।", verified: "প্ৰমাণিত ক্ৰেতা", targetPrice: "লক্ষ্য মূল্য", contactBtn: "যোগাযোগ কৰক" },
  advisory: { title: "AgriSphere স্মাৰ্ট পৰামৰ্শ", desc: "ব্যক্তিগত এআই পৰামৰ্শ।", selectCrop: "শস্য বাছনি কৰক", chooseCrop: "বাছক...", state: "ৰাজ্য", selectState: "ৰাজ্য বাছনি কৰক", sowingDate: "ৰোপণৰ তাৰিখ", pickDate: "তাৰিখ বাছনি কৰক", fieldSize: "ভূমি (একৰ)", analyzeBtn: "ৰিপোৰ্ট প্ৰস্তুত কৰক", analyzing: "প্ৰস্তুত কৰা হৈছে...", missingInfo: "উপস্থিত নাই", selectPrompt: "অনুগ্ৰহ কৰি নিৰ্বাচন কৰক।", readyTitle: "কৃষি পৰামৰ্শ ৰিপোৰ্ট:" },
  trends: { title: "এআই বজাৰ দৰ্শন", livePrices: "বজাৰ মূল্য", forecast: "মূল্যৰ পূৰ্বানুমান", fetched: "দৰ পোৱা গৈছে।", fetchError: "লাভ কৰাত বিফল।", detailsMissing: "স্থান নাই", enterStateDistrict: "ৰাজ্য আৰু জিলা উল্লেখ কৰক।", findMandiRates: "দৰ বিচাৰক", selectState: "ৰাজ্য বাছনি কৰক", enterDistrict: "জিলাৰ নাম লিখক", typeDistrict: "টাইপ কৰক...", category: "বিভাগ", checkRates: "দৰ পৰীক্ষা কৰক", forecastTitle: "পূৰ্বানুমান", noRates: "তথ্য পোৱা নগ'ল।" },
  listings: { filters: "বজাৰ ফিল্টাৰ", search: "বিচাৰক...", contactFarmer: "কৃষকৰ সৈতে যোগাযোগ", noListings: "কোনো তালিকা পোৱা নগ'ল।", form: { postTitle: "বিক্ৰী কৰক", postSubtitle: "তালিকা এটা প'ষ্ট কৰক।", name: "আপোনাৰ নাম", contact: "ফোন নম্বৰ", crop: "শস্যৰ নাম", qty: "পৰিমাণ", price: "মূল্য", selectState: "ৰাজ্য বাছনি কৰক", submit: "প'ষ্ট কৰক" }, fillAllFields: "বিৱৰণ পূৰণ কৰক।", listingPosted: "সফলতাৰে প'ষ্ট কৰা হ'ল!" }
});

Object.assign(resources.as.translation.home, {
  featuresTitle: "আধুনিক কৃষিৰ বাবে", featuresSubtitle: "স্মাৰ্ট ফিচাৰ", featuresDesc: "নতুন প্ৰযুক্তি",
  aboutTitle: "AgriSphere AI হৈছে ভাৰতৰ প্ৰথম AI + GIS প্লেটফৰ্ম।", aboutDesc: "শস্য বৃদ্ধি আৰু ৰোগৰ ঔষধ বাছনি কৰাত সহায় কৰে।",
  howItWorks: "কেনেদৰে কাম কৰে", howItWorksSubtitle: "৪টা সহজ পদক্ষেপ",
  stats: { activeFarmers: "সক্ৰিয় কৃষক", accuracyRate: "সঠিকতা", fieldsMapped: "মাটিৰ মেপিং", yieldIncrease: "উৎপাদন বৃদ্ধি" },
  rural: { title: "গ্ৰাম্য ভাৰতৰ বাবে", subtitle: "কৃষকৰ বাবে" },
  women: { title: "গ্ৰাম্য মহিলা কৃষি উদ্যোগী", subtitle: "নাৰী সবলীকৰণ" },
  ctaTitle: "আপোনাৰ ব্যৱসায় সলনি কৰিবলৈ প্ৰস্তুত নে?", ctaSubtitle: "আৰম্ভ কৰক!", ctaDesc: "AgriSphere AI ব্যৱহাৰ কৰক।", ctaFreeTrial: "বিনামূল্যে ট্ৰায়েল", ctaDemo: "ডেমো"
});


Object.assign(resources.kn.translation.disease, {
  title: "AI ಬೆಳೆ ರೋಗ ಪತ್ತೆ", backHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  desc: "ಉನ್ನತ ಮಟ್ಟದ AI ವ್ಯವಸ್ಥೆಯನ್ನು ಬಳಸಿಕೊಂಡು ಎಲೆ, ಕಾಂಡ, ಹಣ್ಣು ಮತ್ತು ಮಣ್ಣಿನ ಚಿತ್ರಗಳಿಂದ ರೋಗಗಳು, ಕೀಟಗಳು, ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಕೊರತೆಗಳನ್ನು 95%+ ನಿಖರತೆಯೊಂದಿಗೆ ಪತ್ತೆಹಚ್ಚಿ.",
  startBtn: "ಪತ್ತೆಹಚ್ಚುವಿಕೆ ಪ್ರಾರಂಭಿಸಿ", uploadBtn: "ಚಿತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", saveBtn: "ಉಳಿಸಿದ ವರದಿಗಳು", hideBtn: "ಮರೆಮಾಡಿ",
  reportsTitle: "ಆಫ್‌ಲೈನ್ ರೋಗ ವರದಿಗಳು", noReports: "ಯಾವುದೇ ವರದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.", capTitle: "ಮಲ್ಟಿ-ಕ್ಲಾಸ್ ಪತ್ತೆ ಸಾಮರ್ಥ್ಯಗಳು",
  pestTitle: "ಕೀಟ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ", aiTitle: "ಹೆಚ್ಚಿದ AI ಪತ್ತೆ", howTitle: "ನಾವು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ", accuracy: "ನಿಖರತೆ",
  types: {
    leaf: { title: "ಎಲೆ ರೋಗ ಪತ್ತೆ", desc: "ಶಿಲೀಂಧ್ರ ಮತ್ತು ವೈರಲ್ ಸೋಂಕುಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ", d1: "ರೋಗ", d2: "ತುಕ್ಕು", d3: "ವೈರಸ್", d4: "ಬ್ಯಾಕ್ಟೀರಿಯಾ" },
    stem: { title: "ಕಾಂಡದ ವಿಶ್ಲೇಷಣೆ", desc: "ಕಾಂಡದ ಕೊಳೆತ ಮತ್ತು ಹಾನಿಯನ್ನು ಪತ್ತೆಹಚ್ಚಿ", d1: "ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು", d2: "ಕೊಳೆತ", d3: "ಹಾನಿ", d4: "ಒಣಗುವಿಕೆ" },
    fruit: { title: "ಹಣ್ಣಿನ ತಪಾಸಣೆ", desc: "ಹಣ್ಣಿನ ರೋಗಗಳು ಮತ್ತು ಕೀಟಗಳ ಹಾನಿ ಗುರುತಿಸಿ", d1: "ಕೊಳೆತ ಹಣ್ಣು", d2: "ಕೀಟ ಹಾನಿ", d3: "ಬಿರುಕು", d4: "ಬಣ್ಣ ಬದಲಾವಣೆ" },
    soil: { title: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ", desc: "ಮಣ್ಣಿನ ರಚನೆ ಮತ್ತು ಪೋಷಕಾಂಶ ಕೊರತೆ", d1: "ಪೋಷಕಾಂಶ ಕೊರತೆ", d2: "pH ಅಸಮತೋಲನ", d3: "ಲವಣಾಂಶ", d4: "ಒತ್ತಡ" }
  },
  stats: { disease: "ರೋಗದ ಚಟುವಟಿಕೆ", diseaseDesc: "ಹವಾಮಾನ ಆಧಾರಿತ", pest: "ಕೀಟಗಳು", pests: "ಕೀಟಗಳ ಒತ್ತಡ", pestDesc: "7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ", soil: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ", soilDesc: "ಇತ್ತೀಚಿನ ತಪಾಸಣೆಗಳು" },
  score: "ಸ್ಕೋರ್", issues: "ಸಮಸ್ಯೆಗಳು", diseasesCount: "ಮೇಲ್ವಿಚಾರಣೆಯಲ್ಲಿರುವ ರೋಗಗಳು", pestsCount: "ಸಕ್ರಿಯ ಕೀಟ ಬೆದರಿಕೆಗಳು", viewSummary: "ಸಾರಾಂಶ ವೀಕ್ಷಿಸಿ",
  how: { s1: {title: "ಚಿತ್ರ ಸೆರೆಹಿಡಿಯಿರಿ", desc: "ಸಸ್ಯದ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ"}, s2: {title: "AI ವಿಶ್ಲೇಷಣೆ", desc: "ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ"}, s3: {title: "ವರ್ಗೀಕರಣ", desc: "ರೋಗದ ಫಲಿತಾಂಶಗಳು"}, s4: {title: "ಚಿಕಿತ್ಸಾ ಯೋಜನೆ", desc: "ಶಿಫಾರಸುಗಳು"} }
});

Object.assign(resources.kn.translation.yield, {
  title: "ಆಪ್ಟಿಮೈಸ್ಡ್ ಇಳುವರಿ ಮುನ್ಸೂಚನೆ", desc: "ಹವಾಮಾನ ದತ್ತಾಂಶದಲ್ಲಿ ತರಬೇತಿ ಪಡೆದ ಸುಧಾರಿತ ಮಾದರಿಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಬೆಳೆ ಇಳುವರಿಯನ್ನು ಊಹಿಸಿ.",
  inputTitle: "ಇನ್ಪುಟ್ ನಿಯತಾಂಕಗಳು", predictBtn: "ಮುನ್ಸೂಚನೆ ರಚಿಸಿ", analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
  resultsTitle: "ಮುನ್ಸೂಚನೆ ಫಲಿತಾಂಶಗಳು", totalProduction: "ಒಟ್ಟು ಅಂದಾಜು ಉತ್ಪಾದನೆ", revenue: "ಆದಾಯ",
  supportedCrops: "ಬெಂಬಲಿತ ಬೆಳೆಗಳು", selectCrop: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", area: "ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳು)",
  yieldEfficiency: "ಇಳುವರಿ ದಕ್ಷತೆ", potentialRevenue: "ಸಂಭಾವ್ಯ ಆದಾಯ", perHectare: "ಹೆಕ್ಟೇರ್‌ಗೆ", 
  approx: "ಅಂದಾಜು", confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ", modelUsed: "ಬಳಸಿದ ಮಾದರಿ", trainingData: "ತರಬೇತಿ ಡೇಟಾ",
  readyDesc: "ನಿಯತಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಕ್ಲಿಕ್ ಮಾಡಿ.", predictionSuccess: "ಫಲಿತಾಂಶ ಯಶಸ್ವಿ", tonsUnit: "ಟನ್"
});

Object.assign(resources.kn.translation.pest, {
  title: "ಕೀಟ ದಾಳಿಯ ಮುನ್ಸೂಚನೆ", inputTitle: "ಕ್ಷೇತ್ರದ ಸ್ಥಿತಿಗಳು", inputDesc: "ಪ್ರಸ್ತುತ ಹವಾಮಾನವನ್ನು ನಮೂದಿಸಿ", predictBtn: "ಅಪಾಯ ಊಹಿಸಿ",
  analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...", resultsTitle: "ಮುನ್ಸೂಚನೆ ಫಲಿತಾಂಶ", probability: "ದಾಳಿಯ ಸಂಭವನೀಯತೆ",
  riskLevel: "{{level}} ಅಪಾಯ", primaryThreat: "ಪ್ರಾಥಮಿಕ ಬೆದರಿಕೆ", recommendation: "ಶಿಫಾರಸು", forecast7Days: "7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
  readyDesc: "ಸ್ಲೈಡರ್‌ಗಳನ್ನು ಹೊಂದಿಸಿ ಮತ್ತು ಮುನ್ಸೂಚನೆ ಪಡೆಯಲು ಕ್ಲಿಕ್ ಮಾಡಿ", selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ", temp: "ತಾಪಮಾನ", humidity: "ತೇವಾಂಶ", rainfall: "ಮಳೆ"
});

Object.assign(resources.kn.translation.fertilizer, {
  title: "ಸ್ಮಾರ್ಟ್ ಗೊಬ್ಬರ ಮತ್ತು ನೀರಾವರಿ", subtitle: "ಉತ್ತಮ ಬೆಳೆ ಪೋಷಣೆ ಮತ್ತು ನೀರು ನಿರ್ವಹಣೆಗಾಗಿ AI ಶಿಫಾರಸುಗಳು",
  inputTitle: "ನಿಯತಾಂಕಗಳು", cropType: "ಬೆಳೆ ಪ್ರಕಾರ", selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
  analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...", getBtn: "ಶಿಫಾರಸು ಪಡೆಯಿರಿ",
  results: { noDataTitle: "ಯಾವುದೇ ಶಿಫಾರಸುಗಳಿಲ್ಲ", noDataDesc: "ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ.", planTitle: "ಗೊಬ್ಬರ ಯೋಜನೆ", adjustments: "ಸ್ಮಾರ್ಟ್ ಹೊಂದಾಣಿಕೆಗಳು", irrigationTitle: "ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ" }
});

Object.assign(resources.bn.translation.disease, {
  title: "AI শস্য রোগ নির্ণয়", backHome: "হোমে ফিরে যান",
  desc: "আধুনিক এআই সিস্টেমের সাহায্যে পাতা, কান্ড, ফল এবং মাটির ছবি থেকে রোগ, পোকামাকড় এবং পুষ্টির ঘাটতি সঠিকভাবে নির্ণয় করুন।",
  startBtn: "নির্ণয় শুরু করুন", uploadBtn: "ছবি আপলোড করুন", saveBtn: "সংরক্ষিত রিপোর্ট", hideBtn: "লুকান",
  reportsTitle: "অফলাইন রিপোর্ট", noReports: "কোন রিপোর্ট নেই।", capTitle: "নানাবিধ রোগ নির্ণয়ের ক্ষমতা",
  pestTitle: "কীটপতঙ্গ নির্ণয় ও চিকিৎসা", aiTitle: "উন্নত এআই সনাক্তকরণ", howTitle: "কিভাবে কাজ করে", accuracy: "সঠিকতা",
  types: {
    leaf: { title: "পাতার রোগ", desc: "ছত্রাক এবং ভাইরাস সংক্রমণ", d1: "ব্লাইট", d2: "মরিচা", d3: "ভাইরাস", d4: "ব্যাকটেরিয়া" },
    stem: { title: "কান্ডের বিশ্লেষণ", desc: "কান্ডের ক্ষতি নির্ণয়", d1: "পোকা", d2: "পচন", d3: "ক্যান্সার", d4: "শুকনো" },
    fruit: { title: "ফল পরিদর্শন", desc: "ফলের রোগ এবং কীটের ক্ষতি", d1: "পচন", d2: "কীটের ক্ষতি", d3: "ফাটা", d4: "রঙ পরিবর্তন" },
    soil: { title: "মাটির স্বাস্থ্য", desc: "মাটির পুষ্টির ঘাটতি", d1: "পুষ্টির ঘাটতি", d2: "pH ভারসাম্যহীনতা", d3: "লবণাক্ততা", d4: "চাপ" }
  },
  stats: { disease: "রোগের প্রাদুর্ভাব", diseaseDesc: "আবহাওয়া ভিত্তিক", pest: "কীটপতঙ্গ", pests: "কীটপতঙ্গের চাপ", pestDesc: "৭ দিনের পূর্বভাস", soil: "মাটির স্বাস্থ্য", soilDesc: "সাম্প্রতিক চেক" },
  score: "স্কোর", issues: "সমস্যাগুলি", diseasesCount: "নজরদারি করা রোগ", pestsCount: "সক্রিয় কীটের হুমকি", viewSummary: "সারাংশ দেখুন",
  how: { s1: {title: "ছবি তুলুন", desc: "উদ্ভিদের ছবি নিন"}, s2: {title: "AI বিশ্লেষণ", desc: "তথ্য প্রক্রিয়া করে"}, s3: {title: "শ্রেণীবিভাগ", desc: "ফলাফল প্রদর্শন"}, s4: {title: "চিকিৎসা পরিকল্পনা", desc: "সুপারিশ প্রদান"} }
});

Object.assign(resources.bn.translation.yield, {
  title: "অপ্টিমাইজড ফলন পূর্বাভাস", desc: "উন্নত এআই ব্যবহার করে ফসলের ফলনের পূর্বাভাস পান।", 
  inputTitle: "ইনপুট প্যারামিটার", predictBtn: "পূর্বাভাস তৈরি করুন", analyzing: "বিশ্লেষণ করা হচ্ছে...",
  resultsTitle: "ফলাফল", totalProduction: "মোট উৎপাদন", revenue: "আয়",
  supportedCrops: "সমর্থিত ফসল", selectCrop: "ফসল নির্বাচন করুন", area: "এলাকা (একর)",
  yieldEfficiency: "ফলন দক্ষতা", potentialRevenue: "সম্ভাব্য আয়", perHectare: "প্রতি হেক্টর",
  approx: "আনুমানিক", confidence: "নির্ভুলতা হার", modelUsed: "ব্যবহৃত মডেল", trainingData: "ডেটা",
  readyDesc: "প্যারামিটার দিন এবং বাটনে ক্লিক করুন।", predictionSuccess: "ফলাফল সফল", tonsUnit: "টন"
});

Object.assign(resources.bn.translation.pest, {
  title: "কীটপতঙ্গের আক্রমণের পূর্বাভাস", inputTitle: "মাঠের অবস্থা", inputDesc: "আবহাওয়ার বিবরণ দিন", predictBtn: "ঝুঁকি অনুমান করুন",
  analyzing: "বিশ্লেষণ করা হচ্ছে...", resultsTitle: "ফলাফল", probability: "আক্রমণের সম্ভাবনা",
  riskLevel: "{{level}} ঝুঁকি", primaryThreat: "প্রাথমিক হুমকি", recommendation: "সুপারিশ", forecast7Days: "৭ দিনের পূর্বাভাস",
  readyDesc: "স্লাইডার গুছিয়ে ক্লিক করুন", selectCrop: "ফসল নির্বাচন করুন", temp: "তাপমাত্রা", humidity: "আর্দ্রতা", rainfall: "বৃষ্টিপাত"
});

Object.assign(resources.bn.translation.fertilizer, {
  title: "স্মার্ট সার এবং সেচ", subtitle: "উন্নত ফসলের পুষ্টির জন্য আদর্শ সার ব্যবস্থা",
  inputTitle: "প্যারামিটার", cropType: "ফসলের ধরন", selectCrop: "নির্বাচন করুন",
  analyzing: "বিশ্লেষণ চলছে...", getBtn: "সুপারিশ পান",
  results: { noDataTitle: "কোনো সুপারিশ নেই", noDataDesc: "উপরে তথ্য দিন।", planTitle: "সার পরিকল্পনা", adjustments: "স্মার্ট অ্যাডজাস্টমেন্ট", irrigationTitle: "সেচের সময়সূচী" }
});

Object.assign(resources.as.translation.disease, {
  title: "AI শস্য ৰোগ চিনাক্তকৰণ", backHome: "হোমলৈ ঘূৰি যাওক",
  desc: "উন্নত এআইৰ দ্বাৰা পাত, কাঁচ আৰু ফলৰ পৰা ৰোগ, পোক আৰু পুষ্টিৰ অভাৱ সঠিকভাৱে চিনাক্ত কৰক।",
  startBtn: "চিনাক্তকৰণ আৰম্ভ কৰক", uploadBtn: "ছবি আপলোড কৰক", saveBtn: "সংৰক্ষিত ৰিপোৰ্ট", hideBtn: "লুকাওক",
  reportsTitle: "অফলাইন ৰিপোৰ্ট", noReports: "কোনো ৰিপোৰ্ট নাই।", capTitle: "বহু-শ্ৰেণীৰ চিনাক্তকৰণ",
  pestTitle: "পোক চিনাক্তকৰণ", aiTitle: "উন্নত এআই বিশ্লেষণ", howTitle: "কেনেকৈ কাম কৰে", accuracy: "সঠিকতা",
  types: {
    leaf: { title: "পাতৰ ৰোগ", desc: "ভাইৰাছ সংক্ৰমণ", d1: "ব্লাইট", d2: "মৰিচা", d3: "ভাইৰাছ", d4: "বেক্টেৰিয়া" },
    stem: { title: "কাঁচৰ বিশ্লেষণ", desc: "কাঁচৰ ক্ষতি চিনাক্ত কৰক", d1: "পোক", d2: "পচন", d3: "ক্ষতি", d4: "শুকান" },
    fruit: { title: "ফলৰ পৰীক্ষা", desc: "ফলৰ ৰোগ নিৰ্ণয়", d1: "পচন", d2: "পোকৰ ক্ষতি", d3: "ফাঁট", d4: "ৰঙৰ সালসলনি" },
    soil: { title: "মাটিৰ স্বাস্থ্য", desc: "মাটিৰ পৰীক্ষা", d1: "পুষ্টিৰ অভাৱ", d2: "pH সন্তুলন", d3: "লৱণতা", d4: "চাপ" }
  },
  stats: { disease: "ৰোগৰ সক্ৰিয়তা", diseaseDesc: "বতাহৰ ওপৰত আধাৰিত", pest: "পোক নিৰ্ণয়", pests: "পোকৰ চাপ", pestDesc: "৭ দিনৰ পূৰ্বানুমান", soil: "মাটিৰ স্বাস্থ্য", soilDesc: "শেহতীয়া পৰীক্ষা" },
  score: "স্কোৰ", issues: "সমস্যা", diseasesCount: "নিৰীক্ষণ কৰা ৰোগ", pestsCount: "সক্ৰিয় পোকৰ ভাবুকি", viewSummary: "সাৰাংশ চাওক",
  how: { s1: {title: "ছবি তোলক", desc: "গছৰ ছবি তোলক"}, s2: {title: "AI বিশ্লেষণ", desc: "তথ্য প্ৰক্ৰিয়া কৰা"}, s3: {title: "শ্ৰেণীবিভাজন", desc: "ফলাফল দৰ্শন"}, s4: {title: "চিকিৎসাৰ পৰিকল্পনা", desc: "পৰামৰ্শ"} }
});

Object.assign(resources.as.translation.yield, {
  title: "উন্নত উৎপাদনৰ পূৰ্বানুমান", desc: "এআই ব্যৱহাৰ কৰি শস্যৰ উৎপাদনৰ পূৰ্বানুমান জানক।", 
  inputTitle: "ইনপুট পাৰামিটাৰ", predictBtn: "পূৰ্বানুমান কৰক", analyzing: "বিশ্লেষণ কৰি থকা হৈছে...",
  resultsTitle: "ফলাফল", totalProduction: "মুঠ উৎপাদন", revenue: "ৰাজহ",
  supportedCrops: "সমৰ্থিত শস্য", selectCrop: "শস্য বাছনি কৰক", area: "মাটি (একৰ)",
  yieldEfficiency: "উৎপাদন দক্ষতা", potentialRevenue: "সম্ভাব্য ৰাজহ", perHectare: "প্ৰতি হেক্টৰ",
  approx: "প্ৰায়", confidence: "সঠিকতা", modelUsed: "ব্যৱহৃত মডেল", trainingData: "ডেটা",
  readyDesc: "তথ্য দিয়ক আৰু ক্লিক কৰক।", predictionSuccess: "ফলাফল সফল", tonsUnit: "টন"
});

Object.assign(resources.as.translation.pest, {
  title: "পোকৰ আক্ৰমণৰ পূৰ্বানুমান", inputTitle: "মাটিৰ অৱস্থা", inputDesc: "বতৰৰ বিৱৰণ দিয়ক", predictBtn: "খতৰা পূৰ্বানুমান",
  analyzing: "বিশ্লেষণ...", resultsTitle: "ফলাফল", probability: "আক্ৰমণৰ সম্ভাৱনা",
  riskLevel: "{{level}} বিপদ", primaryThreat: "প্ৰাথমিক ভাবুকি", recommendation: "পৰামৰ্শ", forecast7Days: "৭ দিনৰ পূৰ্বানুমান",
  readyDesc: "স্লাইডাৰ মিলাই ক্লিক কৰক", selectCrop: "শস্য বাছনি", temp: "তাপমাত্ৰা", humidity: "আৰ্দ্ৰতা", rainfall: "বৰষুণ"
});

Object.assign(resources.as.translation.fertilizer, {
  title: "স্মাৰ্ট সাৰ আৰু জলসিঞ্চন", subtitle: "উন্নত শস্যৰ বাবে এআইৰ পৰামৰ্শ",
  inputTitle: "পাৰামিটাৰ", cropType: "শস্যৰ প্ৰকাৰ", selectCrop: "নিৰ্বাচন কৰক",
  analyzing: "বিশ্লেষণ...", getBtn: "পৰামৰ্শ লাভ কৰক",
  results: { noDataTitle: "কোনো পৰামৰ্শ নাই", noDataDesc: "তপৰত তথ্য দিয়ক।", planTitle: "সাৰৰ পৰিকল্পনা", adjustments: "অ্যাডজাস্টমেন্ট", irrigationTitle: "জলসিঞ্চনৰ সময়সূচী" }
});


// FIXING MISSING FORM LABELS FOR ALL LANGUAGES

// ENGLISH
if(en.marketplace && en.marketplace.trends) {
  en.marketplace.trends.low = "Low";
  en.marketplace.trends.medium = "Medium";
  en.marketplace.trends.high = "High";
}
if(en.fertilizer) {
  Object.assign(en.fertilizer, {
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    moisture: "Soil Moisture (%)",
    moistureDry: "Dry",
    moistureWet: "Wet",
    rainfall: "Rainfall Forecast (mm)",
    soilPh: "Soil pH",
    selectStage: "Select Stage",
    stages: { sowing: "Sowing", vegetative: "Vegetative", flowering: "Flowering", harvest: "Harvest" }
  });
  if(en.fertilizer.results) {
    Object.assign(en.fertilizer.results, {
      phAlert: "pH Alert",
      waterAmount: "Water Amount",
      applyWater: "Apply {{amount}} water.",
      rainNote: "Rain expected next 3 days.",
      moistureNote: "Keep moisture optimal.",
      temperature: "Temperature",
      windSpeed: "Wind Speed",
      normal: "Normal"
    });
  }
}
if(en.yield) {
  en.yield.rainfall = "Rainfall (mm)";
  en.yield.avgTemp = "Avg Temp (°C)";
}

// BENGALI
if(resources.bn && resources.bn.translation) {
  if(resources.bn.translation.marketplace && resources.bn.translation.marketplace.trends) {
    resources.bn.translation.marketplace.trends.low = "নিম্ন";
    resources.bn.translation.marketplace.trends.medium = "মাঝারি";
    resources.bn.translation.marketplace.trends.high = "উচ্চ";
  }
  if(resources.bn.translation.fertilizer) {
    Object.assign(resources.bn.translation.fertilizer, {
      nitrogen: "নাইট্রোজেন (N)",
      phosphorus: "ফসফরাস (P)",
      potassium: "পটাশিয়াম (K)",
      moisture: "মাটির আর্দ্রতা (%)",
      moistureDry: "শুষ্ক",
      moistureWet: "ভিজে",
      rainfall: "বৃষ্টিপাতের পূর্বাভাস (মিমি)",
      soilPh: "মাটির পিএইচ (pH)",
      selectStage: "স্তর নির্বাচন করুন",
      stages: { sowing: "বপন", vegetative: "উদ্ভিজ্জ", flowering: "ফুল ফোটার সময়", harvest: "ফসল কাটার সময়" }
    });
    if(resources.bn.translation.fertilizer.results) {
      Object.assign(resources.bn.translation.fertilizer.results, {
        phAlert: "pH সতর্কতা",
        waterAmount: "জলের পরিমাণ",
        applyWater: "{{amount}} জল দিন।",
        rainNote: "পরবর্তী ৩ দিন বৃষ্টির সম্ভাবনা।",
        moistureNote: "আর্দ্রতা ঠিক রাখুন।",
        temperature: "তাপমাত্রা",
        windSpeed: "বাতাসের গতি",
        normal: "স্বাভাবিক"
      });
    }
  }
  if(resources.bn.translation.yield) {
    resources.bn.translation.yield.rainfall = "বৃষ্টিপাত (মিমি)";
    resources.bn.translation.yield.avgTemp = "গড় তাপমাত্রা (°C)";
  }
}

// ASSAMESE
if(resources.as && resources.as.translation) {
  if(resources.as.translation.marketplace && resources.as.translation.marketplace.trends) {
    resources.as.translation.marketplace.trends.low = "নিম্ন";
    resources.as.translation.marketplace.trends.medium = "মধ্যম";
    resources.as.translation.marketplace.trends.high = "উচ্চ";
  }
  if(resources.as.translation.fertilizer) {
    Object.assign(resources.as.translation.fertilizer, {
      nitrogen: "নাইট্ৰ'জেন (N)",
      phosphorus: "ফছফৰাছ (P)",
      potassium: "পটাছিয়াম (K)",
      moisture: "মাটিৰ আৰ্দ্ৰতা (%)",
      moistureDry: "শুকান",
      moistureWet: "সেমেকা",
      rainfall: "বৰষুণৰ পূৰ্বানুমান (মিমি)",
      soilPh: "মাটিৰ pH",
      selectStage: "স্তৰ বাছনি কৰক",
      stages: { sowing: "বীজ ৰোপণ", vegetative: "উদ্ভিদীয়", flowering: "ফুল ফুলাৰ সময়", harvest: "শস্য চপোৱাৰ সময়" }
    });
    if(resources.as.translation.fertilizer.results) {
      Object.assign(resources.as.translation.fertilizer.results, {
        phAlert: "pH সতৰ্কতা",
        waterAmount: "পানীৰ পৰিমাণ",
        applyWater: "{{amount}} পানী দিয়ক।",
        rainNote: "অহা ৩ দিন বৰষুণৰ সম্ভাৱনা।",
        moistureNote: "আৰ্দ্ৰতা সঠিক ৰাখক।",
        temperature: "তাপমাত্ৰা",
        windSpeed: "বতাহৰ গতি",
        normal: "স্বাভাৱিক"
      });
    }
  }
  if(resources.as.translation.yield) {
    resources.as.translation.yield.rainfall = "বৰষুণ (মিমি)";
    resources.as.translation.yield.avgTemp = "গড় তাপমাত্ৰা (°C)";
  }
}

// KANNADA
if(resources.kn && resources.kn.translation) {
  if(resources.kn.translation.marketplace && resources.kn.translation.marketplace.trends) {
    resources.kn.translation.marketplace.trends.low = "ಕಡಿಮೆ";
    resources.kn.translation.marketplace.trends.medium = "ಮಧ್ಯಮ";
    resources.kn.translation.marketplace.trends.high = "ಹೆಚ್ಚು";
  }
  if(resources.kn.translation.fertilizer) {
    Object.assign(resources.kn.translation.fertilizer, {
      nitrogen: "ಸಾರಜನಕ (N)",
      phosphorus: "ರಂಜಕ (P)",
      potassium: "ಪೊಟ್ಯಾಸಿಯಮ್ (K)",
      moisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ (%)",
      moistureDry: "ಒಣಗಿದ",
      moistureWet: "ಒದ್ದೆಯಾದ",
      rainfall: "ಮಳೆಯ ಮುನ್ಸೂಚನೆ (ಮಿಮೀ)",
      soilPh: "ಮಣ್ಣಿನ pH",
      selectStage: "ಹಂತವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      stages: { sowing: "ಬಿತ್ತನೆ", vegetative: "ಸಸ್ಯಕ", flowering: "ಹೂಬಿಡುವ", harvest: "ಕೊಯ್ಲು" }
    });
    if(resources.kn.translation.fertilizer.results) {
      Object.assign(resources.kn.translation.fertilizer.results, {
        phAlert: "pH ಎಚ್ಚರಿಕೆ",
        waterAmount: "ನೀರಿನ ಪ್ರಮಾಣ",
        applyWater: "{{amount}} ನೀರು ಬಳಸಿ.",
        rainNote: "ಮುಂದಿನ 3 ದಿನಗಳಲ್ಲಿ ಮಳೆ ನಿರೀಕ್ಷೆಯಿದೆ.",
        moistureNote: "ತೇವಾಂಶವನ್ನು ಉತ್ತಮವಾಗಿರಿಸಿ.",
        temperature: "ತಾಪಮಾನ",
        windSpeed: "ಗಾಳಿಯ ವೇಗ",
        normal: "ಸಾಮಾನ್ಯ"
      });
    }
  }
  if(resources.kn.translation.yield) {
    resources.kn.translation.yield.rainfall = "ಮಳೆ (ಮಿಮೀ)";
    resources.kn.translation.yield.avgTemp = "ಸರಾಸರಿ ತಾಪಮಾನ (°C)";
  }
}


// Final patch: Add missing 'growthStage' key to all languages
if (en.fertilizer) en.fertilizer.growthStage = "Growth Stage";

if (resources.bn && resources.bn.translation && resources.bn.translation.fertilizer)
  resources.bn.translation.fertilizer.growthStage = "বৃদ্ধির স্তর";

if (resources.as && resources.as.translation && resources.as.translation.fertilizer)
  resources.as.translation.fertilizer.growthStage = "বৃদ্ধিৰ স্তৰ";

if (resources.kn && resources.kn.translation && resources.kn.translation.fertilizer)
  resources.kn.translation.fertilizer.growthStage = "ಬೆಳವಣಿಗೆ ಹಂತ";

if (resources.hi && resources.hi.translation && resources.hi.translation.fertilizer)
  resources.hi.translation.fertilizer.growthStage = "वृद्धि चरण";


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


// DIGITAL TWIN HINDI
if (!resources.hi.translation.digitalTwin) resources.hi.translation.digitalTwin = {};
const hi_dt = resources.hi.translation.digitalTwin;

hi_dt.title = "GIS स्मार्ट खेती डिजिटल ट्विन";
hi_dt.subtitle = "परिशुद्ध खेती के लिए उन्नत GIS मैपिंग, मल्टी-लेयर विज़ुअलाइज़ेशन और रीयल-टाइम मॉनिटरिंग के साथ अपने खेत की एक पूर्ण डिजिटल प्रतिकृति बनाएं।";
hi_dt.featuring = "✨ विशेषता: खेत की सीमाएं • मिट्टी क्षेत्र • सिंचाई योजना • कीट जोखिम मानचित्र • NDVI फसल स्वास्थ्य • मौसम विश्लेषण";
hi_dt.generateBtn = "डिजिटल ट्विन उत्पन्न करें";
hi_dt.update = "डिजिटल ट्विन अपडेट करें";
hi_dt.quickDemo = "क्विक डेमो";
hi_dt.drawMap = "मानचित्र पर ड्रा करें";
hi_dt.drawDesc = "अपना स्थान चुनें और अपनी जमीन के सटीक आकार को ड्रा करें।";
hi_dt.setupTitle = "खेत सेटअप";
hi_dt.setupDesc = "अपना डिजिटल ट्विन उत्पन्न करने के लिए अपने खेत का विवरण या निर्देशांक दर्ज करें।";
hi_dt.farmName = "खेत का नाम";
hi_dt.ownerName = "मालिक का नाम";
hi_dt.state = "राज्य";
hi_dt.district = "जिला";
hi_dt.town = "कस्बा/गाँव";
hi_dt.coordinates = "निर्देशांक";
hi_dt.latitude = "अक्षांश";
hi_dt.longitude = "देशांतर";
hi_dt.useCurrent = "वर्तमान स्थान का उपयोग करें";
hi_dt.size = "खेत का आकार (एकड़)";
hi_dt.generating = "डिजिटल ट्वিন उत्पन्न हो रहा है...";
hi_dt.capabilities = "डिजिटल ट्विन क्षमताएं";
hi_dt.visualization = "मल्टी-लेयर GIS विज़ुअलाइज़ेशन";
hi_dt.interactiveMap = "इंटरएक्टिव GIS मानचित्र: {{name}}";
hi_dt.exploreNote = "मल्टी-लेयर GIS विज़ुअलाइज़ेशन के साथ {{owner}} के खेत को एक्सप्लोर करें। विस्तृत जानकारी के लिए क्षेत्रों पर क्लिक करें।";
hi_dt.liveData = "लाइव फार्म इंटेलिजेंस";
hi_dt.area = "खेत का क्षेत्र";
hi_dt.hectares = "हेक्टेयर";
hi_dt.stopBtn = "रोकें";
hi_dt.explainBtn = "खेत की स्थिति समझाएं";
hi_dt.initializing = {
  status: "डिजिटल ट्विन इंजन शुरू हो रहा है...",
  mapping: "के लिए सीमाओं का मानचित्रण",
  soil: "मिट्टी सेंसर डेटा परतों का विश्लेषण किया जा रहा है...",
  irrigation: "सिंचाई ग्रिड डिजाइन किया जा रहा है",
  pests: "ऐतिहासिक कीट जोखिम क्षेत्रों की गणना की जा रही है..."
};

hi_dt.features = {
  soil: {
    title: "मिट्टी क्षेत्र वर्गीकरण",
    desc: "बनावट, pH और पोषक तत्व मैपिंग के साथ मल्टी-लेयर मिट्टी विश्लेषण",
    f1: "मिट्टी की बनावट", f2: "pH क्षेत्र", f3: "पोषक तत्व मानचित्र", f4: "उर्वरता सूचकांक"
  },
  irrigation: {
    title: "सिंचाई क्षेत्र योजना",
    desc: "फसल की जरूरतों और मिट्टी की स्थितियों के आधार पर स्मार्ट सिंचाई क्षेत्र डिजाइन",
    f1: "जल क्षेत्र", f2: "ड्रिप योजना", f3: "स्प्रिंकलर लेआउट", f4: "दक्षता मानचित्र"
  },
  pest: {
    title: "कीट-प्रवण क्षेत्र पहचान",
    desc: "उच्च जोखिम वाले क्षेत्रों की पहचान करने के लिए ऐतिहासिक कीट डेटा का विश्लेषण",
    f1: "जोखिम क्षेत्र", f2: "कीट इतिहास", f3: "रोकथाम क्षेत्र", f4: "उपचार मानचित्र"
  },
  growth: {
    title: "फसल वृद्धि चरण",
    desc: "विभिन्न क्षेत्रों में रीयल-टाइम फसल विकास चरण की निगरानी",
    f1: "वृद्धि चरण", f2: "परिपक्वता मानचित्र", f3: "कटाई क्षेत्र", f4: "उपज पूर्वानुमान"
  },
  weather: {
    title: "मौसम सूक्ष्म जलवायु",
    desc: "खेत-विशिष्ट सूक्ष्म जलवायु विश्लेषण और मौसम पैटर्न मैपिंग",
    f1: "तापमान क्षेत्र", f2: "आर्द्रता मानचित्र", f3: "हवा के पैटर्न", f4: "पाला जोखिम"
  }
};

hi_dt.layers = {
  satellite: "सैटेलाइट इमेजरी",
  soilHealth: "मिट्टी स्वास्थ्य",
  cropHealth: "फसल स्वास्थ्य",
  weather: "मौसम डेटा",
  pests: "कीट अलर्ट",
  base: "बेस लेयर",
  analysis: "विश्लेषण परत",
  monitoring: "निगरानी परत",
  environmental: "पर्यावरणीय परत",
  alert: "अलर्ट लेयर",
  daily: "दैनिक",
  weekly: "साप्ताहिक",
  realtime: "रीयल-टाइम",
  hourly: "प्रति घंटा",
  asneeded: "आवश्यकतानुसार"
};

hi_dt.insights = {
  mappedZones: "मैप किए गए मिट्टी क्षेत्र",
  activeZones: "सक्रिय सिंचाई क्षेत्र",
  growthStages: "औसत वृद्धि चरण",
  health: "स्वास्थ्य स्कोर"
};

hi_dt.summary = {
  prefix: "{{area}} हेक्टेयर के लिए फार्म स्टेटस रिपोर्ट।",
  zones: "हमने {{soil}} मिट्टी क्षेत्र और {{irrigation}} सिंचाई क्षेत्र की पहचान की है।",
  health: "कुल फसल स्वास्थ्य {{health}}% है।",
  pestWarning: "चेतावनी: उच्च कीट जोखिम का पता चला है। तत्काल कार्रवाई करने की सलाह दी जाती है।",
  pestLow: "कीट जोखिम वर्तमान में कम है।"
};


// FINAL HINDI ADDITIONS
hi_dt.shapeAnalysis = "खेत आकार विश्लेषण";
resources.hi.translation.marketplace.demands.locationPref = "स्थान वरीयता";
resources.hi.translation.marketplace.langEn = "अंग्रेजी";
resources.hi.translation.marketplace.langHi = "हिंदी";
resources.hi.translation.marketplace.langBn = "बंगाली";
resources.hi.translation.marketplace.langAs = "असमिया";
resources.hi.translation.marketplace.langKn = "कन्नड़";

if(!resources.hi.translation.common.unit) resources.hi.translation.common.unit = {};
resources.hi.translation.common.unit.acres = "एकड़";
resources.hi.translation.common.unit.hectares = "हेक्टेयर";
resources.hi.translation.common.unit.tons = "टन";
resources.hi.translation.common.unit.quintals = "क्विंटल";
resources.hi.translation.common.unit.kilograms = "किलोग्राम";

if(!resources.hi.translation.pest.summary) resources.hi.translation.pest.summary = {};
resources.hi.translation.pest.summary.prediction = "पूर्वानुमान: {{level}} जोखिम ({{score}}%) के साथ {{name}}।";
resources.hi.translation.pest.summary.recommendation = "सिफारिश: {{recommendation}}";
resources.hi.translation.pest.summary.weather = "मौसम: {{temp}}°C, {{humidity}}% आर्द्रता, {{rainfall}}mm वर्षा।";
resources.hi.translation.pest.summary.crop = "फसल: {{crop}}।";

if(!resources.hi.translation.yield.summary) resources.hi.translation.yield.summary = {};
resources.hi.translation.yield.summary.report = "{{crop}} के लिए आपकी अनुमानित उपज {{total}} टन है। प्रति हेक्टेयर {{efficiency}} टन की इस दक्षता को बनाए रखने के लिए, मौसम के पूर्वानुमान के अनुसार इष्टतम NPK स्तर और समय पर सिंचाई सुनिश्चित करें।";

// BENGALI / ASSAMESE / KANNADA STUBS FOR SUMMARY & UNITS
// Bengali
const bn = resources.bn.translation;
if(!bn.pest) bn.pest = {}; if(!bn.pest.summary) bn.pest.summary = {};
bn.pest.summary.prediction = "পূর্বাভাস: {{level}} ঝুঁকি ({{score}}%) সহ {{name}}।";
bn.pest.summary.recommendation = "সুপারিশ: {{recommendation}}";
bn.pest.summary.weather = "আবহাওয়া: {{temp}}°C, {{humidity}}% আর্দ্রতা, {{rainfall}}mm বৃষ্টিপাত।";
bn.pest.summary.crop = "ফসল: {{crop}}।";

if(!bn.yield) bn.yield = {}; if(!bn.yield.summary) bn.yield.summary = {};
bn.yield.summary.report = "{{crop}}-এর জন্য আপনার আনুমানিক ফলন হল {{total}} টন। এই দক্ষতা বজায় রাখতে আবহাওয়ার পূর্বাভাস অনুযায়ী সার এবং সেচ নিশ্চিত করুন।";

if(!bn.common.unit) bn.common.unit = {};
bn.common.unit.acres = "একর"; bn.common.unit.hectares = "হেক্টর"; bn.common.unit.tons = "টন";

// Assamese
const as_t = resources.as.translation;
if(!as_t.pest) as_t.pest = {}; if(!as_t.pest.summary) as_t.pest.summary = {};
as_t.pest.summary.prediction = "পূৰ্বানুমান: {{level}} বিপদাশংকা ({{score}}%) সৈতে {{name}}।";
as_t.pest.summary.recommendation = "পৰামৰ্শ: {{recommendation}}";
as_t.pest.summary.weather = "বতৰ: {{temp}}°C, {{humidity}}% আৰ্দ্ৰতা, {{rainfall}}mm বৰষুণ।";
as_t.pest.summary.crop = "শস্য: {{crop}}।";

if(!as_t.yield) as_t.yield = {}; if(!as_t.yield.summary) as_t.yield.summary = {};
as_t.yield.summary.report = "{{crop}}-ৰ বাবে আপোনাৰ আনুমানিক উৎপাদন {{total}} টন।";

if(!as_t.common.unit) as_t.common.unit = {};
as_t.common.unit.acres = "একৰ"; as_t.common.unit.hectares = "হেক্টৰ"; as_t.common.unit.tons = "টন";

// Kannada
const kn = resources.kn.translation;
if(!kn.pest) kn.pest = {}; if(!kn.pest.summary) kn.pest.summary = {};
kn.pest.summary.prediction = "ಮುನ್ಸೂಚನೆ: {{level}} ಅಪಾಯ ({{score}}%) ಜೊತೆಗೆ {{name}}.";
kn.pest.summary.recommendation = "ಶಿಫಾರಸು: {{recommendation}}";
kn.pest.summary.weather = "ಹವಾಮಾನ: {{temp}}°C, {{humidity}}% ಆರ್ದ್ರತೆ, {{rainfall}}mm ಮಳೆ.";
kn.pest.summary.crop = "ಬೆಳೆ: {{crop}}.";

if(!kn.yield) kn.yield = {}; if(!kn.yield.summary) kn.yield.summary = {};
kn.yield.summary.report = "{{crop}} ಗಾಗಿ ನಿಮ್ಮ ಅಂದಾಜು ಇಳುವರಿ {{total}} ಟನ್ ಆಗಿದೆ.";

if(!kn.common.unit) kn.common.unit = {};
kn.common.unit.acres = "ಎಕರೆ"; kn.common.unit.hectares = "ಹೆಕ್ಟೇರ್"; kn.common.unit.tons = "ಟನ್";

// Write out the fixed i18n.ts
const newI18n = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = ${JSON.stringify(resources, null, 2)};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
`;

fs.writeFileSync('src/lib/i18n.ts', newI18n);
console.log('Successfully completely rebuilt i18n.ts with full fallback language support and translations merged.');
