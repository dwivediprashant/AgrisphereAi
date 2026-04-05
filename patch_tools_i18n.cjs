const fs = require('fs');

let script = fs.readFileSync('rebuild_i18n.mjs', 'utf8');

// Fix the missing disease stats keys in base English
const enFixes = `
if (en.disease && en.disease.stats) {
  en.disease.stats.diseaseDesc = "Based on weather & crops";
  en.disease.stats.pest = "Pest Detection";
  en.disease.stats.pestDesc = "Forecast for next 7 days";
  en.disease.stats.soilDesc = "Recent nutrient checks";
}
`;
script = script.replace('// 2. Load the existing Hindi block', enFixes + '\n// 2. Load the existing Hindi block');

// KANNADA TRANSLATIONS FOR DISEASE, YIELD, PEST
const knTrans = `
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
`;

// BENGALI TRANSLATIONS
const bnTrans = `
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
`;

// ASSAMESE TRANSLATIONS
const asTrans = `
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
`;

script = script.replace('// Write out the fixed i18n.ts', knTrans + bnTrans + asTrans + '\n// Write out the fixed i18n.ts');

fs.writeFileSync('rebuild_i18n.mjs', script);
console.log('Fixed disease, pest, yield, fertilizer translations in rebuild.js!');
