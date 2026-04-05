// Audit i18n.ts for missing keys across languages
import { readFileSync } from 'fs';
import { createRequire } from 'module';

const content = readFileSync('./src/lib/i18n.ts', 'utf8');

// Extract the resources object - find language sections
function findSection(lang) {
  const langPattern = new RegExp(`  ${lang}: \\{[\\s\\S]*?translation: \\{`);
  const match = langPattern.exec(content);
  if (!match) return null;
  
  const start = match.index + match[0].length;
  let depth = 1;
  let i = start;
  while (i < content.length && depth > 0) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') depth--;
    i++;
  }
  return content.slice(start, i - 1);
}

function extractKeys(obj, prefix = '') {
  const keys = [];
  // Simple key extraction using regex
  const keyPattern = /^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/gm;
  let match;
  // We need a proper extraction - count depth
  let depth = 0;
  let currentPath = prefix;
  
  return keys;
}

// Simple approach: count occurrences of key patterns
function countTopLevelKeys(sectionContent) {
  const keys = new Set();
  const matches = sectionContent.matchAll(/^\s{0,6}([a-zA-Z][a-zA-Z0-9]*):\s*[{"'`]/gm);
  for (const m of matches) {
    keys.add(m[1]);
  }
  return keys;
}

const langs = ['en', 'hi', 'bn', 'as', 'kn'];
const sections = {};
for (const lang of langs) {
  sections[lang] = findSection(lang);
}

console.log('=== Language Section Analysis ===');
for (const lang of langs) {
  const s = sections[lang];
  if (s) {
    const keys = countTopLevelKeys(s);
    console.log(`\n${lang} has ${keys.size} top-level keys:`);
    console.log([...keys].sort().join(', '));
  } else {
    console.log(`\n${lang}: SECTION NOT FOUND`);
  }
}
