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
    file: 'botones.astro',
    title: 'Botones interactivos',
    current: '/interactions/botones',
    next: { title: 'Cards interactivas', href: '/interactions/cards' },
    content: `
      <h2>Los elementos más clickeados de la web</h2>
      <p>Un botón no es solo un rectángulo con texto. En diseño moderno, es un componente vivo que invita a la acción y responde a ella. Hemos visto estados aislados (hover, active, focus), ahora vamos a construir el botón perfecto combinando transformaciones, transiciones y un diseño premium.</p>
      <p>Un buen botón debe tener peso visual en reposo, sentirse ligero y clicable al pasar el cursor (hover = profundidad, resplandor) y sentirse pesado/físico al ser presionado (active = hundimiento).</p>
    `,
    consejo: 'Evita animar el padding o margin del botón en hover. Esto causará un recálculo (reflow) costoso. Usa "transform: translateY()" o "transform: scale()" para cambiar su tamaño aparente o posición sin romper el layout.',
    exampleTitle: 'Botón Premium con Transform y Box Shadow',
    html: `<button class="premium-btn">
  Comenzar Aventura
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
</button>`,
    css: `.premium-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  
  /* Sombra base suave */
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  
  /* Transición fluida para transform y shadow */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.premium-btn svg {
  transition: transform 0.3s ease;
}

/* Hover: El botón se levanta y la flecha se mueve */
.premium-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(59, 130, 246, 0.5);
}

.premium-btn:hover svg {
  transform: translateX(4px);
}

/* Active: Sensación de pulsación física */
.premium-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(59, 130, 246, 0.4);
  /* Reduce la duración para una respuesta más rápida */
  transition-duration: 0.1s;
}`,
    errors: `[
      {
        title: "Botones fantasma sin contraste",
        description: "Crear botones 'outline' o transparentes que apenas cambian de color en hover, haciendo dudar al usuario de si están habilitados."
      },
      {
        title: "Animar 'width' o 'height'",
        description: "Cambiar el ancho o alto real del botón empujará el contenido a su alrededor, creando un diseño ruidoso."
      }
    ]`,
    practice: `[
      {
        title: "Efecto resplandor",
        description: "Añade un '::before' absoluto al botón con un gradiente. Anima la opacidad de este pseudo-elemento en el hover para crear un resplandor superior."
      },
      {
        title: "Mejora el active",
        description: "Cambia el transform: translateY(1px) por un transform: scale(0.96) para que todo el botón se encoja ligeramente, como un resorte."
      }
    ]`
  },
  {
    file: 'cards.astro',
    title: 'Cards interactivas',
    current: '/interactions/cards',
    next: { title: 'Modales y overlays', href: '/interactions/modales-overlays' },
    content: `
      <h2>Ventanas de contenido vivo</h2>
      <p>Las tarjetas (Cards) son los contenedores de contenido más populares en dashboards, e-commerce y blogs. Una card estática es aburrida; una card interactiva invita a explorarla. La interacción clásica consiste en levantar la card (con sombra y movimiento en el eje Y) para indicar "puedes hacerme clic".</p>
      <p>Pero podemos ir más allá: aplicar zoom sutil a la imagen interior, revelar un botón que estaba oculto, o mostrar texto secundario suavemente al pasar el cursor.</p>
    `,
    consejo: 'Para crear profundidad (3D real), puedes usar la propiedad CSS "perspective" en un contenedor padre y aplicar una pequeñísima rotación (rotateX/rotateY) en hover basándote en la posición del ratón. Le dará una calidad Apple-like impresionante.',
    exampleTitle: 'Card interactiva con hover de profundidad e imagen',
    html: `<div class="interactive-card">
  <div class="card-image-wrapper">
    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&h=250&fit=crop" alt="Abstract">
  </div>
  <div class="card-content">
    <span class="card-tag">Design</span>
    <h4>Construyendo con Motion</h4>
    <p>Aprende a transformar interfaces aburridas en experiencias memorables.</p>
    <a href="#" class="card-link">Leer artículo &rarr;</a>
  </div>
</div>`,
    css: `.interactive-card {
  width: 320px;
  background: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  
  /* Estado base de la sombra y posición */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease;
}

.card-image-wrapper {
  height: 180px;
  overflow: hidden;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-content {
  padding: 24px;
}

.card-tag {
  color: #a855f7;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-content h4 {
  margin: 8px 0;
  color: #fff;
  font-size: 1.25rem;
}

.card-content p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-bottom: 0;
}

.card-link {
  display: inline-block;
  margin-top: 16px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

/* --- INTERACCIONES HOVER --- */
.interactive-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.15);
}

.interactive-card:hover .card-image-wrapper img {
  transform: scale(1.08);
}

.interactive-card:hover .card-link {
  opacity: 1;
  transform: translateX(0);
}`,
    errors: `[
      {
        title: "Demasiado movimiento",
        description: "Hacer que la tarjeta se levante 30px, causando un salto visual excesivo. Mantén el translate entre -4px y -10px máximo."
      },
      {
        title: "Cortar bordes redondeados",
        description: "Si escalas una imagen dentro de la tarjeta y olvidas poner overflow: hidden en el contenedor padre, la imagen sobresaldrá de las esquinas redondas."
      }
    ]`,
    practice: `[
      {
        title: "Cambia la curva",
        description: "El contenedor tiene un rebote leve usando cubic-bezier. Cambia a un ease-out prolongado y nota la diferencia."
      },
      {
        title: "Oculta el texto",
        description: "Haz que el texto del párrafo (<p>) también esté oculto y aparezca solo cuando hagas hover sobre la card, igual que el enlace."
      }
    ]`
  },
  {
    file: 'modales-overlays.astro',
    title: 'Modales y overlays',
    current: '/interactions/modales-overlays',
    next: { title: 'Dropdowns y menús', href: '/interactions/dropdowns-menus' },
    content: `
      <h2>Interrumpiendo con elegancia</h2>
      <p>Un modal es probablemente el componente más agresivo de la UI. Obliga al usuario a detener lo que está haciendo, oscurece la pantalla (overlay) y exige atención. Por tanto, su aparición debe ser <strong>suave e intencional</strong>.</p>
      <p>Aparecer instantáneamente genera ceguera e interrupción mental. Una entrada animada (por ejemplo, escalar desde un tamaño más pequeño y difuminarse) guía el ojo hacia el centro y avisa al cerebro que el contexto ha cambiado pero la pantalla detrás sigue ahí.</p>
    `,
    consejo: 'Anima siempre el fondo (overlay) con opacidad para oscurecer la pantalla, y el modal en sí usando "transform: scale" u "transform: translateY". Las salidas (cuando se cierra) deben ser un 30% más rápidas que las entradas.',
    exampleTitle: 'Modal suave y natural',
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
</div>

<script>
  const openBtn = document.querySelector('.open-modal-btn');
  const closeBtn = document.getElementById('closeBtn');
  const overlay = document.getElementById('demoOverlay');

  openBtn.addEventListener('click', () => {
    overlay.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });
  
  // Cerrar al hacer clic fuera
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
</script>`,
    css: `.open-modal-btn, .btn-confirm, .btn-cancel {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: white;
}
.open-modal-btn, .btn-confirm { background: #3b82f6; }
.btn-cancel { background: transparent; border: 1px solid #444; }

/* OVERLAY (Fondo oscuro) */
.overlay {
  position: fixed;
  inset: 0; /* top: 0, left: 0, right: 0, bottom: 0 */
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  /* Estado oculto */
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}

/* CAJA DEL MODAL */
.modal-box {
  background: #1e293b;
  padding: 32px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  
  /* Estado oculto (escalado hacia abajo y empujado) */
  transform: scale(0.9) translateY(20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

/* --- ESTADO ACTIVO --- */
.overlay.active {
  opacity: 1;
  visibility: visible;
}

.overlay.active .modal-box {
  transform: scale(1) translateY(0);
  opacity: 1;
  /* Añadimos un pequeño delay para que entre después del overlay */
  transition-delay: 0.05s;
}`,
    errors: `[
      {
        title: "Ignorar la accesibilidad",
        description: "Crear modales impresionantes pero olvidar capturar el foco (Focus Trap). Un usuario con teclado podría tabular por los links ocultos bajo el modal."
      },
      {
        title: "Display: none inmediato",
        description: "En React/Vue, desmontar el modal del DOM antes de dejar que termine la animación de salida de CSS, haciéndolo desaparecer bruscamente."
      }
    ]`,
    practice: `[
      {
        title: "Drop from top",
        description: "Cambia la animación del modal. En lugar de venir de abajo (.modal-box transform: scale(0.9) translateY(20px)), haz que caiga desde arriba de la pantalla (translateY(-100px))."
      },
      {
        title: "Efecto de desenfoque",
        description: "Aumenta el backdrop-filter: blur() a 10px en el overlay activo para ver cómo el fondo se difumina y concentra más la atención."
      }
    ]`
  },
  {
    file: 'dropdowns-menus.astro',
    title: 'Dropdowns y menús',
    current: '/interactions/dropdowns-menus',
    next: { title: 'Tooltips y ayudas contextuales', href: '/interactions/tooltips' },
    content: `
      <h2>Desplegables que se sienten mágicos</h2>
      <p>Un menú dropdown clásico, que aparece con "display: block" en hover, no se siente como algo del año actual. La interacción de abrir un menú debería sentirse como desenrollar un papel o revelar una caja: orgánica y direccional.</p>
      <p>Uno de los mejores trucos es usar el <strong>transform-origin</strong> para controlar desde dónde "crece" o "aparece" el menú. Si el botón está arriba a la derecha, el menú debe originarse desde la esquina superior derecha.</p>
    `,
    consejo: 'Para evitar el clásico problema donde el cursor se sale del botón un píxel y el menú colapsa (frustrante), usa un pequeño retraso en la salida (transition-delay) o crea un padding transparente invisible entre el botón y el menú para que el hover no se rompa.',
    exampleTitle: 'Dropdown con Transform Origin',
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
    <li><a href="#">Facturación</a></li>
    <li class="divider"></li>
    <li><a href="#" class="text-danger">Cerrar sesión</a></li>
  </ul>
</div>`,
    css: `.dropdown-wrapper {
  position: relative;
  display: inline-block;
  /* Centrado visual en la pantalla de preview */
  margin: 50px; 
}

.dropdown-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #334155;
  color: white;
  border: 1px solid #475569;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px); /* 8px de separación */
  left: 0;
  min-width: 200px;
  background: #1e293b;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  list-style: none;
  padding: 8px 0;
  margin: 0;
  
  /* ESTADO OCULTO */
  opacity: 0;
  visibility: hidden;
  /* Origen de la animación en la esquina superior izquierda */
  transform-origin: top left;
  transform: scale(0.95) translateY(-10px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-menu li a {
  display: block;
  padding: 10px 20px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s, color 0.2s;
}

.dropdown-menu li a:hover {
  background: #334155;
  color: white;
}

.divider {
  height: 1px;
  background: rgba(255,255,255,0.1);
  margin: 8px 0;
}

.text-danger { color: #f87171 !important; }

/* HOVER: Muestra el menú */
.dropdown-wrapper:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: scale(1) translateY(0);
}

.dropdown-wrapper:hover .dropdown-btn svg {
  transform: rotate(180deg);
}`,
    errors: `[
      {
        title: "Problema del salto (Hover gap)",
        description: "Dejar demasiado espacio entre el botón y el menú, lo que hace que el hover se pierda a mitad de camino y el menú desaparezca inesperadamente."
      },
      {
        title: "Animaciones súper complejas",
        description: "Animar cada elemento de la lista cayendo en cascada. Es bonito visualmente, pero si el menú se usa frecuentemente, una cascada lenta irritará a los usuarios."
      }
    ]`,
    practice: `[
      {
        title: "Menú tolerante",
        description: "Añade transition-delay: 0.3s a .dropdown-menu (no al hover). Esto hará que al quitar el cursor, el menú tarde 300ms en desaparecer, permitiendo errores de ratón."
      },
      {
        title: "Cambia el origen",
        description: "Modifica transform-origin: top left a top center, y observa cómo la animación cambia la forma en que se expande el menú."
      }
    ]`
  },
  {
    file: 'tooltips.astro',
    title: 'Tooltips y ayudas contextuales',
    current: '/interactions/tooltips',
    next: { title: 'Feedback visual en formularios', href: '/interactions/feedback-formularios' },
    content: `
      <h2>Micro-información on demand</h2>
      <p>Los tooltips son globos de información pequeños que aparecen al hacer hover o enfocar un elemento (especialmente botones con iconos). Son críticos para la usabilidad, ya que un icono no siempre es obvio para todos.</p>
      <p>La interacción debe ser extremadamente sutil y, algo muy importante: <strong>no debe ser inmediata</strong>. Si los tooltips aparecen instantáneamente, la pantalla parecerá un caos lleno de ruido mientras el usuario mueve el ratón. Un pequeño delay de entrada limpia la interfaz.</p>
    `,
    consejo: 'Aplica un "transition-delay: 0.4s" en el estado :hover de tu tooltip. Así solo aparecerá si el usuario deja su cursor intencionalmente sobre el elemento.',
    exampleTitle: 'Tooltip con delay intencional y flecha CSS',
    html: `<div class="tooltip-container">
  <button class="icon-btn">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  </button>
  
  <div class="tooltip-box">
    Información sobre este sistema avanzado.
  </div>
</div>`,
    css: `.tooltip-container {
  position: relative;
  display: inline-block;
  margin: 50px;
}

.icon-btn {
  background: #334155;
  border: none;
  color: #94a3b8;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: #475569;
  color: white;
}

/* LA CAJA DEL TOOLTIP */
.tooltip-box {
  position: absolute;
  bottom: calc(100% + 12px); /* Por encima del botón */
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: #0f172a;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  pointer-events: none; /* Evita parpadeos */
  
  /* ESTADO INICIAL */
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  /* Al salir, sin delay */
}

/* La flecha inferior hecha con CSS border */
.tooltip-box::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #0f172a transparent transparent transparent;
}

/* HOVER ACTIVO */
.tooltip-container:hover .tooltip-box {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  /* Entra con 400ms de delay para evitar ruido visual */
  transition-delay: 0.4s;
}`,
    errors: `[
      {
        title: "Aparición instantánea",
        description: "Hacer que todos los tooltips aparezcan inmediatamente en hover. Mover el ratón por la página causará flashes molestos de información en todas partes."
      },
      {
        title: "Problema en móviles",
        description: "Diseñar tooltips esenciales sin pensar que en iOS/Android no existe el 'hover'. Necesitas manejar clicks u ofrecer la información de forma nativa en pantallas pequeñas."
      }
    ]`,
    practice: `[
      {
        title: "Quita el delay",
        description: "Quita o pon en 0s el transition-delay de entrada para ver cuán agresiva se siente la aparición inmediata."
      },
      {
        title: "Tooltip Inferior",
        description: "Modifica el CSS (top en vez de bottom) y los bordes de la flecha para que el tooltip aparezca por debajo del botón en lugar de por encima."
      }
    ]`
  }
];

lessons.forEach(l => {
  const fileContent = template(l.title, l.current, l.next, l.content, l.consejo, l.exampleTitle, l.html, l.css, l.errors, l.practice);
  fs.writeFileSync(path.join(dir, l.file), fileContent);
});

console.log('Created lessons 6-10');
