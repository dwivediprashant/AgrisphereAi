const fs = require('fs');
const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');
const lines = content.split('\n');

let depth = 0;
for (let i=0; i<lines.length; i++) {
   const line = lines[i];
   let oldDepth = depth;
   for (let c of line) {
       if (c === '{') depth++;
       if (c === '}') depth--;
   }
   if (line.match(/^\s*(en|hi|bn|as|kn):\s*\{/)) {
       console.log(`Language node start at line ${i+1}: ${line.trim()} (Depth before: ${oldDepth}, Depth after: ${depth})`);
   }
   if (line.match(/^\s*\}\s*,?\s*$/) && depth <= 2 && i < 2350) {
       console.log(`Potential Language node close at line ${i+1} (Depth after: ${depth})`);
   }
}
console.log(`Final depth: ${depth}`);
