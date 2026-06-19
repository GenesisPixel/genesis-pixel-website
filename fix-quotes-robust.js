const fs = require('fs');
const path = require('path');
const dir = 'src/pages/interactions';

fs.readdirSync(dir).forEach(file => {
  if(file.endsWith('.astro')){
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // First, find the ConsejoProfesional tag
    content = content.replace(/<ConsejoProfesional tip=([\s\S]*?)\/>/, (match, tipContent) => {
      // tipContent could be `"some text"` or `'some text'`
      let cleanText = tipContent.trim();
      
      // Remove outer quotes if they exist
      if (cleanText.startsWith('"') && cleanText.endsWith('"')) {
        cleanText = cleanText.substring(1, cleanText.length - 1);
      } else if (cleanText.startsWith("'") && cleanText.endsWith("'")) {
        cleanText = cleanText.substring(1, cleanText.length - 1);
      }
      
      // Now cleanText is the raw string.
      // Let's replace any literal double quotes with single quotes
      cleanText = cleanText.replace(/"/g, "'");
      
      // Return safely wrapped in double quotes
      return `<ConsejoProfesional tip="${cleanText}" />`;
    });
    
    fs.writeFileSync(filepath, content);
    console.log('Fixed quotes in', file);
  }
});
