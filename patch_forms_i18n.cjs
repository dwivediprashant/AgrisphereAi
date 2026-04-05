const fs = require('fs');

let script = fs.readFileSync('rebuild_i18n.mjs', 'utf8');

// We will append a final block right before "// Write out the fixed i18n.ts"
const finalPatch = `
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
`;

script = script.replace('// Write out the fixed i18n.ts', finalPatch + '\n// Write out the fixed i18n.ts');

fs.writeFileSync('rebuild_i18n.mjs', script);
console.log('Fixed missing detailed input fields for fertilizer and yield across 4 languages!');
