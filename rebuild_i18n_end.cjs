const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'lib', 'i18n.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Ensure the final structure is correct.
// We need exactly enough braces to match 'const resources = {' on line 6.
// Let's replace everything after 'community: {' in 'kn' with a known good structure.

const knCommunityStart = content.lastIndexOf('community: {');
if (knCommunityStart !== -1) {
    const afterCommunity = `community: {
        title: "ಕಿಸಾನ್ ಸಾರಥಿ ಸಮುದಾಯ",
        subtitle: "ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ ಮತ್ತು ಒಟ್ಟಾಗಿ ಬೆಳೆಯಿರಿ.",
        searchPlaceholder: "ಹುಡುಕಿ...",
        askBtn: "ಪ್ರಶ್ನೆ ಕೇಳಿ",
        tabs: {
            feed: "ಸಮುದಾಯ ಫೀಡ್",
            experts: "ತಜ್ಞರ ಸಲಹೆ",
            myPosts: "ನನ್ನ ಚಟುವಟಿಕೆ"
        }
      }
    }
  }
};

i18n`;
    
    const i18nStart = content.indexOf('i18n', knCommunityStart);
    if (i18nStart !== -1) {
        content = content.substring(0, knCommunityStart) + afterCommunity + content.substring(i18nStart + 4);
        console.log('Fixed Kannada community end andresources closing.');
    }
} else {
    console.log('Kannada community block not found.');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final structure fix applied.');
