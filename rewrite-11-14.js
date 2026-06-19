const fs = require('fs');
const path = require('path');

const dir = 'src/pages/interactions';

function createTemplate(opts) {
  return `---
import InteractionsLayout from '../../layouts/InteractionsLayout.astro';
import ChapterHeader from '../../components/ChapterHeader.astro';
import TabbedCodeBlock from '../../components/TabbedCodeBlock.astro';
import ResultPreview from '../../components/ResultPreview.astro';
import ConsejoProfesional from '../../components/ConsejoProfesional.astro';
import ErroresComunesV3 from '../../components/ErroresComunesV3.astro';
import PracticeCards from '../../components/PracticeCards.astro';

const htmlCode = \`${opts.html}\`;

const cssCode = \`${opts.css}\`;

const practiceSteps = ${JSON.stringify(opts.practiceSteps, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'")};
---

<InteractionsLayout
  title="${opts.title} - Genesis Pixel"
  currentLesson="${opts.current}"
  ${opts.prev ? `prevLesson={{ title: '${opts.prev.title}', href: '${opts.prev.href}' }}` : ''}
  ${opts.next ? `nextLesson={{ title: '${opts.next.title}', href: '${opts.next.href}' }}` : ''}
>
  <ChapterHeader
    chapterNumber="${opts.chapterNumber}"
    chapterLabel="${opts.chapterLabel}"
    title="${opts.title}"
    readingTime={${opts.readingTime}}
    difficulty="Interactions"
  />

  <article class="prose prose-invert max-w-none" style="margin-top: 64px;">
    ${opts.content}
  </article>

  <div class="my-8 not-prose">
    <ConsejoProfesional tip="${opts.consejo}" />
  </div>

  <h3 class="mb-8 mt-12 text-center font-medium text-[var(--color-text)]">
    ${opts.exampleTitle}
  </h3>

  <div class="mb-6 flex flex-col gap-6 lg:flex-row">
    <TabbedCodeBlock
      group="${opts.id}"
      tabs={[
        { id: 'html', label: 'HTML', code: htmlCode },
        { id: 'css', label: 'CSS', code: cssCode },
      ]}
    />
    <ResultPreview description="${opts.previewDesc}">
      <div class="flex items-center justify-center h-full w-full">
        ${opts.previewHtml}
      </div>
    </ResultPreview>
  </div>

  <div class="my-8 flex flex-col gap-6">
    <ErroresComunesV3 errors={${JSON.stringify(opts.errors, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'")}} />

    <PracticeCards
      title="${opts.practiceTitle}"
      description="${opts.practiceDesc}"
      steps={practiceSteps}
    />
  </div>
</InteractionsLayout>

<style>
${opts.css.replace(/\.input-group/g, '.input-group-p').replace(/\.modern-input/g, '.modern-input-p').replace(/\.floating-label/g, '.floating-label-p').replace(/\.focus-border/g, '.focus-border-p').replace(/\.sys-btn/g, '.sys-btn-p').replace(/\.sys-card/g, '.sys-card-p').replace(/\.magic-card/g, '.magic-card-p').replace(/\.perf-box/g, '.perf-box-p').replace(/\.bad-box/g, '.bad-box-p').replace(/\.good-box/g, '.good-box-p')}
</style>

<script>
  import { initCodeInteractions } from '../../scripts/code-interactions.js';
  ${opts.script ? opts.script : ''}
  document.addEventListener('astro:page-load', () => {
    initCodeInteractions();
    ${opts.scriptInit ? opts.scriptInit : ''}
  });
  document.addEventListener('astro:after-swap', () => {
    initCodeInteractions();
    ${opts.scriptInit ? opts.scriptInit : ''}
  });
</script>`;
}

const lessons = [
  {
    file: 'feedback-formularios.astro',
    title: 'Feedback visual en formularios',
    id: 'feedback-formularios',
    current: '/interactions/feedback-formularios',
    prev: { title: 'Tooltips y ayudas contextuales', href: '/interactions/tooltips' },
    next: { title: 'Sistemas consistentes', href: '/interactions/sistemas-consistentes' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 11',
    readingTime: 6,
    content: `<h3>Los inputs son conversaciones</h3>
    <p>Llenar un formulario es la tarea más tediosa de la web. Para hacerla menos dolorosa, los inputs deben ser altamente interactivos. Deben responder cuando el usuario los enfoca (focus), reaccionar cuando escribe, y validar en tiempo real dando feedback de éxito o error.</p>
    <p>Una interacción moderna de formulario eleva el "placeholder" fuera del camino en lugar de borrarlo (el famoso patrón Floating Label), y cambia el borde/sombra usando transiciones suaves para guiar la atención del usuario.</p>`,
    consejo: 'Aprovecha las pseudo-clases :focus-within en el contenedor o :placeholder-shown en el input para desencadenar animaciones CSS puras sin necesidad de usar JavaScript para los estados básicos.',
    exampleTitle: 'Input moderno con Floating Label y Focus',
    previewDesc: 'Haz clic dentro del input y escribe para ver cómo el label interactúa y flota.',
    html: `<div class="input-group">
  <input type="text" id="username" class="modern-input" placeholder=" ">
  <label for="username" class="floating-label">Nombre de usuario</label>
  <div class="focus-border"></div>
</div>`,
    previewHtml: `<div class="input-group-p" style="position:relative; margin:auto; width:250px;">
  <input type="text" id="usernameP" class="modern-input-p" placeholder=" ">
  <label for="usernameP" class="floating-label-p">Nombre de usuario</label>
  <div class="focus-border-p"></div>
</div>`,
    css: `.modern-input {
  width: 100%; padding: 20px 12px 8px 12px;
  background: #1e293b; color: white;
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
  font-size: 1rem; outline: none;
  transition: background 0.3s ease;
}

/* El label actúa como placeholder inicial */
.floating-label {
  position: absolute; top: 14px; left: 12px;
  color: #94a3b8; font-size: 1rem;
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.2, 0, 0, 1);
  transform-origin: left top;
}

/* Borde animado inferior */
.focus-border {
  position: absolute; bottom: 0; left: 50%;
  width: 0; height: 2px;
  background: #3b82f6;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  transform: translateX(-50%);
}

/* INTERACCIONES */
.modern-input:focus { background: #0f172a; }

.modern-input:focus ~ .focus-border { width: 100%; }

/* Sube el label si hay foco o no está vacío */
.modern-input:focus ~ .floating-label,
.modern-input:not(:placeholder-shown) ~ .floating-label {
  transform: translateY(-8px) scale(0.75);
  color: #3b82f6;
}`,
    errors: [
      { label: 'Perder el placeholder', description: 'Borrar el placeholder nativo inmediatamente al enfocar. Si el usuario se distrae, olvida qué le estaban pidiendo.' },
      { label: 'Transiciones ruidosas en tiempo real', description: 'Inyectar animaciones de error agitadas (shake) por cada pulsación de tecla asusta al usuario.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Implementa el patrón floating label con transición suave en tus inputs.',
    practiceSteps: [
      { number: 1, text: 'Crea el input con placeholder=" " (un espacio, no vacío).', color: 'dm-purple', rotate: '-4deg' },
      { number: 2, text: 'Coloca el label sobre el input con position: absolute.', color: 'dm-green', rotate: '2deg' },
      { number: 3, text: 'Usa :placeholder-shown para saber si el input está vacío.', color: 'app-color-yellow400', rotate: '-3deg' },
      { number: 4, text: 'En :focus y :not(:placeholder-shown), sube el label con scale y translateY.', color: 'dm-blue', rotate: '4deg' },
      { number: 5, text: 'Añade un borde inferior animado que crece desde el centro.', color: 'dm-purple', rotate: '-2deg' },
    ]
  },
  {
    file: 'sistemas-consistentes.astro',
    title: 'Sistemas consistentes',
    id: 'sistemas-consistentes',
    current: '/interactions/sistemas-consistentes',
    prev: { title: 'Feedback visual en formularios', href: '/interactions/feedback-formularios' },
    next: { title: 'Interacciones combinadas', href: '/interactions/interacciones-combinadas' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 12',
    readingTime: 6,
    content: `<h3>Orquestación de la UI</h3>
    <p>Un producto se siente barato si un botón rebota con un <em>bounce</em> exagerado, pero el siguiente botón simplemente se desvanece de forma aburrida. La consistencia interactiva es tan importante como la consistencia en tu paleta de colores o tipografía.</p>
    <p>Un sistema de interacciones define <strong>Motion Tokens</strong> (Variables CSS). Defines tus curvas de animación globales, duraciones base, y escalas de hover para que cada componente hable el mismo lenguaje físico.</p>`,
    consejo: 'Crea variables globales en el root: --duration-fast (150ms) para hovers, --duration-base (300ms) para modales, y --ease-spring para rebotes orgánicos. Úsalas en todos tus componentes.',
    exampleTitle: 'Usando CSS Variables para Motion Consistente',
    previewDesc: 'Interactúa con ambos botones y la card. Nota que comparten el mismo estilo de movimiento y tiempo.',
    html: `<div class="system-demo">
  <button class="sys-btn sys-primary">Botón A</button>
  <button class="sys-btn sys-secondary">Botón B</button>
  <div class="sys-card">Mismas reglas físicas</div>
</div>`,
    previewHtml: `<div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap; justify-content:center;">
  <button class="sys-btn-p sys-primary" style="padding:12px 24px; border-radius:8px; border:none; font-weight:bold; cursor:pointer; color:white; background:#3b82f6;">Botón A</button>
  <button class="sys-btn-p sys-secondary" style="padding:12px 24px; border-radius:8px; border:none; font-weight:bold; cursor:pointer; color:white; background:#10b981;">Botón B</button>
  <div class="sys-card-p" style="padding:24px; background:#1e293b; border-radius:12px; border:1px solid #333; color:white; cursor:pointer;">Mismas reglas físicas</div>
</div>`,
    css: `:root {
  /* Motion Tokens */
  --t-fast: 0.15s;
  --ease-snappy: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --hover-lift: translateY(-4px);
  --active-press: scale(0.95);
}

/* Base consumes the tokens */
.sys-btn, .sys-card {
  transition: transform var(--t-fast) var(--ease-snappy),
              box-shadow var(--t-fast) ease;
}

/* HOVER y ACTIVE son iguales físicamente en todo el sistema */
.sys-btn:hover, .sys-card:hover {
  transform: var(--hover-lift);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.sys-btn:active, .sys-card:active {
  transform: var(--active-press);
}`,
    errors: [
      { label: 'Magic numbers por todos lados', description: 'Escribir transition: all 0.2s ease manualmente en 50 componentes. Si luego quieres algo más "snappy", cambiarás 50 archivos.' },
      { label: 'Múltiples personalidades', description: 'Mezclar curvas de Material Design con curvas elásticas de iOS en la misma interfaz.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Crea tus propios Motion Tokens con CSS Variables y aplícalos a múltiples componentes.',
    practiceSteps: [
      { number: 1, text: 'Define --t-fast, --t-base y --ease-spring en :root.', color: 'dm-purple', rotate: '3deg' },
      { number: 2, text: 'Crea --hover-lift: translateY(-4px) como variable.', color: 'dm-green', rotate: '-2deg' },
      { number: 3, text: 'Aplica esas variables en transition de botones y tarjetas.', color: 'app-color-yellow400', rotate: '4deg' },
      { number: 4, text: 'Cambia solo el token y observa cómo todos heredan el cambio.', color: 'dm-blue', rotate: '-3deg' },
      { number: 5, text: 'Añade un token --active-press: scale(0.96) para los clics.', color: 'dm-purple', rotate: '2deg' },
    ]
  },
  {
    file: 'interacciones-combinadas.astro',
    title: 'Interacciones combinadas',
    id: 'interacciones-combinadas',
    current: '/interactions/interacciones-combinadas',
    prev: { title: 'Sistemas consistentes', href: '/interactions/sistemas-consistentes' },
    next: { title: 'Performance', href: '/interactions/performance' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 13',
    readingTime: 8,
    content: `<h3>La sinfonía del movimiento</h3>
    <p>Llegamos a la cumbre. Las interacciones de alta gama rara vez utilizan una sola propiedad. Combinan el <strong>Keyframes</strong> (para el movimiento autónomo infinito o de entrada compleja), <strong>Transform</strong> (para la física 2D/3D) y <strong>Transitions</strong> (para la respuesta del usuario).</p>
    <p>Una interacción combinada sucede, por ejemplo, cuando haces hover en una tarjeta: el contenedor se eleva (Transition en TranslateY), su sombra crece (Transition Opacity/BoxShadow), un icono interior comienza a latir (Keyframe) y el fondo interior gira sutilmente (Transform Rotate).</p>`,
    consejo: 'No transiciones la misma propiedad que un @keyframe está animando en el mismo elemento, porque causará conflicto. Si el keyframe anima transform: rotate, usa transition para boxShadow.',
    exampleTitle: 'Card avanzada (Transform + Keyframes + Hover)',
    previewDesc: 'Pasa el cursor sobre la card. Observa la transición principal combinada con los 2 keyframes en el glow y el icono.',
    html: `<div class="magic-card">
  <div class="card-glow"></div>
  <div class="magic-icon">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 22h20L12 2z"/>
    </svg>
  </div>
  <h3>Interacción Total</h3>
</div>`,
    previewHtml: `<div class="magic-card-p" style="position:relative; width:200px; height:220px; background:#0f172a; border-radius:16px; border:1px solid rgba(255,255,255,0.1); display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; cursor:pointer;">
  <div class="card-glow" style="position:absolute; width:120px; height:120px; background:#8b5cf6; border-radius:50%; filter:blur(40px); opacity:0; transition:opacity 0.5s ease;"></div>
  <div class="magic-icon" style="z-index:1; color:#8b5cf6; transition:transform 0.4s ease, color 0.4s ease;">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 22h20L12 2z"/>
    </svg>
  </div>
  <h3 style="z-index:1; color:white; margin-top:20px;">Interacción Total</h3>
</div>`,
    css: `.magic-card {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease;
}

/* HOVER INTERACTIONS */
.magic-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.5);
}

.magic-card:hover .card-glow {
  opacity: 0.4;
  /* Keyframe 1: Glow animado al hacer hover */
  animation: pulseGlow 2s infinite alternate ease-in-out;
}

.magic-card:hover .magic-icon {
  color: white;
  transform: translateY(-5px);
  /* Keyframe 2: Icono flotando al hacer hover */
  animation: float 3s infinite ease-in-out;
}

/* KEYFRAMES */
@keyframes pulseGlow {
  0% { transform: scale(1); }
  100% { transform: scale(1.5); }
}

@keyframes float {
  0%, 100% { transform: translateY(-5px); }
  50% { transform: translateY(-15px); }
}`,
    errors: [
      { label: 'Fatiga visual', description: 'Combinar 6 animaciones diferentes en un botón que escala, rota, pulsa y emite sombras parece un anuncio pop-up.' },
      { label: 'Conflicto de Transforms', description: 'Tener un :hover con transform y un keyframe con transform en el mismo elemento sobreescribe las reglas bruscamente.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Combina Keyframes, Transform y Transitions en una sola card orquestada.',
    practiceSteps: [
      { number: 1, text: 'Crea la card con un elemento de fondo (glow) oculto.', color: 'dm-purple', rotate: '-3deg' },
      { number: 2, text: 'En :hover, eleva la card con translateY y escala box-shadow.', color: 'dm-green', rotate: '4deg' },
      { number: 3, text: 'Activa el @keyframes pulso del glow solo en :hover.', color: 'app-color-yellow400', rotate: '-2deg' },
      { number: 4, text: 'Anima el ícono interior con un float independiente.', color: 'dm-blue', rotate: '3deg' },
      { number: 5, text: 'Asegúrate de no mezclar transforms en el mismo nivel.', color: 'dm-purple', rotate: '-4deg' },
    ]
  },
  {
    file: 'performance.astro',
    title: 'Performance en Interactions',
    id: 'performance',
    current: '/interactions/performance',
    prev: { title: 'Interacciones combinadas', href: '/interactions/interacciones-combinadas' },
    next: { title: 'Proyecto Final', href: '/interactions/proyecto-final' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 14',
    readingTime: 6,
    content: `<h3>Interacciones a 60 FPS</h3>
    <p>Una gran interacción pierde todo su impacto si ocurre a trompicones (jank). Para garantizar que tus estados hover, delays y animaciones de entrada corran a 60 frames por segundo en móviles y ordenadores viejos, debes respetar las reglas de renderizado del navegador.</p>
    <p><strong>Solo debes animar Transforms y Opacity.</strong> Si en un hover cambias el "width" de un botón, el navegador tiene que recalcular la geometría de toda la página (Reflow). Si animas "transform" o "opacity", el navegador se lo entrega a la Tarjeta Gráfica (GPU) logrando máxima suavidad.</p>`,
    consejo: 'Para interacciones complejas, puedes preparar a la GPU por adelantado añadiendo "will-change: transform;" al estado base del componente. Usa esto con moderación.',
    exampleTitle: 'Comparativa: Animación CPU vs GPU',
    previewDesc: 'Haz hover en ambas cajas. La GPU es matemáticamente perfecta; la CPU hace reflow.',
    html: `<div class="perf-container">
  <!-- MAL: Anima layout properties -->
  <div class="perf-box bad-box">
    CPU (Width/Margin)
  </div>

  <!-- BIEN: Anima composite properties -->
  <div class="perf-box good-box">
    GPU (Transform)
  </div>
</div>`,
    previewHtml: `<div style="display:flex; flex-direction:column; gap:30px;">
  <div class="perf-box-p bad-box-p" style="background:#334155; color:white; padding:16px; border-radius:8px; width:200px; text-align:center;">CPU (Width/Margin)</div>
  <div class="perf-box-p good-box-p" style="background:#334155; color:white; padding:16px; border-radius:8px; width:200px; text-align:center;">GPU (Transform)</div>
</div>`,
    css: `/* --- MAL: CPU Reflow (Layout) --- */
.bad-box {
  transition: all 0.4s ease;
}

.bad-box:hover {
  /* TERRIBLE RENDIMIENTO */
  width: 250px;
  margin-left: 20px;
  background: #ef4444;
}

/* --- BIEN: GPU Compositing --- */
.good-box {
  will-change: transform, background-color;
  transition: transform 0.4s ease, background-color 0.4s ease;
}

.good-box:hover {
  /* PERFECTO RENDIMIENTO */
  transform: translateX(20px) scaleX(1.25);
  background: #10b981;
}`,
    errors: [
      { label: 'Animar height: auto', description: 'Es el clásico problema de los acordeones. CSS no puede interpolar a auto, lo que fuerza el uso de max-height (que sigue siendo Reflow).' },
      { label: 'Abuso de will-change', description: 'Poner will-change: all en todos los botones para que vayan más rápido agotará la memoria de la tarjeta gráfica.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Identifica qué propiedades activan Reflow o Repaint y optimiza tus animaciones.',
    practiceSteps: [
      { number: 1, text: 'Crea dos versiones del mismo hover: una con width, otra con scaleX.', color: 'dm-purple', rotate: '2deg' },
      { number: 2, text: 'Abre Chrome DevTools > Rendering > Paint Flashing.', color: 'dm-green', rotate: '-4deg' },
      { number: 3, text: 'Pasa el ratón y observa cuál destella más (costoso).', color: 'app-color-yellow400', rotate: '3deg' },
      { number: 4, text: 'Añade will-change: transform al scaleX y mide diferencia.', color: 'dm-blue', rotate: '-2deg' },
      { number: 5, text: 'Comprueba: ¿tiene sentido usar will-change en todo?', color: 'dm-purple', rotate: '4deg' },
    ]
  }
];

lessons.forEach(l => {
  fs.writeFileSync(path.join(dir, l.file), createTemplate(l));
});
console.log('Done rewriting 11-14');
