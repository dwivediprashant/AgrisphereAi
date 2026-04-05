const fs = require('fs');
const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');
const lines = content.split('\n');

let stack = [];
for (let i=0; i<lines.length; i++) {
    let line = lines[i];
    let m = line.match(/^(\s*)([a-zA-Z0-9_]+):\s*\{/);
    if (m) {
        stack.push({key: m[2], line: i+1, indent: m[1].length});
    }
    if (line.match(/^\s*\}\s*,?\s*$/)) {
        if (stack.length > 0) {
            let popped = stack.pop();
            // console.log(`Closed ${popped.key} at line ${i+1}`);
        }
    }
}
console.log("Unclosed blocks:");
stack.forEach(s => console.log(`- ${s.key} (started at line ${s.line}, indent: ${s.indent})`));

