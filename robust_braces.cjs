const fs = require('fs');
const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');

let depth = 0;
let inString = false;
let stringChar = '';
let inEscape = false;
let stack = [];

for (let i = 0; i < content.length; i++) {
    let char = content[i];
    
    if (inString) {
        if (inEscape) {
            inEscape = false;
        } else if (char === '\\') {
            inEscape = true;
        } else if (char === stringChar) {
            inString = false;
        }
    } else {
        if (char === '"' || char === "'") {
            inString = true;
            stringChar = char;
        } else if (char === '{') {
            depth++;
            stack.push({ char, line: content.slice(0, Math.min(i, content.length)).split('\n').length });
        } else if (char === '}') {
            depth--;
            stack.pop();
        }
    }
}

console.log(`Final depth: ${depth}`);
if (depth > 0) {
    console.log("Unclosed `{` found at:");
    for (let c of stack) {
        console.log(`Line ${c.line}`);
    }
}
