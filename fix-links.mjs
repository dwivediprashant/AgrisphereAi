import fs from 'fs';
import path from 'path';

const d = 'src/pages';
const files = fs.readdirSync(d);
files.forEach(f => {
  if (!f.endsWith('.tsx')) return;
  const p = path.join(d, f);
  let c = fs.readFileSync(p, 'utf8');
  let changed = false;

  // Replace <a href="/"> ... </a>
  if (c.includes('<a href="/"')) {
    // We only want to replace the <a> tags that match href="/".
    c = c.replace(/<a href="\/"([\s\S]*?)<\/a>/g, '<Link to="/"$1</Link>');
    changed = true;
  }

  // We also have to replace plain <a href="/" className=...> to <Link to="/" className=...
  if (c.includes('href="/"')) {
     c = c.replace(/href="\/"/g, 'to="/"');
     changed = true;
  }

  if (changed) {
    if (!c.includes('react-router-dom')) {
      c = 'import { Link } from "react-router-dom";\n' + c;
    } else if (!c.includes('Link')) {
      c = c.replace(/import \{([^}]+)\} from "react-router-dom";/, 'import { Link, $1 } from "react-router-dom";');
    }
    fs.writeFileSync(p, c);
    console.log('Fixed', f);
  }
});
