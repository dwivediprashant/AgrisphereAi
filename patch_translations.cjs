const fs = require('fs');

let rebuildScript = fs.readFileSync('rebuild_i18n.mjs', 'utf8');

// 1. Fix the stages key
rebuildScript = rebuildScript.replace(
  `const en = JSON.parse(fs.readFileSync('en_block.json', 'utf8')).translation;`,
  `const en = JSON.parse(fs.readFileSync('en_block.json', 'utf8')).translation;
// Fix stages/steps bug
if (en.marketplace && en.marketplace.advisory && en.marketplace.advisory.steps) {
  en.marketplace.advisory.stages = en.marketplace.advisory.steps;
}`
);

// 2. Add the translation blocks
const extraTranslations = `
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
`;

rebuildScript = rebuildScript.replace(
  `// Write out the fixed i18n.ts`,
  extraTranslations + `\n// Write out the fixed i18n.ts`
);

fs.writeFileSync('rebuild_i18n.mjs', rebuildScript);
console.log('Rebuild script patched successfully!');
