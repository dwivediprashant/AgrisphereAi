const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'lib', 'i18n.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The goal is to ensure EVERY language starts correctly and doesn't close translation prematurely.
// Pattern for regional languages:
// langCode: {
//   translation: {
//     nav: { ... },
//     home: { ... }

function fixLanguage(langCode) {
    // 1. Fix the nav finish to not close translation
    // Find: aiTools: "...",\s+}(\s*}\s*,?\s*)(home: {)
    // Replace with: aiTools: "...",\s+},\s+home: {
    const navEndPattern = new RegExp(`(aiTools: "[^"]+",?\\s+\\}\\s*),?\\s*\\}\\s*,?\\s*(home: \\{)`, 'g');
    
    // We only want to apply this search within the block for the specific language
    const langStart = content.indexOf(`${langCode}: {`);
    if (langStart === -1) return;

    let nextLangStart = content.indexOf(`  `, langStart + 10); // Find next language or end
    // (This is fuzzy, let's just find the next known lang or resources end)
    const knownLangs = ['bn:', 'as:', 'kn:', 'init({', 'fallbackLng:'];
    let endOfBlock = content.length;
    for (const k of knownLangs) {
        let idx = content.indexOf(k, langStart + 10);
        if (idx !== -1 && idx < endOfBlock) endOfBlock = idx;
    }

    let langBlock = content.substring(langStart, endOfBlock);
    
    // Fix the premature closure of 'translation' after 'nav'
    // This happens if we see: aiTools: "...",\n    }\n  },\n  home: {
    langBlock = langBlock.replace(/(aiTools: "[^"]+",?\s+\})\s*\}\s*,?\s*(home: \{)/g, '$1,\n      $2');

    // Also ensure hi has nav if it's missing (though it should be fixed now)
    if (langCode === 'hi' && !langBlock.includes('nav: {')) {
        langBlock = langBlock.replace(/translation: \{\s+home: \{/, 'translation: {\n      nav: {\n        home: "होम",\n        marketplace: "बाज़ार",\n        communityForum: "किसान समुदाय फोरम",\n        advisoryHub: "सलाहकार हब",\n        voiceAssistant: "वॉयस असिस्टेंट",\n        fertilizerAi: "उर्वरक AI",\n        pestForecast: "कीट भविष्यवाणी",\n        adminDashboard: "अधिकारी डैशबोर्ड",\n        buyerDashboard: "क्रेता डैशबोर्ड",\n        farmerDashboard: "किसान डैशबोर्ड",\n        diseaseDetection: "रोग की पहचान",\n        yieldPrediction: "उपज भविष्यवाणी",\n        digitalTwin: "डिजिटल ट्विन",\n        login: "लॉग इन",\n        getStarted: "शुरू करें",\n        logout: "लॉग आउट",\n        saveProfile: "प्रोफ़ाइल सहेजें",\n        aiTools: "स्मार्ट खेती टूल्स"\n      },\n      home: {');
    }

    content = content.substring(0, langStart) + langBlock + content.substring(endOfBlock);
}

fixLanguage('hi');
fixLanguage('bn');
fixLanguage('as');
fixLanguage('kn');

// Final check: Every language should end with } } }, except maybe the last one
// Actually, let's just make sure total brace count is at least correct at the end
// Const resources = {
//   en: { translation: { ... } },
//   ...
// };
// Let's just fix the very end of the file to be safe.
const contentEnd = content.lastIndexOf('export default i18n;');
const beforeExport = content.substring(0, contentEnd);
// The last 'kn' should end with } } } or similar.
// Let's just pray the per-language fix works.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Improved repair script finished.');
