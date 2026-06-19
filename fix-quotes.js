const fs = require('fs');
const path = require('path');
const dir = 'src/pages/interactions/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

let fixed = 0;
files.forEach(file => {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;

  // Fix: replace inner double quotes inside tip="..." with &quot;
  content = content.replace(/<ConsejoProfesional tip="([\s\S]*?)" \/>/g, (match, tip) => {
    const safeTip = tip.replace(/"/g, '&quot;');
    return `<ConsejoProfesional tip="${safeTip}" />`;
  });

  if (content !== original) {
    fs.writeFileSync(fp, content);
    fixed++;
    console.log('Fixed: ' + file);
  }
});
console.log('Done. Fixed ' + fixed + ' files.');
