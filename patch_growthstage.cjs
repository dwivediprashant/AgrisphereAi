const fs = require('fs');

let script = fs.readFileSync('rebuild_i18n.mjs', 'utf8');

const patch = `
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
`;

script = script.replace('// Write out the fixed i18n.ts', patch + '\n// Write out the fixed i18n.ts');
fs.writeFileSync('rebuild_i18n.mjs', script);
console.log('Patched growthStage key for all languages!');
