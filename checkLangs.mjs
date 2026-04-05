import fs from 'fs';
const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');

const keys = ['advisoryHub:', 'yield:', 'marketplace:', 'disease:', 'community:'];

const langs = ['en', 'hi', 'bn', 'as', 'kn'];
const objMatch = content.match(/const resources = (\{[\s\S]*\}?);?/);

langs.forEach(l => {
    // A crude hack manually splitting by the top level keys
    const idx = content.indexOf(`\n  ${l}: {`);
    if(idx === -1) {
        console.log(l, 'block not found');
        return;
    }
    
    // Find the end of this block by finding the start of the next language or end of file
    let nextIdx = content.length;
    for(const nextL of langs) {
        if(nextL !== l) {
            const tempIdx = content.indexOf(`\n  ${nextL}: {`, idx + 1);
            if(tempIdx !== -1 && tempIdx < nextIdx) {
                nextIdx = tempIdx;
            }
        }
    }
    
    const block = content.substring(idx, nextIdx);
    keys.forEach(k => {
        console.log(`${l} has ${k} ?`, block.includes(k));
    });
    console.log('---');
});
