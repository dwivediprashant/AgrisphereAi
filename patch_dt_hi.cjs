const fs = require('fs');

let script = fs.readFileSync('rebuild_i18n.mjs', 'utf8');

const hiDt = `
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
`;

script = script.replace('// Write out the fixed i18n.ts', hiDt + '\n// Write out the fixed i18n.ts');
fs.writeFileSync('rebuild_i18n.mjs', script);
console.log('Digital Twin Hindi keys injected into rebuild script!');
