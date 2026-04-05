const fs = require('fs');

const hiFinal = `
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
`;

let script = fs.readFileSync('rebuild_i18n.mjs', 'utf8');
script = script.replace('// Write out the fixed i18n.ts', hiFinal + '\n// Write out the fixed i18n.ts');
fs.writeFileSync('rebuild_i18n.mjs', script);
console.log('All final translation stubs injected into rebuild script!');
