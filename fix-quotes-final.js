const fs = require('fs');
const path = require('path');

const dir = 'src/pages/interactions';

const updates = {
  'modales-overlays.astro': `Anima siempre el fondo (overlay) con opacidad para oscurecer la pantalla, y el modal en sí usando transform: scale o transform: translateY. Evita animar propiedades de layout como width/height.`,
  'tooltips.astro': `Un buen tooltip usa transition-delay solo en la entrada, pero desaparece instantáneamente en la salida (sin delay). Así evitas que bloqueen la lectura de elementos cercanos cuando el usuario aparta el cursor.`
};

for (const [file, tip] of Object.entries(updates)) {
  const filepath = path.join(dir, file);
  if (!fs.existsSync(filepath)) continue;
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Replace the entire <ConsejoProfesional ... /> tag
  // We can match it up to the /> 
  content = content.replace(/<ConsejoProfesional tip=.*?\/>/g, `<ConsejoProfesional tip='${tip}' />`);
  
  fs.writeFileSync(filepath, content);
  console.log('Fixed', file);
}

// Just in case, let's also fix estados-interfaz.astro
const file3 = path.join(dir, 'estados-interfaz.astro');
if (fs.existsSync(file3)) {
  let c3 = fs.readFileSync(file3, 'utf8');
  c3 = c3.replace(/<ConsejoProfesional tip=.*?\/>/g, `<ConsejoProfesional tip='El estado :focus es crítico. Nunca uses outline: none; globalmente a menos que proveas un anillo de sombra alternativo usando box-shadow para que los usuarios de teclado no se pierdan ciegos en tu página.' />`);
  fs.writeFileSync(file3, c3);
}

// Just in case, let's also fix que-son.astro
const file4 = path.join(dir, 'que-son.astro');
if (fs.existsSync(file4)) {
  let c4 = fs.readFileSync(file4, 'utf8');
  c4 = c4.replace(/<ConsejoProfesional tip=.*?\/>/g, `<ConsejoProfesional tip='Piensa en las interacciones como una conversación. El usuario habla haciendo clic o pasando el cursor, y la interfaz debe responder de forma clara y rápida. Usa tiempos entre 150ms y 300ms; más lento parecerá lag.' />`);
  fs.writeFileSync(file4, c4);
}
