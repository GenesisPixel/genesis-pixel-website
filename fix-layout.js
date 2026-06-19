const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/pages/transitions');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro') && f !== 'proyecto-final.astro');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Step 1: Extract and remove ConsejoProfesional
  let consejoMatch = content.match(/<div class="[^"]*not-prose[^"]*">\s*<ConsejoProfesional[\s\S]*?<\/div>/) 
                  || content.match(/<ConsejoProfesional[^>]*>[\s\S]*?<\/ConsejoProfesional>/)
                  || content.match(/<ConsejoProfesional[^>]*\/>/);
  
  let consejoContent = '';
  if (consejoMatch) {
    consejoContent = consejoMatch[0];
    content = content.replace(consejoMatch[0], '');
    // If it's just the tag, wrap it in not-prose div
    if (!consejoContent.includes('not-prose')) {
      consejoContent = `<div class="my-8 not-prose">\n    ${consejoContent}\n  </div>`;
    }
  }

  // Step 2: Extract and remove ErroresComunesV3
  let erroresMatch = content.match(/<ErroresComunesV3[\s\S]*?\/>/);
  let erroresContent = '';
  if (erroresMatch) {
    erroresContent = erroresMatch[0];
    content = content.replace(erroresMatch[0], '');
  }

  // Step 3: Extract and remove PracticeCards
  let practiceMatch = content.match(/<PracticeCards[\s\S]*?\/>/);
  let practiceContent = '';
  if (practiceMatch) {
    practiceContent = practiceMatch[0];
    content = content.replace(practiceMatch[0], '');
  }

  // Step 4: Extract article
  let articleMatch = content.match(/<article[\s\S]*?<\/article>/);
  
  if (articleMatch && (consejoContent || erroresContent || practiceContent)) {
    // We will place ConsejoProfesional immediately after </article>
    // We need to find the example block. It starts with an <h3> after </article>
    let afterArticle = content.split('</article>')[1];
    let beforeArticle = content.split('</article>')[0] + '</article>';

    // Find the end of the example block. The example block is usually a div with flex-row that contains ResultPreview.
    // Let's just find the closing </TransitionsLayout>
    let layoutEndIndex = afterArticle.lastIndexOf('</TransitionsLayout>');
    let mainContentEnd = afterArticle.substring(0, layoutEndIndex);
    let layoutEnd = afterArticle.substring(layoutEndIndex);

    // Clean up any empty <div class="my-8 flex flex-col gap-6"> left behind
    mainContentEnd = mainContentEnd.replace(/<div class="my-8 flex flex-col gap-6">\s*<\/div>/g, '');

    let newAfterArticle = `\n\n  ${consejoContent}`;
    newAfterArticle += mainContentEnd;
    
    // Add Errores and PracticeCards before layoutEnd
    newAfterArticle += `\n  <div class="my-8 flex flex-col gap-6">\n`;
    if (erroresContent) newAfterArticle += `    ${erroresContent}\n`;
    if (practiceContent) newAfterArticle += `    ${practiceContent}\n`;
    newAfterArticle += `  </div>\n`;

    newAfterArticle += layoutEnd;

    // Clean up multiple newlines
    newAfterArticle = newAfterArticle.replace(/\n{3,}/g, '\n\n');

    let finalContent = beforeArticle + newAfterArticle;
    fs.writeFileSync(filePath, finalContent);
    console.log('Fixed ' + file);
  }
});
