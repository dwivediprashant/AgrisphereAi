import { readFileSync, writeFileSync } from 'fs';

const filePath = './src/lib/i18n.ts';
let content = readFileSync(filePath, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: inject a block of keys BEFORE a closing brace anchor found uniquely
// ─────────────────────────────────────────────────────────────────────────────
function insertBefore(src, anchor, insertion) {
  const idx = src.indexOf(anchor);
  if (idx === -1) { console.warn(`⚠  anchor not found: ${anchor.slice(0,60)}`); return src; }
  return src.slice(0, idx) + insertion + src.slice(idx);
}

function replaceStr(src, target, replacement) {
  if (!src.includes(target)) { console.warn(`⚠  target not found: ${target.slice(0,60)}`); return src; }
  return src.replace(target, replacement);
}

// ═══════════════════════════════════════════════════════════════════════════
// 1.  ENGLISH – add missing keys that pages reference
// ═══════════════════════════════════════════════════════════════════════════
// Inside en → yield section, add missing keys
// Look for the end of the yield section in English
content = content.replace(
  /(\s{8}readyDesc:\s*"Fill in the farm parameters.*?")/,
  `$1,
        confidenceRange: "Confidence Range",
        fiveYearAvg: "5-Year Average",
        trend: "Trend",
        regionalPerformance: "Regional Performance",
        kharifSeason: "Kharif Season 2025",
        tonsPerHa: "tons/ha",
        tonsUnit: "Tons",
        predictionSuccess: "Prediction Successful",
        estimatedProduction: "Estimated Production"`
);

// Add ginger to common.crops in English
content = content.replace(
  /(\s{8}tomato:\s*"Tomato"(\s*,\s*cotton:\s*"Cotton")?)/,
  `$1,
        ginger: "Ginger"`
);
// Handle if it's already there
if (!content.includes('ginger: "Ginger"')) {
  content = content.replace(
    /(common:\s*\{[\s\S]*?crops:\s*\{[\s\S]*?tomato:\s*"Tomato")/,
    `$1,
        ginger: "Ginger"`
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2.  HINDI – add missing keys
// ═══════════════════════════════════════════════════════════════════════════
content = content.replace(
  /(\s*readyDesc:\s*"फार्म पैरामीटर दर्ज.*?")/,
  `$1,
        confidenceRange: "विश्वास सीमा",
        fiveYearAvg: "5-वर्ष औसत",
        trend: "प्रवृत्ति",
        regionalPerformance: "क्षेत्रीय प्रदर्शन",
        kharifSeason: "खरीफ सीजन 2025",
        tonsPerHa: "टन/हेक्टेयर",
        tonsUnit: "टन",
        predictionSuccess: "पूर्वानुमान सफल",
        estimatedProduction: "अनुमानित उत्पादन"`
);

content = content.replace(
  /(hi[\s\S]*?common:\s*\{[\s\S]*?crops:\s*\{[\s\S]*?tomato:\s*"टमाटर")/,
  `$1,
        ginger: "अदरक"`
);

// ═══════════════════════════════════════════════════════════════════════════
// 3.  BENGALI – add missing keys
// ═══════════════════════════════════════════════════════════════════════════

// Missing yield sub-keys in Bengali
const bnYieldExtra = `
        confidenceRange: "আস্থা পরিসীমা",
        fiveYearAvg: "৫-বছরের গড়",
        trend: "প্রবণতা",
        regionalPerformance: "আঞ্চলিক কর্মক্ষমতা",
        kharifSeason: "খরিফ মৌসুম ২০২৫",
        tonsPerHa: "টন/হেক্টর",
        tonsUnit: "টন",
        predictionSuccess: "পূর্বাভাস সফল হয়েছে",
        estimatedProduction: "আনুমানিক উৎপাদন"`;

// Bengali readyDesc anchor
content = content.replace(
  /(bn[\s\S]*?readyDesc:\s*"ফার্ম প্যারামিটার.*?")/,
  `$1,${bnYieldExtra}`
);

// Bengali crops - add ginger
content = content.replace(
  /(bn[\s\S]*?common:\s*\{[\s\S]*?crops:\s*\{[\s\S]*?tomato:\s*"টমেটো")/,
  `$1,
        ginger: "আদা"`
);

// Bengali farmerDashboard: ensure farmerDashboard section has full keys
// Check if farmerDashboard exists in bn - if not, we need to add it
if (!content.match(/bn[\s\S]{0,3000}farmerDashboard/)) {
  // Add farmerDashboard section to Bengali before closing brace of bn.translation
  const bnFarmerDashboard = `
      farmerDashboard: {
        title: "কৃষক AI ড্যাশবোর্ড",
        subtitle: "আপনার কৃষি ব্যবস্থাপনার জন্য উন্নত AI সরঞ্জাম",
        tabs: {
          overview: "সংক্ষিপ্ত বিবরণ",
          disease: "AI রোগ শনাক্তকরণ",
          twin: "GIS ডিজিটাল টুইন",
          yield: "ফলন পূর্বাভাস",
          pest: "কীট পূর্বাভাস",
          marketplace: "মার্কেটপ্লেস"
        },
        metrics: {
          models: "AI মডেল",
          activeModels: "সক্রিয় মডেল",
          area: "খামার এলাকা",
          hectares: "হেক্টর",
          detections: "শনাক্তকরণ",
          types: "প্রকার",
          accuracy: "নির্ভুলতা",
          precision: "নির্ভুলতার হার"
        },
        status: {
          active: "সক্রিয়",
          live: "লাইভ",
          types: "প্রকার"
        },
        yield: {
          title: "দ্রুত ফলন বিবরণ",
          advancedTitle: "উন্নত ফলন পূর্বাভাস",
          perHectare: "প্রতি হেক্টর",
          modelPerformance: "মডেল কর্মক্ষমতা"
        },
        twin: {
          title: "GIS ডিজিটাল টুইন",
          activeZones: "সক্রিয় অঞ্চল",
          monitored: "পর্যবেক্ষণ করা",
          average: "গড়",
          spatialFeatures: "স্থানিক বৈশিষ্ট্য",
          precisionBenefits: "নির্ভুলতা সুবিধা"
        }
      },`;
  content = content.replace(
    /(bn[\s\S]*?govDashboard[\s\S]*?\}[\s\S]*?\})([\s\n]*?as:\s*\{)/,
    `$1${bnFarmerDashboard}$2`
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4.  ASSAMESE – add missing keys
// ═══════════════════════════════════════════════════════════════════════════
const asYieldExtra = `
        confidenceRange: "আত্মবিশ্বাসৰ পৰিসৰ",
        fiveYearAvg: "৫-বছৰৰ গড়",
        trend: "প্রৱণতা",
        regionalPerformance: "আঞ্চলিক কাৰ্যক্ষমতা",
        kharifSeason: "খাৰিফ বতৰ ২০২৫",
        tonsPerHa: "টন/হেক্টৰ",
        tonsUnit: "টন",
        predictionSuccess: "পূৰ্বানুমান সফল হ'ল",
        estimatedProduction: "আনুমানিক উৎপাদন"`;

content = content.replace(
  /(as[\s\S]*?readyDesc:\s*"খেতিৰ প্ৰসংগ.*?")/,
  `$1,${asYieldExtra}`
);

// Assamese crops ginger
content = content.replace(
  /(as[\s\S]*?common:\s*\{[\s\S]*?crops:\s*\{[\s\S]*?tomato:\s*"টমেটো")/,
  `$1,
        ginger: "আদা"`
);

// Assamese farmerDashboard
if (!content.match(/as[\s\S]{0,3000}farmerDashboard/)) {
  const asFarmerDashboard = `
      farmerDashboard: {
        title: "কৃষক AI ডেছব'ৰ্ড",
        subtitle: "আপোনাৰ কৃষি ব্যৱস্থাপনাৰ বাবে উন্নত AI সঁজুলি",
        tabs: {
          overview: "চমু বিৱৰণ",
          disease: "AI ৰোগ চিনাক্তকৰণ",
          twin: "GIS ডিজিটেল টুইন",
          yield: "উৎপাদন পূৰ্বানুমান",
          pest: "কীট পূৰ্বানুমান",
          marketplace: "বজাৰস্থল"
        },
        metrics: {
          models: "AI মডেল",
          activeModels: "সক্ৰিয় মডেল",
          area: "খেতিৰ এলেকা",
          hectares: "হেক্টৰ",
          detections: "চিনাক্তকৰণ",
          types: "প্ৰকাৰ",
          accuracy: "নিখুঁততা",
          precision: "নিখুঁততাৰ হাৰ"
        },
        status: {
          active: "সক্ৰিয়",
          live: "লাইভ",
          types: "প্ৰকাৰ"
        },
        yield: {
          title: "দ্ৰুত উৎপাদন বিৱৰণ",
          advancedTitle: "উন্নত উৎপাদন পূৰ্বানুমান",
          perHectare: "প্ৰতি হেক্টৰ",
          modelPerformance: "মডেলৰ কাৰ্যক্ষমতা"
        },
        twin: {
          title: "GIS ডিজিটেল টুইন",
          activeZones: "সক্ৰিয় অঞ্চল",
          monitored: "পৰ্যবেক্ষণ কৰা",
          average: "গড়",
          spatialFeatures: "স্থানিক বৈশিষ্ট্য",
          precisionBenefits: "নিখুঁততাৰ সুবিধা"
        }
      },`;
  content = content.replace(
    /(as[\s\S]*?govDashboard[\s\S]*?\}[\s\S]*?\})([\s\n]*?kn:\s*\{)/,
    `$1${asFarmerDashboard}$2`
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 5.  KANNADA – add missing keys
// ═══════════════════════════════════════════════════════════════════════════
const knYieldExtra = `
        confidenceRange: "ವಿಶ್ವಾಸ ವ್ಯಾಪ್ತಿ",
        fiveYearAvg: "೫-ವರ್ಷದ ಸರಾಸರಿ",
        trend: "ಪ್ರವೃತ್ತಿ",
        regionalPerformance: "ಪ್ರಾದೇಶಿಕ ಕಾರ್ಯಕ್ಷಮತೆ",
        kharifSeason: "ಖರೀಫ್ ಋತು ೨೦೨೫",
        tonsPerHa: "ಟನ್/ಹೆಕ್ಟೇರ್",
        tonsUnit: "ಟನ್",
        predictionSuccess: "ಮುನ್ಸೂಚನೆ ಯಶಸ್ವಿಯಾಗಿದೆ",
        estimatedProduction: "ಅಂದಾಜು ಉತ್ಪಾದನೆ"`;

content = content.replace(
  /(kn[\s\S]*?readyDesc:\s*"ಜಮೀನಿನ.*?")/,
  `$1,${knYieldExtra}`
);

// Kannada crops ginger  
content = content.replace(
  /(kn[\s\S]*?common:\s*\{[\s\S]*?crops:\s*\{[\s\S]*?tomato:\s*"ಟೊಮೇಟೊ")/,
  `$1,
        ginger: "ಶುಂಠಿ"`
);

// Kannada farmerDashboard
if (!content.match(/kn[\s\S]{0,3000}farmerDashboard/)) {
  const knFarmerDashboard = `
      farmerDashboard: {
        title: "ರೈತ AI ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        subtitle: "ನಿಮ್ಮ ಕೃಷಿ ನಿರ್ವಹಣೆಗಾಗಿ ಸುಧಾರಿತ AI ಪರಿಕರಗಳು",
        tabs: {
          overview: "ಸಾರಾಂಶ",
          disease: "AI ರೋಗ ಪತ್ತೆ",
          twin: "GIS ಡಿಜಿಟಲ್ ಟ್ವಿನ್",
          yield: "ಇಳುವರಿ ಮುನ್ಸೂಚನೆ",
          pest: "ಕೀಟ ಮುನ್ಸೂಚನೆ",
          marketplace: "ಮಾರ್ಕೆಟ್‌ಪ್ಲೇಸ್"
        },
        metrics: {
          models: "AI ಮಾದರಿಗಳು",
          activeModels: "ಸಕ್ರಿಯ ಮಾದರಿಗಳು",
          area: "ಜಮೀನಿನ ಪ್ರದೇಶ",
          hectares: "ಹೆಕ್ಟೇರ್",
          detections: "ಪತ್ತೆಗಳು",
          types: "ವಿಧಗಳು",
          accuracy: "ನಿಖರತೆ",
          precision: "ನಿಖರತೆಯ ದರ"
        },
        status: {
          active: "ಸಕ್ರಿಯ",
          live: "ಲೈವ್",
          types: "ವಿಧಗಳು"
        },
        yield: {
          title: "ತ್ವರಿತ ಇಳುವರಿ ವಿವರ",
          advancedTitle: "ಸುಧಾರಿತ ಇಳುವರಿ ಮುನ್ಸೂಚನೆ",
          perHectare: "ಪ್ರತಿ ಹೆಕ್ಟೇರ್",
          modelPerformance: "ಮಾದರಿ ಕಾರ್ಯಕ್ಷಮತೆ"
        },
        twin: {
          title: "GIS ಡಿಜಿಟಲ್ ಟ್ವಿನ್",
          activeZones: "ಸಕ್ರಿಯ ವಲಯಗಳು",
          monitored: "ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲಾಗಿದೆ",
          average: "ಸರಾಸರಿ",
          spatialFeatures: "ಪ್ರಾದೇಶಿಕ ವೈಶಿಷ್ಟ್ಯಗಳು",
          precisionBenefits: "ನಿಖರತೆ ಪ್ರಯೋಜನಗಳು"
        }
      },`;
  content = content.replace(
    /(kn[\s\S]*?govDashboard[\s\S]*?\}[\s\S]*?\})([\s\n]*?\}\s*\}\s*\}\s*\n)/,
    `$1${knFarmerDashboard}$2`
  );
}

// ─── Save ────────────────────────────────────────────────────────────────────
writeFileSync(filePath, content, 'utf8');
console.log('✅ i18n.ts patched successfully');
