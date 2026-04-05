// Debug: understand i18n.ts structure
import { readFileSync } from 'fs';

const content = readFileSync('./src/lib/i18n.ts', 'utf8');
const lines = content.split('\n');

console.log(`Total lines: ${lines.length}`);
console.log(`Total bytes: ${content.length}`);

// Find all top-level language markers
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (/^(en|hi|bn|as|kn):\s*\{/.test(line)) {
    console.log(`\nLine ${i+1}: "${lines[i].substring(0, 80)}"`);
  }
}

// Find readyDesc in all languages
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('readyDesc')) {
    console.log(`\nreadyDesc at line ${i+1}: "${lines[i].substring(0, 120)}"`);
  }
}

// Find accuracyNote (last key in yield section?)
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('accuracyNote')) {
    console.log(`\naccuracyNote at line ${i+1}: "${lines[i].substring(0, 120)}"`);
  }
}

// Find farmerDashboard sections
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('farmerDashboard')) {
    console.log(`\nfarmerDashboard at line ${i+1}: "${lines[i].substring(0, 120)}"`);
  }
}

// Find "ginger" already present?
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('ginger')) {
    console.log(`\nginger at line ${i+1}: "${lines[i].substring(0, 120)}"`);
  }
}

// Print the yield section in English (around line 180-200)
console.log('\n\n=== ENGLISH YIELD SECTION ===');
for (let i = 175; i < 210 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}

// Print around where the en section ends
console.log('\n\n=== AROUND EN/HI BOUNDARY ===');
for (let i = 605; i < 625 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}

// Print crops section in English
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('crops:') && i < 600) {
    console.log(`\n=== CROPS at line ${i+1} ===`);
    for (let j = i; j < i + 15 && j < lines.length; j++) {
      console.log(`${j+1}: ${lines[j]}`);
    }
    break;
  }
}
