const fs = require('fs');
const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');
const lines = content.split('\n');

let depth = 0;
let log = '';
for (let i=0; i<lines.length; i++) {
   const line = lines[i];
   let oldDepth = depth;
   for (let c of line) {
       if (c === '{') depth++;
       if (c === '}') depth--;
   }
   if (line.match(/^\s*(en|hi|bn|as|kn):\s*\{/)) {
       log += `Language node start at line ${i+1}: ${line.trim()} (Depth before: ${oldDepth}, Depth after: ${depth})\n`;
   }
   if (line.match(/^\s*\}\s*,?\s*$/) && depth <= 2 && i < 2350) {
       log += `Potential Language node close at line ${i+1} (Depth after: ${depth})\n`;
   }
}
log += `Final depth: ${depth}\n`;
fs.writeFileSync('check_out2.txt', log, 'utf8');
