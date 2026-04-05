import fs from 'fs';

const en = JSON.parse(fs.readFileSync('en_block.json', 'utf8'));

en.translation.voiceAssistant = {
  hero: {
    title: "Voice Assistant for Farmers",
    desc: "Speak naturally in Hindi or your local language. Get instant AI-powered agricultural advice with voice responses designed for rural farmers.",
    startBtn: "Start Speaking",
    chooseLangBtn: "Choose Language"
  },
  features: {
    sectionTitle: "Voice Assistant Features",
    f1: {
      title: "Hindi Voice Recognition",
      desc: "Speak naturally in Hindi and get instant responses",
      example: "Gehun mein rog a gaya hai, kya karein?",
      response: "Wheat disease detected. Apply fungicide spray."
    },
    f2: {
      title: "Local Language Support",
      desc: "Support for regional languages across India"
    },
    f3: {
      title: "Audio Responses",
      desc: "Get detailed audio responses in your preferred language",
      item1: "Clear pronunciation",
      item2: "Slow/Fast speed",
      item3: "Repeat option",
      item4: "Save audio"
    },
    f4: {
      title: "Offline Voice Commands",
      desc: "Basic voice commands work even without internet",
      item1: "Weather check",
      item2: "Crop calendar",
      item3: "Basic diagnosis",
      item4: "Emergency help"
    }
  },
  examples: {
    sectionTitle: "Real Conversation Examples",
    solutionPrefix: "Solution",
    e1: {
      farmer: "Tomato mein patte peelay ho rahe hain",
      farmerTrans: "Tomato leaves are turning yellow",
      ai: "यह नाइट्रोजन की कमी हो सकती है। यूरिया का छिड़काव करें।",
      aiTrans: "This could be nitrogen deficiency. Apply urea spray.",
      solution: "Apply 2kg urea per acre with water spray"
    },
    e2: {
      farmer: "Kya aaj pani dena chahiye?",
      farmerTrans: "Should I water today?",
      ai: "मिट्टी में नमी 40% है। 2 दिन बाद पानी दें।",
      aiTrans: "Soil moisture is 40%. Water after 2 days.",
      solution: "Wait 2 days, then apply 25mm irrigation"
    },
    e3: {
      farmer: "Fasal kab kaatni chahiye?",
      farmerTrans: "When should I harvest the crop?",
      ai: "आपकी गेहूं 15 दिन में तैयार होगी। दाने सुनहरे होने का इंतज़ार करें।",
      aiTrans: "Your wheat will be ready in 15 days. Wait for golden grains.",
      solution: "Harvest when moisture content is 12-14%"
    }
  },
  demo: {
    sectionTitle: "Try Voice Assistant Live",
    selectLang: "Select Language / भाषा चुनें",
    listening: "सुन रहा हूं... / Listening...",
    pressToSpeak: "बोलने के लिए दबाएं / Press to Speak",
    processing: "प्रोसेसिंग... / Processing...",
    youSaid: "आपने कहा / You said:",
    aiResponse: "🤖 AgriSphere AI का जवाब / Response:",
    exampleQuestionsTitle: "उदाहरण प्रश्न / Example Questions:",
    noteTitle: "Note",
    noteDesc: "Voice recognition requires a modern browser with microphone permissions. Works best in Chrome/Edge.",
    noteHindiDesc: "नोट: आवाज़ पहचान के लिए आधुनिक ब्राउज़र और माइक्रोफ़ोन की अनुमति चाहिए।"
  },
  langs: {
    sectionTitle: "Supported Languages",
    hindi: "Hindi",
    english: "English (India)",
    fullSupport: "Full Support"
  },
  howItWorks: {
    sectionTitle: "How Voice Assistant Works",
    s1: { title: "Speak Question", desc: "Ask in Hindi or local language" },
    s2: { title: "AI Processing", desc: "Voice recognition & understanding" },
    s3: { title: "Generate Response", desc: "AI creates personalized answer" },
    s4: { title: "Audio Reply", desc: "Hear response in your language" }
  },
  benefits: {
    sectionTitle: "Voice Assistant Benefits",
    b1: { title: "Easy to Use", desc: "No typing required, just speak" },
    b2: { title: "Rural Friendly", desc: "Works for illiterate farmers" },
    b3: { title: "Instant Help", desc: "Get answers in seconds" },
    b4: { title: "Local Language", desc: "Understand & respond in Hindi" }
  }
};

fs.writeFileSync('en_block.json', JSON.stringify(en, null, 2));

let rebuildCode = fs.readFileSync('rebuild_i18n.mjs', 'utf8');

const hiTranslations = `
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
`;

// Clean up previous injection if exists to avoid duplicates
rebuildCode = rebuildCode.replace(/Object\.assign\(resources\.hi\.translation\.voiceAssistant, \{[\s\S]*?\}\);/g, '');

// Insert before the i18n build string
rebuildCode = rebuildCode.replace(/\/\/ Write out the fixed i18n\.ts/g, hiTranslations + '\n// Write out the fixed i18n.ts');
fs.writeFileSync('rebuild_i18n.mjs', rebuildCode);

console.log('Setup comprehensive voice assistant translations successfully.');
