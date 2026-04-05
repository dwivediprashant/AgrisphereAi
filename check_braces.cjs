const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'lib', 'i18n.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let depth = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    const prevDepth = depth;
    depth += opens - closes;
    if (depth < 0) {
        console.log(`NEGATIVE DEPTH at line ${i + 1}: ${line}`);
        break;
    }
    // We expect resources to start at depth 1 (line 6)
    // if i+1 == 2354, depth should be 0.
}
console.log(`Final depth: ${depth}`);
