const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'lib', 'i18n.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The structural fix was broken by missing or extra braces.
// Let's just fix the end of the file.

const closingBraceCount = (content.match(/\}/g) || []).length;
const openingBraceCount = (content.match(/\{/g) || []).length;

console.log(`Braces - Opens: ${openingBraceCount}, Closes: ${closingBraceCount}`);

if (openingBraceCount > closingBraceCount) {
    const diff = openingBraceCount - closingBraceCount;
    let extraBraces = '';
    for (let i = 0; i < diff - 1; i++) extraBraces += '  }\n';
    extraBraces += '};';
    
    // We need to insert these before 'i18n' starts
    const insertPoint = content.lastIndexOf('i18n');
    if (insertPoint !== -1) {
        // Find the original resources closing };
        const lastBracePoint = content.lastIndexOf('};', insertPoint);
        if (lastBracePoint !== -1) {
             const before = content.substring(0, lastBracePoint);
             const after = content.substring(lastBracePoint);
             content = before + '\n' + extraBraces + '\n' + after;
        } else {
             // Just append them before i18n
             content = content.substring(0, insertPoint) + extraBraces + '\n\n' + content.substring(insertPoint);
        }
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final i18n.ts brace fix applied.');
