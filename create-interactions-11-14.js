const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/pages/interactions');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const template = (title, current, next, content, consejo, exampleTitle, html, css, errors, practice) => `---
import InteractionsLayout from '../../layouts/InteractionsLayout.astro';
import TabbedCodeBlock from '../../components/TabbedCodeBlock.astro';
import ResultPreview from '../../components/ResultPreview.astro';
import ConsejoProfesional from '../../components/ConsejoProfesional.astro';
import ErroresComunesV3 from '../../components/ErroresComunesV3.astro';
import PracticeCards from '../../components/PracticeCards.astro';

const codeFiles = [
  {
    name: "index.html",
    language: "html",
    icon: "html",
    content: \`${html}\`
  },
  {
    name: "styles.css",
    language: "css",
    icon: "css",
    content: \`${css}\`
  }
];

const practiceSteps = ${practice};
---

<InteractionsLayout
  title="${title} - Genesis Pixel"
  currentLesson="${current}"
  ${next ? `nextLesson={{ title: '${next.title}', href: '${next.href}' }}` : ''}
>
  <div class="mb-12">
    <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--dm-green-500)]/30 bg-[var(--dm-green-500)]/10 px-3 py-1 text-sm text-[var(--dm-green-500)]">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Interactions
    </div>
    <h1 class="font-afronaut text-4xl font-light text-[var(--color-text)] md:text-5xl lg:text-6xl">
      ${title}
    </h1>
    <p class="mt-4 text-xl text-[var(--dm-light-300)]">
      Descubre cómo dar vida a tus interfaces.
    </p>
  </div>

  <article class="prose prose-invert max-w-none">
    ${content}
  </article>

  <div class="my-8 not-prose">
    <ConsejoProfesional tip="${consejo}" />
  </div>

  <h3 class="mb-8 mt-12 text-center font-medium text-[var(--color-text)]">
    ${exampleTitle}
  </h3>

  <div class="mb-6 flex flex-col gap-6 lg:flex-row">
    <TabbedCodeBlock files={codeFiles} />
    <ResultPreview />
  </div>

  <div class="my-8 flex flex-col gap-6">
    <ErroresComunesV3 errors={${errors}} />
    <PracticeCards steps={practiceSteps} />
  </div>
</InteractionsLayout>

<script>
  import { initCodeInteractions } from '../../scripts/code-interactions';
  document.addEventListener('astro:page-load', () => {
    initCodeInteractions();
  });
</script>
`;

const lessons = [
  {
    file: 'feedback-formularios.astro',
    title: 'Feedback visual en formularios',
    current: '/interactions/feedback-formularios',
    next: { title: 'Sistemas consistentes', href: '/interactions/sistemas-consistentes' },
    content: `
      <h2>Los inputs son conversaciones</h2>
      <p>Llenar un formulario es la tarea más tediosa de la web. Para hacerla menos dolorosa, los inputs deben ser altamente interactivos. Deben responder cuando el usuario los enfoca (focus), reaccionar cuando escribe, y validar en tiempo real dando feedback de éxito o error.</p>
      <p>Una interacción moderna de formulario eleva el "placeholder" fuera del camino en lugar de borrarlo (el famoso patrón Floating Label), y cambia el borde/sombra usando transiciones suaves para guiar la atención del usuario.</p>
    `,
    consejo: 'Aprovecha las pseudo-clases :focus-within en el contenedor o :placeholder-shown en el input para desencadenar animaciones CSS puras sin necesidad de usar JavaScript para los estados básicos.',
    exampleTitle: 'Input moderno con Floating Label y Focus',
    html: `<div class="input-group">
  <input type="text" id="username" class="modern-input" placeholder=" ">
  <label for="username" class="floating-label">Nombre de usuario</label>
  <div class="focus-border"></div>
</div>`,
    css: `.input-group {
  position: relative;
  margin: 50px auto;
  max-width: 300px;
}

.modern-input {
  width: 100%;
  padding: 20px 12px 8px 12px;
  background: #1e293b;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: background 0.3s ease;
}

/* El label actúa como placeholder inicial */
.floating-label {
  position: absolute;
  top: 14px;
  left: 12px;
  color: #94a3b8;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.2, 0, 0, 1);
  transform-origin: left top;
}

/* Borde animado inferior */
.focus-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  transform: translateX(-50%);
}

/* INTERACCIONES */
.modern-input:focus {
  background: #0f172a;
}

.modern-input:focus ~ .focus-border {
  width: 100%;
}

/* Cuando el input tiene foco, o NO está vacío (placeholder-shown es falso) */
.modern-input:focus ~ .floating-label,
.modern-input:not(:placeholder-shown) ~ .floating-label {
  transform: translateY(-8px) scale(0.75);
  color: #3b82f6;
}`,
    errors: `[
      {
        title: "Perder el placeholder",
        description: "Borrar el placeholder nativo inmediatamente al enfocar. Si el usuario se distrae, olvida qué le estaban pidiendo. El label flotante resuelve esto."
      },
      {
        title: "Transiciones ruidosas en cada letra",
        description: "Validar e inyectar animaciones de error agitadas (shake) en tiempo real por cada pulsación de tecla asusta al usuario."
      }
    ]`,
    practice: `[
      {
        title: "Cambia el color de error",
        description: "Añade una clase .error al input y haz que el borde animado (.focus-border) y el .floating-label cambien a color rojo (#ef4444)."
      },
      {
        title: "Icono de validación",
        description: "Agrega un check verde al costado derecho del input que aparezca suavemente (opacity y scale) usando la pseudoclase :valid de HTML."
      }
    ]`
  },
  {
    file: 'sistemas-consistentes.astro',
    title: 'Sistemas consistentes',
    current: '/interactions/sistemas-consistentes',
    next: { title: 'Interacciones combinadas', href: '/interactions/interacciones-combinadas' },
    content: `
      <h2>Orquestación de la UI</h2>
      <p>Un producto se siente barato si un botón rebota con un <em>bounce</em> exagerado, pero el siguiente botón simplemente se desvanece de forma aburrida. La consistencia interactiva es tan importante como la consistencia en tu paleta de colores o tipografía.</p>
      <p>Un sistema de interacciones define <strong>Motion Tokens</strong> (Variables CSS). Defines tus curvas de animación globales, duraciones base, y escalas de hover para que cada componente hable el mismo lenguaje físico.</p>
    `,
    consejo: 'Crea 3 variables globales en el root: --duration-fast (150ms) para hovers, --duration-base (300ms) para modales/drowpdowns, y --ease-spring para rebotes orgánicos. Úsalas en todos tus componentes.',
    exampleTitle: 'Usando CSS Variables para Motion Consistente',
    html: `<div class="system-demo">
  <button class="sys-btn sys-primary">Botón A</button>
  <button class="sys-btn sys-secondary">Botón B</button>
  <div class="sys-card">Card que sigue las mismas reglas</div>
</div>`,
    css: `:root {
  /* Motion Tokens */
  --t-fast: 0.15s;
  --t-base: 0.3s;
  --ease-snappy: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --hover-lift: translateY(-4px);
  --active-press: scale(0.95);
}

.system-demo {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

/* Clases base que consumen los tokens */
.sys-btn, .sys-card {
  transition: transform var(--t-fast) var(--ease-snappy),
              box-shadow var(--t-base) var(--ease-smooth),
              background var(--t-fast) ease;
}

.sys-btn {
  padding: 12px 24px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; color: white;
}
.sys-primary { background: #3b82f6; }
.sys-secondary { background: #10b981; }

.sys-card {
  padding: 24px; background: #1e293b; border-radius: 12px; border: 1px solid #333; color: white; cursor: pointer;
}

/* Mismo comportamiento interactivo en distintos componentes */
.sys-btn:hover, .sys-card:hover {
  transform: var(--hover-lift);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.sys-btn:active, .sys-card:active {
  transform: var(--active-press);
}`,
    errors: `[
      {
        title: "Magic numbers por todas partes",
        description: "Escribir 'transition: all 0.2s ease' manualmente en 50 componentes distintos. Si mañana decides que la app sea más 'snappy', tendrás que cambiar 50 archivos."
      },
      {
        title: "Múltiples personalidades",
        description: "Mezclar curvas de Material Design (ease-in-out) con curvas elásticas de iOS en la misma interfaz."
      }
    ]`,
    practice: `[
      {
        title: "Cambia el Token",
        description: "Modifica --ease-snappy a un valor extremo como cubic-bezier(0.68, -0.55, 0.265, 1.55) en :root y observa cómo todos los componentes heredan este rebote exagerado a la vez."
      },
      {
        title: "Añade token de opacidad",
        description: "Crea un token --hover-opacity: 0.8; y aplícalo de manera consistente en los estados :active de los componentes."
      }
    ]`
  },
  {
    file: 'interacciones-combinadas.astro',
    title: 'Interacciones combinadas',
    current: '/interactions/interacciones-combinadas',
    next: { title: 'Performance', href: '/interactions/performance' },
    content: `
      <h2>La sinfonía del movimiento</h2>
      <p>Llegamos a la cumbre. Las interacciones de alta gama rara vez utilizan una sola propiedad. Combinan el <strong>Keyframes</strong> (para el movimiento autónomo infinito o de entrada compleja), <strong>Transform</strong> (para la física 2D/3D) y <strong>Transitions</strong> (para la respuesta del usuario).</p>
      <p>Una interacción combinada sucede, por ejemplo, cuando haces hover en una tarjeta: el contenedor se eleva (Transition en TranslateY), su sombra crece (Transition Opacity/BoxShadow), un icono interior comienza a latir (Keyframe) y el fondo interior gira sutilmente (Transform Rotate).</p>
    `,
    consejo: 'No transiciones la misma propiedad que un @keyframe está animando en el mismo elemento, porque causará conflicto. Si el keyframe anima "transform: rotate", usa la "transition" para el background o el boxShadow, o aplica el rotate en un contenedor hijo diferente.',
    exampleTitle: 'Card avanzada (Transform + Keyframes + Hover)',
    html: `<div class="magic-card">
  <div class="card-glow"></div>
  <div class="magic-icon">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 22h20L12 2z"/>
    </svg>
  </div>
  <h3>Interacción Total</h3>
</div>`,
    css: `.magic-card {
  position: relative;
  width: 250px;
  height: 280px;
  background: #0f172a;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease;
}

/* El resplandor oculto de fondo */
.card-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  background: #8b5cf6;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.magic-icon {
  z-index: 1;
  color: #8b5cf6;
  transition: transform 0.4s ease, color 0.4s ease;
}

.magic-card h3 {
  z-index: 1;
  color: white;
  margin-top: 20px;
}

/* HOVER INTERACTIONS */
.magic-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.5);
}

.magic-card:hover .card-glow {
  opacity: 0.4;
  /* Animación de keyframe se dispara solo en hover */
  animation: pulseGlow 2s infinite alternate ease-in-out;
}

.magic-card:hover .magic-icon {
  color: white;
  transform: translateY(-5px);
  /* Segunda animación de keyframe en el hijo */
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
    errors: `[
      {
        title: "Fatiga visual",
        description: "Combinar 6 animaciones diferentes en un botón. Escala, rota, cambia de color, pulsa, emite sombras... Termina pareciendo un anuncio pop-up de los 2000s."
      },
      {
        title: "Conflicto de Transforms",
        description: "Tener un :hover que hace 'transform: scale(1.1)' sobre un elemento que ya tenía un '@keyframes' ejecutando 'transform: translateY(10px)'. Una regla sobreescribirá a la otra bruscamente."
      }
    ]`,
    practice: `[
      {
        title: "Rotate en Hover",
        description: "Añade un giro sutil en el eje Z al hover de la card: transform: translateY(-10px) scale(1.02) rotateZ(2deg);"
      },
      {
        title: "Mejora el Float",
        description: "Haz que la animación 'float' del icono también rote levemente de izquierda a derecha (rotate(-5deg) a rotate(5deg)) mientras sube y baja."
      }
    ]`
  },
  {
    file: 'performance.astro',
    title: 'Performance en Interactions',
    current: '/interactions/performance',
    next: { title: 'Proyecto Final', href: '/interactions/proyecto-final' },
    content: `
      <h2>Interacciones a 60 FPS</h2>
      <p>Una gran interacción pierde todo su impacto si ocurre a trompicones (jank). Para garantizar que tus estados hover, delays y animaciones de entrada corran a 60 frames por segundo en móviles y ordenadores viejos, debes respetar las reglas de renderizado del navegador.</p>
      <p><strong>Solo debes animar Transforms y Opacity.</strong> Si en un hover cambias el "width" de un botón, el navegador tiene que recalcular la geometría de toda la página (Reflow). Si cambias el "background-color" (Repaint), es aceptable, pero no para áreas masivas. Si animas "transform" o "opacity", el navegador se lo entrega a la Tarjeta Gráfica (GPU) logrando máxima suavidad.</p>
    `,
    consejo: 'Para interacciones complejas que vayan a transformarse al hacer click o hover, puedes preparar a la GPU por adelantado añadiendo "will-change: transform;" al estado base del componente. Usa esto con mucha moderación, solo en componentes críticos.',
    exampleTitle: 'Comparativa: Animación CPU vs GPU',
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
    css: `.perf-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.perf-box {
  background: #334155;
  color: white;
  padding: 16px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  width: 250px;
}

/* --- MAL: CPU Reflow (Layout) --- */
.bad-box {
  transition: all 0.4s ease;
}

.bad-box:hover {
  /* ESTO ES TERRIBLE PARA EL RENDIMIENTO */
  width: 300px;
  margin-left: 20px;
  background: #ef4444;
}

/* --- BIEN: GPU Compositing --- */
.good-box {
  /* Optimizamos la GPU si sabemos que se va a mover mucho */
  will-change: transform, background-color;
  transition: transform 0.4s ease, background-color 0.4s ease;
}

.good-box:hover {
  /* PERFECTO PARA EL RENDIMIENTO */
  transform: translateX(20px) scaleX(1.2);
  background: #10b981;
}`,
    errors: `[
      {
        title: "Animar height: auto",
        description: "Es el clásico problema de los acordeones. CSS no puede interpolar desde 0px a auto. Usualmente se recurre a max-height (que sigue siendo Reflow) o Grid template-rows (mejor, pero aún layout)."
      },
      {
        title: "Abuso de will-change",
        description: "Poner 'will-change: all' en el body o en todos los botones para que vayan 'más rápido'. Esto agotará la memoria de la tarjeta gráfica y la página crasheará."
      }
    ]`,
    practice: `[
      {
        title: "Inspecciona el daño",
        description: "Abre las DevTools de tu navegador, ve a Rendering y activa 'Paint flashing'. Pasa el ratón por la caja mala y verás cómo toda la pantalla verdea repintándose."
      },
      {
        title: "El fix del acordeón",
        description: "Investiga cómo usar grid-template-rows: 0fr a 1fr para hacer dropdowns y acordeones con el mejor rendimiento nativo moderno posible."
      }
    ]`
  }
];

lessons.forEach(l => {
  const fileContent = template(l.title, l.current, l.next, l.content, l.consejo, l.exampleTitle, l.html, l.css, l.errors, l.practice);
  fs.writeFileSync(path.join(dir, l.file), fileContent);
});

console.log('Created lessons 11-14');
