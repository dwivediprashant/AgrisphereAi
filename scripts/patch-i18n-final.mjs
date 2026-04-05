// Final gap-fill: add yield.acres, yield.ha, common.error to all languages
import { readFileSync, writeFileSync } from 'fs';

const filePath = './src/lib/i18n.ts';
let content = readFileSync(filePath, 'utf8');

// ─ English ─
content = content.replace(
  /(en[\s\S]*?yield:\s*\{[\s\S]*?estimatedProduction:\s*"Estimated Production")/,
  `$1,
        acres: "Acres",
        ha: "Ha"`
);
content = content.replace(
  /(en[\s\S]*?common:\s*\{[\s\S]*?ginger:\s*"Ginger")/,
  `$1,
        error: "Error"`
);

// ─ Hindi ─
content = content.replace(
  /(hi[\s\S]*?yield:\s*\{[\s\S]*?estimatedProduction:\s*"अनुमानित उत्पादन")/,
  `$1,
        acres: "एकड़",
        ha: "हे"`
);
content = content.replace(
  /(hi[\s\S]*?common:\s*\{[\s\S]*?ginger:\s*"अदरक")/,
  `$1,
        error: "त्रुटि"`
);

// ─ Bengali ─
content = content.replace(
  /(bn[\s\S]*?estimatedProduction:\s*"আনুমানিক উৎপাদন")/,
  `$1,
        acres: "একর",
        ha: "হে"`
);
content = content.replace(
  /(bn[\s\S]*?ginger:\s*"আদা")/,
  `$1,
        error: "ত্রুটি"`
);

// ─ Assamese ─
content = content.replace(
  /(as[\s\S]*?estimatedProduction:\s*"আনুমানিক উৎপাদন")/,
  `$1,
        acres: "একৰ",
        ha: "হেক্টৰ"`
);
content = content.replace(
  /(as[\s\S]*?ginger:\s*"আদা")/,
  `$1,
        error: "ভুল"`
);

// ─ Kannada ─
content = content.replace(
  /(kn[\s\S]*?estimatedProduction:\s*"ಅಂದಾಜು ಉತ್ಪಾದನೆ")/,
  `$1,
        acres: "ಎಕರೆ",
        ha: "ಹೆ"`
);
content = content.replace(
  /(kn[\s\S]*?ginger:\s*"ಶುಂಠಿ")/,
  `$1,
        error: "ದೋಷ"`
);

writeFileSync(filePath, content, 'utf8');
console.log('✅ Gap-fill done.');

// ─── Verify patch results ───────────────────────────────────────────────────
const lines = content.split('\n');
const checks = [
  'confidenceRange',
  'fiveYearAvg',
  'trend',
  'regionalPerformance',
  'kharifSeason',
  'tonsPerHa',
  'tonsUnit',
  'acres',
  'ginger',
  'error',
  'farmerDashboard'
];
const langs = ['en', 'hi', 'bn', 'as', 'kn'];

for (const key of checks) {
  const count = (content.match(new RegExp(`${key}:`, 'g')) || []).length;
  console.log(`  "${key}" found ${count} time(s)`);
}
