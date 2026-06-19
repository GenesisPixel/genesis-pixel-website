const fs = require('fs');
const path = require('path');
const dir = 'src/pages/interactions/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro') && f !== 'proyecto-final.astro');

// Define the correct practiceSteps for each file
const practiceData = {
  'que-son.astro': {
    title: 'Practica lo Aprendido',
    description: 'Crea un botón sin interacción y otro con feedback visual completo para notar la diferencia.',
    steps: [
      { number: 1, text: 'Crea un botón con fondo #333 y sin transición alguna.', color: 'dm-purple', rotate: '-3deg' },
      { number: 2, text: 'Agrega un :hover que cambie su opacidad a 0.7.', color: 'dm-green', rotate: '2deg' },
      { number: 3, text: 'Ahora agrega transition: opacity 0.2s ease y compara.', color: 'app-color-yellow400', rotate: '-5deg' },
      { number: 4, text: 'Agrega un :active que reduzca la escala a 0.95.', color: 'dm-blue', rotate: '3deg' },
      { number: 5, text: 'Reflexiona: ¿cuál botón invita más a hacer clic?', color: 'dm-purple', rotate: '-2deg' },
    ]
  },
  'microinteracciones.astro': {
    title: 'Practica lo Aprendido',
    description: 'Diseña tu propia microinteracción de favorito combinando CSS y una clase JS.',
    steps: [
      { number: 1, text: 'Crea un botón de corazón básico con SVG.', color: 'dm-purple', rotate: '4deg' },
      { number: 2, text: 'Define un estado .active con fill rojo y escala 1.1.', color: 'dm-green', rotate: '-3deg' },
      { number: 3, text: 'Añade transition: all 0.3s cubic-bezier(rebote) al botón.', color: 'app-color-yellow400', rotate: '2deg' },
      { number: 4, text: 'Con JS, añade y elimina la clase .active en cada clic.', color: 'dm-blue', rotate: '-5deg' },
      { number: 5, text: 'Añade un @keyframes pulse para que lata al activarse.', color: 'dm-purple', rotate: '3deg' },
    ]
  },
  'estados-interfaz.astro': {
    title: 'Practica lo Aprendido',
    description: 'Construye un botón que implemente los 5 estados de forma visual y clara.',
    steps: [
      { number: 1, text: 'Crea tu botón base con color primario sólido.', color: 'dm-purple', rotate: '-2deg' },
      { number: 2, text: 'Diseña :hover con elevación (translateY y box-shadow).', color: 'dm-green', rotate: '4deg' },
      { number: 3, text: 'Diseña :active con transform: scale(0.96) y transición de 0.1s.', color: 'app-color-yellow400', rotate: '-4deg' },
      { number: 4, text: 'Diseña :focus-visible con un anillo de color visible.', color: 'dm-blue', rotate: '2deg' },
      { number: 5, text: 'Diseña :disabled con opacidad 0.5 y cursor: not-allowed.', color: 'dm-purple', rotate: '-3deg' },
    ]
  },
  'loading-states.astro': {
    title: 'Practica lo Aprendido',
    description: 'Implementa un botón que asuma el estado de carga al hacer clic con un spinner integrado.',
    steps: [
      { number: 1, text: 'Crea un botón con min-width fijo para que no colapse.', color: 'dm-purple', rotate: '3deg' },
      { number: 2, text: 'Añade un span .spinner oculto dentro del botón.', color: 'dm-green', rotate: '-3deg' },
      { number: 3, text: 'Anima el spinner con @keyframes y border-top de color blanco.', color: 'app-color-yellow400', rotate: '5deg' },
      { number: 4, text: 'Con JS, añade la clase .loading al clic y ocúltala tras 3s.', color: 'dm-blue', rotate: '-2deg' },
      { number: 5, text: 'En .loading, mueve el texto fuera con translateY y muestra el spinner.', color: 'dm-purple', rotate: '2deg' },
    ]
  },
  'success-error.astro': {
    title: 'Practica lo Aprendido',
    description: 'Crea un sistema de toast animado que diferencie visualmente éxito y error.',
    steps: [
      { number: 1, text: 'Crea una caja .toast oculta con opacity: 0.', color: 'dm-purple', rotate: '-4deg' },
      { number: 2, text: 'Defínele transition para que aparezca con scale y opacity.', color: 'dm-green', rotate: '2deg' },
      { number: 3, text: 'Crea modificadores .success y .error con border-left de color.', color: 'app-color-yellow400', rotate: '-2deg' },
      { number: 4, text: 'Con JS, añade la clase .show y el modificador según la acción.', color: 'dm-blue', rotate: '4deg' },
      { number: 5, text: 'Elimina la clase .show después de 2500ms con setTimeout.', color: 'dm-purple', rotate: '-3deg' },
    ]
  },
  'botones.astro': {
    title: 'Practica lo Aprendido',
    description: 'Crea un botón premium que combine transform, box-shadow y un ícono animado.',
    steps: [
      { number: 1, text: 'Diseña un botón con gradiente y border-radius de 12px.', color: 'dm-purple', rotate: '2deg' },
      { number: 2, text: 'En :hover, aplica translateY(-3px) y aumenta el box-shadow.', color: 'dm-green', rotate: '-4deg' },
      { number: 3, text: 'Agrega un ícono SVG de flecha con transition: transform.', color: 'app-color-yellow400', rotate: '3deg' },
      { number: 4, text: 'En :hover, mueve la flecha con translateX(4px).', color: 'dm-blue', rotate: '-2deg' },
      { number: 5, text: 'Añade :active que reduzca el shadow y baje el botón 1px.', color: 'dm-purple', rotate: '4deg' },
    ]
  },
  'cards.astro': {
    title: 'Practica lo Aprendido',
    description: 'Construye una card de producto con efecto hover de profundidad e imagen con zoom.',
    steps: [
      { number: 1, text: 'Crea un div contenedor con overflow: hidden y border-radius.', color: 'dm-purple', rotate: '-3deg' },
      { number: 2, text: 'Agrega una imagen con object-fit: cover y transition: transform.', color: 'dm-green', rotate: '2deg' },
      { number: 3, text: 'En :hover del contenedor, escala la imagen a scale(1.08).', color: 'app-color-yellow400', rotate: '-5deg' },
      { number: 4, text: 'Eleva toda la tarjeta con translateY(-8px) y box-shadow aumentado.', color: 'dm-blue', rotate: '3deg' },
      { number: 5, text: 'Revela un botón oculto que aparece desde abajo con translateY y opacity.', color: 'dm-purple', rotate: '-2deg' },
    ]
  },
  'modales-overlays.astro': {
    title: 'Practica lo Aprendido',
    description: 'Implementa un modal completo con overlay animado y caja que aparece con rebote.',
    steps: [
      { number: 1, text: 'Crea el .overlay con position: fixed, inset: 0 y opacity: 0.', color: 'dm-purple', rotate: '4deg' },
      { number: 2, text: 'Crea el .modal-box con transform: scale(0.9) translateY(20px).', color: 'dm-green', rotate: '-2deg' },
      { number: 3, text: 'Al añadir .active, el overlay pasa a opacity: 1 y visibility: visible.', color: 'app-color-yellow400', rotate: '3deg' },
      { number: 4, text: 'La .modal-box llega a scale(1) translateY(0) con un delay de 50ms.', color: 'dm-blue', rotate: '-4deg' },
      { number: 5, text: 'Cierra el modal al hacer clic en el overlay (fuera de la caja).', color: 'dm-purple', rotate: '2deg' },
    ]
  },
  'dropdowns-menus.astro': {
    title: 'Practica lo Aprendido',
    description: 'Crea un menú dropdown con transform-origin que parezca desplegarse naturalmente.',
    steps: [
      { number: 1, text: 'Crea el botón y el .menu con position: absolute abajo del botón.', color: 'dm-purple', rotate: '-3deg' },
      { number: 2, text: 'Pon el menú en opacity: 0 y visibility: hidden inicialmente.', color: 'dm-green', rotate: '4deg' },
      { number: 3, text: 'Añade transform-origin: top center y transform: scale(0.95).', color: 'app-color-yellow400', rotate: '-2deg' },
      { number: 4, text: 'En :hover del wrapper, lleva opacity a 1 y scale a 1.', color: 'dm-blue', rotate: '3deg' },
      { number: 5, text: 'Prueba cambiando transform-origin para ver el cambio de dirección.', color: 'dm-purple', rotate: '-4deg' },
    ]
  },
  'tooltips.astro': {
    title: 'Practica lo Aprendido',
    description: 'Construye un tooltip con flecha CSS puro que aparezca con delay intencional.',
    steps: [
      { number: 1, text: 'Crea el .tooltip-box con position: absolute sobre el elemento.', color: 'dm-purple', rotate: '2deg' },
      { number: 2, text: 'Ocúltalo con opacity: 0 y visibility: hidden.', color: 'dm-green', rotate: '-3deg' },
      { number: 3, text: 'Crea la flecha con ::after usando border-color truco CSS.', color: 'app-color-yellow400', rotate: '4deg' },
      { number: 4, text: 'En :hover, muéstralo con opacity: 1 y añade transition-delay: 0.4s.', color: 'dm-blue', rotate: '-2deg' },
      { number: 5, text: 'Experimenta: quita el delay y siente la diferencia visual.', color: 'dm-purple', rotate: '3deg' },
    ]
  },
  'feedback-formularios.astro': {
    title: 'Practica lo Aprendido',
    description: 'Implementa el patrón floating label con transición suave en tus inputs.',
    steps: [
      { number: 1, text: 'Crea el input con placeholder=" " (un espacio, no vacío).', color: 'dm-purple', rotate: '-4deg' },
      { number: 2, text: 'Coloca el label sobre el input con position: absolute.', color: 'dm-green', rotate: '2deg' },
      { number: 3, text: 'Usa :placeholder-shown para saber si el input está vacío.', color: 'app-color-yellow400', rotate: '-3deg' },
      { number: 4, text: 'En :focus y :not(:placeholder-shown), sube el label con scale y translateY.', color: 'dm-blue', rotate: '4deg' },
      { number: 5, text: 'Añade un borde inferior animado que crece desde el centro con width.', color: 'dm-purple', rotate: '-2deg' },
    ]
  },
  'sistemas-consistentes.astro': {
    title: 'Practica lo Aprendido',
    description: 'Crea tus propios Motion Tokens con CSS Variables y aplícalos a múltiples componentes.',
    steps: [
      { number: 1, text: 'Define --t-fast, --t-base y --ease-spring en :root.', color: 'dm-purple', rotate: '3deg' },
      { number: 2, text: 'Crea --hover-lift: translateY(-4px) como variable.', color: 'dm-green', rotate: '-2deg' },
      { number: 3, text: 'Aplica esas variables en transition de botones y tarjetas.', color: 'app-color-yellow400', rotate: '4deg' },
      { number: 4, text: 'Cambia solo el token y observa cómo todos heredan el cambio.', color: 'dm-blue', rotate: '-3deg' },
      { number: 5, text: 'Añade un token --active-press: scale(0.96) para los clics.', color: 'dm-purple', rotate: '2deg' },
    ]
  },
  'interacciones-combinadas.astro': {
    title: 'Practica lo Aprendido',
    description: 'Combina Keyframes, Transform y Transitions en una sola card orquestada.',
    steps: [
      { number: 1, text: 'Crea la card con un elemento de fondo (glow) oculto.', color: 'dm-purple', rotate: '-3deg' },
      { number: 2, text: 'En :hover, eleva la card con translateY y escala box-shadow.', color: 'dm-green', rotate: '4deg' },
      { number: 3, text: 'Activa el @keyframes pulso del glow solo en :hover.', color: 'app-color-yellow400', rotate: '-2deg' },
      { number: 4, text: 'Anima el ícono interior con un float independiente.', color: 'dm-blue', rotate: '3deg' },
      { number: 5, text: 'Asegúrate de que el ícono no use la misma propiedad transform que el contenedor.', color: 'dm-purple', rotate: '-4deg' },
    ]
  },
  'performance.astro': {
    title: 'Practica lo Aprendido',
    description: 'Identifica qué propiedades activan Reflow o Repaint y optimiza tus animaciones.',
    steps: [
      { number: 1, text: 'Crea dos versiones del mismo hover: una con width, otra con scaleX.', color: 'dm-purple', rotate: '2deg' },
      { number: 2, text: 'Abre Chrome DevTools > Rendering > activa Paint Flashing.', color: 'dm-green', rotate: '-4deg' },
      { number: 3, text: 'Pasa el ratón por ambos y observa cuál destella más (más costoso).', color: 'app-color-yellow400', rotate: '3deg' },
      { number: 4, text: 'Añade will-change: transform al elemento de scaleX y mide diferencia.', color: 'dm-blue', rotate: '-2deg' },
      { number: 5, text: 'Comprueba: ¿tiene sentido usar will-change en todos los elementos?', color: 'dm-purple', rotate: '4deg' },
    ]
  },
};

files.forEach(file => {
  const data = practiceData[file];
  if (!data) { console.log('No data for ' + file); return; }

  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');

  // Remove old practiceSteps const
  content = content.replace(/const practiceSteps = \[[\s\S]*?\];/g, '');

  // Build new practiceSteps
  const stepsJson = JSON.stringify(data.steps, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // unquote keys
    .replace(/"/g, "'"); // single quotes

  const newConst = `const practiceSteps = ${stepsJson};`;

  // Insert before closing ---
  content = content.replace(/---\n\n<InteractionsLayout/, `${newConst}\n---\n\n<InteractionsLayout`);

  // Fix <PracticeCards steps={practiceSteps} /> -> full with title and description
  content = content.replace(
    /<PracticeCards steps=\{practiceSteps\} \/>/g,
    `<PracticeCards\n      title="${data.title}"\n      description="${data.description}"\n      steps={practiceSteps}\n    />`
  );

  fs.writeFileSync(fp, content);
  console.log('Fixed: ' + file);
});

console.log('All done!');
