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
${opts.css.replace(/\.interactive-card/g, '.interactive-card-p').replace(/\.open-modal-btn/g, '.open-modal-btn-p').replace(/\.overlay/g, '.overlay-p').replace(/\.modal-box/g, '.modal-box-p').replace(/\.dropdown-wrapper/g, '.dropdown-wrapper-p').replace(/\.dropdown-btn/g, '.dropdown-btn-p').replace(/\.dropdown-menu/g, '.dropdown-menu-p').replace(/\.tooltip-container/g, '.tooltip-container-p').replace(/\.tooltip-box/g, '.tooltip-box-p').replace(/\.icon-btn/g, '.icon-btn-p')}
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
    file: 'cards.astro',
    title: 'Cards interactivas',
    id: 'cards',
    current: '/interactions/cards',
    prev: { title: 'Botones interactivos', href: '/interactions/botones' },
    next: { title: 'Modales y overlays', href: '/interactions/modales-overlays' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 7',
    readingTime: 6,
    content: `<h3>Ventanas de contenido vivo</h3>
    <p>Las tarjetas (Cards) son los contenedores de contenido más populares en dashboards, e-commerce y blogs. Una card estática es aburrida; una card interactiva invita a explorarla. La interacción clásica consiste en levantar la card (con sombra y movimiento en el eje Y) para indicar "puedes hacerme clic".</p>
    <p>Pero podemos ir más allá: aplicar zoom sutil a la imagen interior, revelar un botón que estaba oculto, o mostrar texto secundario suavemente al pasar el cursor.</p>`,
    consejo: 'Para crear profundidad, aplica scale(1.05) sutil a la imagen de fondo mientras aplicas translateY(-8px) a la tarjeta. Este doble movimiento engaña al ojo creando un efecto 3D muy premium.',
    exampleTitle: 'Card interactiva con hover de profundidad e imagen',
    previewDesc: 'Pasa el cursor sobre la tarjeta para ver cómo se eleva, la imagen se acerca y aparece el botón.',
    html: `<div class="interactive-card">
  <div class="card-image-wrapper">
    <img src="https://images.unsplash.com/photo-1618005182384?w=400&h=250&fit=crop" alt="Abstract">
  </div>
  <div class="card-content">
    <span class="card-tag">Design</span>
    <h4>Construyendo con Motion</h4>
    <p>Aprende a transformar interfaces aburridas.</p>
    <a href="#" class="card-link">Leer artículo &rarr;</a>
  </div>
</div>`,
    previewHtml: `<div class="interactive-card-p" style="width:300px; background:#1e293b; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.05); cursor:pointer;">
  <div class="card-image-wrapper" style="height:160px; overflow:hidden;">
    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop" style="width:100%; height:100%; object-fit:cover;" alt="Abstract">
  </div>
  <div class="card-content" style="padding:24px;">
    <span class="card-tag" style="color:#a855f7; font-size:0.8rem; font-weight:700; text-transform:uppercase;">Design</span>
    <h4 style="margin:8px 0; color:#fff; font-size:1.25rem;">Construyendo con Motion</h4>
    <p style="color:#94a3b8; font-size:0.95rem; margin-bottom:0;">Aprende a transformar interfaces aburridas en memorables.</p>
    <a href="#" class="card-link" style="display:inline-block; margin-top:16px; color:#fff; text-decoration:none; font-weight:600;">Leer artículo &rarr;</a>
  </div>
</div>`,
    css: `.interactive-card {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease;
}

.interactive-card img {
  transition: transform 0.5s ease;
}

.interactive-card .card-link {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

/* INTERACCIONES HOVER */
.interactive-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.15);
}

.interactive-card:hover img {
  transform: scale(1.08);
}

.interactive-card:hover .card-link {
  opacity: 1;
  transform: translateX(0);
}`,
    errors: [
      { label: 'Demasiado movimiento', description: 'Hacer que la tarjeta se levante 30px causa un salto visual excesivo. Mantén el translate entre -4px y -10px máximo.' },
      { label: 'Cortar bordes redondeados', description: 'Si escalas una imagen sin poner overflow: hidden en el padre, la imagen sobresaldrá de las esquinas redondas.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Construye una card de producto con efecto hover de profundidad e imagen con zoom.',
    practiceSteps: [
      { number: 1, text: 'Crea un div contenedor con overflow: hidden y border-radius.', color: 'dm-purple', rotate: '-3deg' },
      { number: 2, text: 'Agrega una imagen con object-fit: cover y transition: transform.', color: 'dm-green', rotate: '2deg' },
      { number: 3, text: 'En :hover, escala la imagen a scale(1.08).', color: 'app-color-yellow400', rotate: '-5deg' },
      { number: 4, text: 'Eleva toda la tarjeta con translateY(-8px) y box-shadow aumentado.', color: 'dm-blue', rotate: '3deg' },
      { number: 5, text: 'Revela un botón oculto que aparece desde abajo con translateY y opacity.', color: 'dm-purple', rotate: '-2deg' },
    ]
  },
  {
    file: 'modales-overlays.astro',
    title: 'Modales y overlays',
    id: 'modales-overlays',
    current: '/interactions/modales-overlays',
    prev: { title: 'Cards interactivas', href: '/interactions/cards' },
    next: { title: 'Dropdowns y menús', href: '/interactions/dropdowns-menus' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 8',
    readingTime: 7,
    content: `<h3>Interrumpiendo con elegancia</h3>
    <p>Un modal es probablemente el componente más agresivo de la UI. Obliga al usuario a detener lo que está haciendo, oscurece la pantalla (overlay) y exige atención. Por tanto, su aparición debe ser <strong>suave e intencional</strong>.</p>
    <p>Aparecer instantáneamente genera ceguera e interrupción mental. Una entrada animada (por ejemplo, escalar desde un tamaño más pequeño y difuminarse) guía el ojo hacia el centro y avisa al cerebro que el contexto ha cambiado pero la pantalla detrás sigue ahí.</p>`,
    consejo: 'Anima siempre el fondo (overlay) con opacidad para oscurecer la pantalla, y el modal en sí usando "transform: scale" u "transform: translateY". Usa un transition-delay para que el modal aparezca justo después del fondo.',
    exampleTitle: 'Modal suave y natural',
    previewDesc: 'Haz clic en el botón para abrir el modal. Haz clic en la zona oscura o cancelar para cerrarlo.',
    html: `<button class="open-modal-btn">Abrir Modal</button>

<div class="overlay" id="demoOverlay">
  <div class="modal-box">
    <h3>Configuración</h3>
    <p>¿Seguro que deseas guardar estos cambios?</p>
    <div class="modal-actions">
      <button class="btn-cancel" id="closeBtn">Cancelar</button>
      <button class="btn-confirm">Guardar</button>
    </div>
  </div>
</div>`,
    previewHtml: `<button class="open-modal-btn-p" style="padding:10px 20px; border-radius:8px; border:none; cursor:pointer; font-weight:600; color:white; background:#3b82f6;">Abrir Modal</button>

<div class="overlay-p" id="demoOverlayP">
  <div class="modal-box-p">
    <h3 style="margin-top:0">Configuración</h3>
    <p>¿Seguro que deseas guardar estos cambios?</p>
    <div class="modal-actions" style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px;">
      <button class="btn-cancel-p" id="closeBtnP" style="padding:10px 20px; border-radius:8px; cursor:pointer; background:transparent; border:1px solid #444; color:white;">Cancelar</button>
      <button class="btn-confirm-p" style="padding:10px 20px; border-radius:8px; border:none; cursor:pointer; background:#3b82f6; color:white;">Guardar</button>
    </div>
  </div>
</div>`,
    css: `/* OVERLAY (Fondo oscuro) */
.overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  
  opacity: 0; visibility: hidden;
  transition: all 0.4s ease;
}

/* CAJA DEL MODAL */
.modal-box {
  background: #1e293b; padding: 32px; border-radius: 16px; width: 90%; max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); color: white;
  
  /* Estado oculto (escalado y bajado) */
  transform: scale(0.9) translateY(20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* ESTADO ACTIVO */
.overlay.active {
  opacity: 1; visibility: visible;
}

.overlay.active .modal-box {
  transform: scale(1) translateY(0);
  opacity: 1;
  /* Delay para que entre después del overlay */
  transition-delay: 0.05s;
}`,
    errors: [
      { label: 'Ignorar la accesibilidad', description: 'Crear modales impresionantes pero olvidar capturar el foco (Focus Trap). Un usuario con teclado podría tabular por links ocultos.' },
      { label: 'Display: none inmediato', description: 'En React/Vue, desmontar el modal del DOM antes de dejar que termine la animación de salida de CSS hace que desaparezca bruscamente.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Implementa un modal completo con overlay animado y caja que aparece con rebote.',
    practiceSteps: [
      { number: 1, text: 'Crea el .overlay con position: fixed, inset: 0 y opacity: 0.', color: 'dm-purple', rotate: '4deg' },
      { number: 2, text: 'Crea el .modal-box con transform: scale(0.9) translateY(20px).', color: 'dm-green', rotate: '-2deg' },
      { number: 3, text: 'Al añadir .active, el overlay pasa a opacity: 1 y visibility: visible.', color: 'app-color-yellow400', rotate: '3deg' },
      { number: 4, text: 'La .modal-box llega a scale(1) translateY(0) con delay de 50ms.', color: 'dm-blue', rotate: '-4deg' },
      { number: 5, text: 'Cierra el modal al hacer clic en el overlay (fuera de la caja).', color: 'dm-purple', rotate: '2deg' },
    ],
    scriptInit: `const openBtn = document.querySelector('.open-modal-btn-p');
    const closeBtn = document.getElementById('closeBtnP');
    const overlay = document.getElementById('demoOverlayP');
    if(openBtn && overlay && closeBtn) {
      openBtn.addEventListener('click', () => overlay.classList.add('active'));
      closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    }`
  },
  {
    file: 'dropdowns-menus.astro',
    title: 'Dropdowns y menús',
    id: 'dropdowns-menus',
    current: '/interactions/dropdowns-menus',
    prev: { title: 'Modales y overlays', href: '/interactions/modales-overlays' },
    next: { title: 'Tooltips y ayudas contextuales', href: '/interactions/tooltips' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 9',
    readingTime: 6,
    content: `<h3>Desplegables que se sienten mágicos</h3>
    <p>Un menú dropdown clásico, que aparece con "display: block" en hover, no se siente como algo del año actual. La interacción de abrir un menú debería sentirse como desenrollar un papel o revelar una caja: orgánica y direccional.</p>
    <p>Uno de los mejores trucos es usar el <strong>transform-origin</strong> para controlar desde dónde "crece" o "aparece" el menú. Si el botón está arriba a la derecha, el menú debe originarse desde la esquina superior derecha.</p>`,
    consejo: 'Para evitar el clásico problema donde el cursor se sale del botón un píxel y el menú colapsa (frustrante), usa un pequeño retraso en la salida (transition-delay) o crea un padding transparente invisible entre ambos.',
    exampleTitle: 'Dropdown con Transform Origin',
    previewDesc: 'Pasa el cursor sobre el botón para ver cómo el menú se despliega desde la esquina.',
    html: `<div class="dropdown-wrapper">
  <button class="dropdown-btn">
    Opciones 
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  <ul class="dropdown-menu">
    <li><a href="#">Perfil de usuario</a></li>
    <li><a href="#">Configuración</a></li>
    <li class="divider"></li>
    <li><a href="#" class="text-danger">Cerrar sesión</a></li>
  </ul>
</div>`,
    previewHtml: `<div class="dropdown-wrapper-p" style="position:relative; display:inline-block; margin-bottom: 120px;">
  <button class="dropdown-btn-p" style="display:flex; align-items:center; gap:8px; padding:10px 20px; background:#334155; color:white; border:1px solid #475569; border-radius:8px; cursor:pointer;">
    Opciones 
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  <ul class="dropdown-menu-p" style="position:absolute; top:calc(100% + 8px); left:0; min-width:200px; background:#1e293b; border:1px solid rgba(255,255,255,0.1); border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.5); list-style:none; padding:8px 0; margin:0;">
    <li><a href="#" style="display:block; padding:10px 20px; color:#cbd5e1; text-decoration:none; font-size:0.95rem;">Perfil de usuario</a></li>
    <li><a href="#" style="display:block; padding:10px 20px; color:#cbd5e1; text-decoration:none; font-size:0.95rem;">Configuración</a></li>
    <li style="height:1px; background:rgba(255,255,255,0.1); margin:8px 0;"></li>
    <li><a href="#" style="display:block; padding:10px 20px; color:#f87171; text-decoration:none; font-size:0.95rem;">Cerrar sesión</a></li>
  </ul>
</div>`,
    css: `.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.dropdown-btn svg { transition: transform 0.2s; }

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  
  /* ESTADO OCULTO */
  opacity: 0;
  visibility: hidden;
  /* Origen en la esquina superior izquierda */
  transform-origin: top left;
  transform: scale(0.95) translateY(-10px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* HOVER: Muestra el menú */
.dropdown-wrapper:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: scale(1) translateY(0);
}

.dropdown-wrapper:hover .dropdown-btn svg {
  transform: rotate(180deg);
}`,
    errors: [
      { label: 'Problema del salto (Hover gap)', description: 'Dejar demasiado espacio entre el botón y el menú, lo que hace que el hover se pierda a mitad de camino y desaparezca.' },
      { label: 'Animaciones súper complejas', description: 'Animar cada elemento de la lista cayendo en cascada puede ser bonito visualmente, pero si el menú se usa frecuentemente, irritará a los usuarios.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Crea un menú dropdown con transform-origin que parezca desplegarse naturalmente.',
    practiceSteps: [
      { number: 1, text: 'Crea el botón y el .menu con position: absolute abajo del botón.', color: 'dm-purple', rotate: '-3deg' },
      { number: 2, text: 'Pon el menú en opacity: 0 y visibility: hidden inicialmente.', color: 'dm-green', rotate: '4deg' },
      { number: 3, text: 'Añade transform-origin: top center y transform: scale(0.95).', color: 'app-color-yellow400', rotate: '-2deg' },
      { number: 4, text: 'En :hover del wrapper, lleva opacity a 1 y scale a 1.', color: 'dm-blue', rotate: '3deg' },
      { number: 5, text: 'Prueba cambiando transform-origin para ver el cambio de dirección.', color: 'dm-purple', rotate: '-4deg' },
    ]
  },
  {
    file: 'tooltips.astro',
    title: 'Tooltips y ayudas',
    id: 'tooltips',
    current: '/interactions/tooltips',
    prev: { title: 'Dropdowns y menús', href: '/interactions/dropdowns-menus' },
    next: { title: 'Feedback visual en formularios', href: '/interactions/feedback-formularios' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 10',
    readingTime: 5,
    content: `<h3>Micro-información on demand</h3>
    <p>Los tooltips son globos de información pequeños que aparecen al hacer hover o enfocar un elemento (especialmente botones con iconos). Son críticos para la usabilidad, ya que un icono no siempre es obvio para todos.</p>
    <p>La interacción debe ser extremadamente sutil y, algo muy importante: <strong>no debe ser inmediata</strong>. Si los tooltips aparecen instantáneamente, la pantalla parecerá un caos lleno de ruido mientras el usuario mueve el ratón.</p>`,
    consejo: 'Aplica un "transition-delay: 0.4s" en el estado :hover de tu tooltip. Así solo aparecerá si el usuario deja su cursor intencionalmente sobre el elemento.',
    exampleTitle: 'Tooltip con delay intencional',
    previewDesc: 'Mantén el ratón medio segundo sobre el botón para revelar el globo.',
    html: `<div class="tooltip-container">
  <button class="icon-btn">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  </button>
  
  <div class="tooltip-box">
    Información avanzada
  </div>
</div>`,
    previewHtml: `<div class="tooltip-container-p" style="position:relative; display:inline-block; margin-top:50px;">
  <button class="icon-btn-p" style="background:#334155; border:none; color:#94a3b8; padding:12px; border-radius:50%; cursor:pointer;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  </button>
  <div class="tooltip-box-p">
    Información avanzada
  </div>
</div>`,
    css: `.tooltip-container {
  position: relative; display: inline-block;
}

.tooltip-box {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: #0f172a; color: white;
  padding: 8px 12px; border-radius: 6px;
  font-size: 0.85rem; white-space: nowrap;
  pointer-events: none;
  
  /* ESTADO INICIAL */
  opacity: 0; visibility: hidden;
  transition: all 0.2s ease;
}

/* Flecha CSS puro */
.tooltip-box::after {
  content: ''; position: absolute;
  top: 100%; left: 50%; transform: translateX(-50%);
  border-width: 6px; border-style: solid;
  border-color: #0f172a transparent transparent transparent;
}

/* HOVER ACTIVO */
.tooltip-container:hover .tooltip-box {
  opacity: 1; visibility: visible;
  transform: translateX(-50%) translateY(0);
  /* Delay de 400ms al entrar */
  transition-delay: 0.4s;
}`,
    errors: [
      { label: 'Aparición instantánea', description: 'Si los tooltips aparecen inmediatamente en hover, mover el ratón causará flashes molestos de información en todas partes.' },
      { label: 'Problema en móviles', description: 'Diseñar tooltips esenciales sin pensar que en iOS/Android no existe el hover. Necesitas manejar clicks u ofrecer la info nativa.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Construye un tooltip con flecha CSS puro que aparezca con delay intencional.',
    practiceSteps: [
      { number: 1, text: 'Crea el .tooltip-box con position: absolute sobre el elemento.', color: 'dm-purple', rotate: '2deg' },
      { number: 2, text: 'Ocúltalo con opacity: 0 y visibility: hidden.', color: 'dm-green', rotate: '-3deg' },
      { number: 3, text: 'Crea la flecha con ::after usando border-color truco CSS.', color: 'app-color-yellow400', rotate: '4deg' },
      { number: 4, text: 'En :hover, muéstralo con opacity: 1 y añade transition-delay: 0.4s.', color: 'dm-blue', rotate: '-2deg' },
      { number: 5, text: 'Experimenta: quita el delay y siente la diferencia visual.', color: 'dm-purple', rotate: '3deg' },
    ]
  }
];

lessons.forEach(l => {
  fs.writeFileSync(path.join(dir, l.file), createTemplate(l));
});
console.log('Done rewriting 7-10');
