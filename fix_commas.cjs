const fs = require('fs');
const filePath = 'src/lib/i18n.ts';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
const issues = [];

for (let i = 1; i < lines.length; i++) {
  const prev = lines[i - 1].trimEnd();
  const cur = lines[i].trim();
  // Pattern: line starts a new section (word: {) but previous line ends without comma
  if (cur.match(/^\w+:\s*\{/) && !cur.match(/^\w+:\s*\{.*\}/) && (prev.endsWith('"') || prev.endsWith("'") || (prev.endsWith('}') && !prev.endsWith('},')))) {
    issues.push({ line: i + 1, fixLine: i, prev: prev.substring(0, 80), cur: cur.substring(0, 80) });
  }
}

console.log(`Found ${issues.length} missing comma/brace issues:`);
issues.forEach(issue => {
  console.log(`  Line ${issue.line}: ${issue.cur}`);
  console.log(`    After: ${issue.prev}`);
});

// Fix them - work backwards to preserve line numbers
for (let i = issues.length - 1; i >= 0; i--) {
  const issue = issues[i];
  const lineIdx = issue.fixLine - 1; // 0-indexed
  const prevLine = lines[lineIdx];
  
  if (prevLine.trimEnd().endsWith('}')) {
    // Need to add comma after closing brace AND add section closing
    lines[lineIdx] = prevLine.trimEnd() + ',';
  } else if (prevLine.trimEnd().endsWith('"') || prevLine.trimEnd().endsWith("'")) {
    // Need closing brace+comma before new section
    // Add }, on a new line
    const indent = lines[issue.fixLine].match(/^(\s*)/)[1];
    lines[lineIdx] = prevLine.trimEnd() + '\n' + indent.slice(0, -2) + '},';
  }
}

const result = lines.join('\n');
fs.writeFileSync(filePath, result, 'utf8');
console.log(`\n✅ Fixed ${issues.length} issues.`);
