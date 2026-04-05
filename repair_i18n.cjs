const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'lib', 'i18n.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the mangled section (614-651)
// We look for the cut-off "Precision Agri" and everything up to the real heroTitle1
const brokenStartStr = 'precisionBenefits: "Precision Agri';
const endMarker = 'heroTitle1: "भारत का पहला",';

const startIndex = content.indexOf(brokenStartStr);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `precisionBenefits: "Precision Agriculture Benefits"
        }
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: "होम",
        marketplace: "बाज़ार",
        communityForum: "किसान समुदाय फोरम",
        advisoryHub: "सलाहकार हब",
        voiceAssistant: "वॉयस असिस्टेंट",
        fertilizerAi: "उर्वरक AI",
        pestForecast: "कीट भविष्यवाणी",
        adminDashboard: "अधिकारी डैशबोर्ड",
        buyerDashboard: "क्रेता डैशबोर्ड",
        farmerDashboard: "किसान डैशबोर्ड",
        diseaseDetection: "रोग की पहचान",
        yieldPrediction: "उपज भविष्यवाणी",
        digitalTwin: "डिजिटल ट्विन",
        login: "लॉग इन",
        getStarted: "शुरू करें",
        logout: "लॉग आउट",
        saveProfile: "प्रोफ़ाइल सहेजें",
        aiTools: "स्मार्ट खेती टूल्स"
      },
      home: {
        `;
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    console.log('Fixed mangled Hindi/English section.');
} else {
    console.log('Failed to find markers for Hindi fix.');
}

// 2. Fix other languages (premature translation closings)
// For 'bn', 'as', 'kn', we need to check if 'translation: { nav: { ... } }, home: {' 
// exists and replace it with 'translation: { nav: { ... } , home: {' (removing the brace)

function fixNesting(langCode) {
    // Search for the end of the nav block in each language
    // Pattern: aiTools: "...",\s+},\s+home: {
    const navEndRegex = new RegExp(`(${langCode}: \\{\\s+translation: \\{[\\s\\S]+?aiTools: "[^"]+",\\s+)(\\}\\s*,\\s+)(home: \\{)`, 'g');
    if (content.match(navEndRegex)) {
        content = content.replace(navEndRegex, '$1$3');
        console.log(`Fixed nesting for ${langCode}.`);
    } else {
         console.log(`Nesting pattern not found (or already fixed) for ${langCode}.`);
    }
}

fixNesting('bn');
fixNesting('as');
fixNesting('kn');

fs.writeFileSync(filePath, content, 'utf8');
console.log('i18n.ts updated successfully.');
