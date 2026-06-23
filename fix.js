const fs = require('fs');
const dir = 'src/pages/shaders/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));
for (const file of files) {
  const path = dir + file;
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/code: "([\s\S]*?)" \}/g, 'code: `$1` }');
  fs.writeFileSync(path, content, 'utf8');
}
console.log("Fixed files!");
