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
    file: 'que-son.astro',
    title: '¿Qué son las Interactions?',
    current: '/interactions/que-son',
    next: { title: 'Microinteracciones', href: '/interactions/microinteracciones' },
    content: `
      <h2>De lo estático a lo vivo</h2>
      <p>Hasta ahora, hemos visto cómo las animaciones (Keyframes) y las transformaciones (Transform) nos permiten mover y alterar elementos. También vimos cómo las transiciones (Transitions) suavizan el paso de un estado a otro. Las <strong>Interactions</strong> (Interacciones) son el siguiente nivel: se trata de cómo nuestra interfaz responde directamente a las acciones del usuario.</p>
      <p>Una interacción ocurre cuando el usuario hace algo (hover, click, focus) y la interfaz le responde con feedback visual inmediato. Esto no es solo estético, es una pieza clave en la <strong>UX (Experiencia de Usuario) moderna</strong>. Si un botón no cambia cuando pasas el cursor, el usuario duda si puede hacer clic.</p>
      <h3>Diferencia entre animaciones aisladas y UI</h3>
      <p>Una animación aislada es un elemento que se mueve solo en la pantalla (como un loader que da vueltas). El comportamiento de la UI (interacciones) depende del usuario. Aquí no controlamos <em>cuándo</em> ocurre, pero sí controlamos <em>cómo</em> reacciona la interfaz.</p>
    `,
    consejo: 'Piensa en las interacciones como una conversación. Si el usuario "habla" haciendo clic o pasando el cursor, la interfaz debe "responder" visualmente de manera clara y rápida, ni muy lenta (aburrido) ni muy abrupta (agresivo).',
    exampleTitle: 'Ejemplo de interacción básica vs ausente',
    html: `<!-- Sin interacción -->
<button class="btn-bad">Click me</button>

<!-- Con interacción clara -->
<button class="btn-good">Interact with me</button>`,
    css: `.btn-bad {
  padding: 12px 24px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  /* Ningún feedback visual */
}

.btn-good {
  padding: 12px 24px;
  background: #6d28d9;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Feedback visual al pasar el cursor */
.btn-good:hover {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
}

/* Feedback visual al presionar */
.btn-good:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(124, 58, 237, 0.4);
}`,
    errors: `[
      {
        title: "Cero feedback visual",
        description: "Crear elementos interactivos como botones o enlaces sin cambiar su estado en hover o active, haciendo dudar al usuario si el elemento es clickable."
      },
      {
        title: "Reacciones exageradas",
        description: "Mover o escalar tanto un botón que el cursor se salga de él accidentalmente, arruinando la usabilidad."
      }
    ]`,
    practice: `[
      {
        title: "Añade un estado :active",
        description: "En el .btn-bad, intenta darle un pequeño cambio visual cuando el usuario haga clic usando la pseudo-clase :active, por ejemplo reduciendo su escala."
      },
      {
        title: "Suaviza el cambio",
        description: "Recuerda el capítulo anterior: añade una transition al .btn-bad para que el cambio no sea instantáneo."
      }
    ]`
  },
  {
    file: 'microinteracciones.astro',
    title: 'Microinteracciones',
    current: '/interactions/microinteracciones',
    next: { title: 'Estados de la interfaz', href: '/interactions/estados-interfaz' },
    content: `
      <h2>Los pequeños detalles importan</h2>
      <p>Las <strong>microinteracciones</strong> son eventos sutiles que cumplen una única tarea dentro de la interfaz. Su objetivo principal es dar feedback inmediato, comunicar el resultado de una acción y mejorar el sentimiento de manipulación directa.</p>
      <p>Piénsalo así: el <em>"Like"</em> de Twitter es una microinteracción. Cuando haces clic, no solo cambia el color a rojo, sino que explota con confeti y hace un pequeño rebote. Esto genera una respuesta emocional positiva en el usuario.</p>
      <h3>Cómo mejoran la experiencia</h3>
      <ul>
        <li><strong>Informan el estado:</strong> "Sí, tu configuración se guardó".</li>
        <li><strong>Previenen errores:</strong> Una animación de sacudida (shake) al fallar una contraseña.</li>
        <li><strong>Añaden deleite:</strong> Hacen que la app no parezca robótica, sino humana y premium.</li>
      </ul>
    `,
    consejo: 'Usa las microinteracciones como "recompensa". Un botón de "Añadir al carrito" que muestra un pequeño tick de confirmación genera mucha más confianza que un simple texto que cambia.',
    exampleTitle: 'Microinteracción de un botón de Like (Favorito)',
    html: `<button class="like-btn" id="likeBtn">
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
</button>

<script>
  const btn = document.getElementById('likeBtn');
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
  });
</script>`,
    css: `.like-btn {
  background: transparent;
  border: 2px solid #555;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.like-btn svg {
  fill: transparent;
  stroke: #555;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.like-btn:hover {
  border-color: #ff2d55;
}

.like-btn:hover svg {
  stroke: #ff2d55;
}

/* Estado activo: Animación de microinteracción */
.like-btn.active {
  border-color: #ff2d55;
  background: rgba(255, 45, 85, 0.1);
  transform: scale(1.1);
}

.like-btn.active svg {
  fill: #ff2d55;
  stroke: #ff2d55;
  transform: scale(1.2);
}`,
    errors: `[
      {
        title: "Hacerlas demasiado lentas",
        description: "Una microinteracción debe durar idealmente entre 200ms y 400ms. Si es muy larga, frustrará al usuario al retrasar su flujo."
      },
      {
        title: "Sobreuso",
        description: "Añadir confeti y rebotes a cada pequeño botón de la pantalla. Resérvalas para acciones significativas (Likes, Checkouts, Éxitos)."
      }
    ]`,
    practice: `[
      {
        title: "Modifica el rebote",
        description: "Cambia la curva cubic-bezier en transition para hacer que el botón rebote de forma más dramática al hacer hover o clic."
      },
      {
        title: "Agrega Keyframes",
        description: "Combínalo con una animación @keyframes que haga latir (pulse) el corazón infinitamente una vez que está en estado .active."
      }
    ]`
  },
  {
    file: 'estados-interfaz.astro',
    title: 'Estados de la interfaz',
    current: '/interactions/estados-interfaz',
    next: { title: 'Loading States', href: '/interactions/loading-states' },
    content: `
      <h2>Los 5 pilares interactivos</h2>
      <p>Para construir componentes consistentes, siempre debes considerar cómo se ven y cómo transicionan entre sus estados básicos. Un elemento interactivo en la web no existe de una sola forma.</p>
      <ul>
        <li><strong>Default:</strong> El estado base, en reposo.</li>
        <li><strong>Hover:</strong> Cuando el cursor está sobre él (descubrimiento).</li>
        <li><strong>Active:</strong> El instante en que el usuario hace clic o lo presiona.</li>
        <li><strong>Focus:</strong> Cuando el usuario navega con el teclado y llega al elemento (accesibilidad crucial).</li>
        <li><strong>Disabled:</strong> Cuando la acción no está disponible, visualmente apagado.</li>
      </ul>
      <p>Diseñar todos estos estados y la <em>transición visual</em> entre ellos es lo que diferencia a una plantilla básica de un producto digital premium.</p>
    `,
    consejo: 'El estado :focus es el más olvidado pero el más importante para la accesibilidad. Nunca uses "outline: none;" sin proporcionar un estilo alternativo evidente para los usuarios que navegan por teclado.',
    exampleTitle: 'Implementando todos los estados de un botón',
    html: `<button class="state-btn">Estado Normal</button>
<button class="state-btn" disabled>Estado Disabled</button>`,
    css: `.state-btn {
  padding: 12px 28px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* HOVER: Indicar que es clickeable */
.state-btn:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
}

/* ACTIVE: Respuesta física al presionar */
.state-btn:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 5px 5px -3px rgba(37, 99, 235, 0.4);
}

/* FOCUS: Accesibilidad para teclado */
.state-btn:focus-visible {
  outline: none;
  border-color: #93c5fd;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3);
}

/* DISABLED: Sin interacción permitida */
.state-btn:disabled {
  background: #475569;
  color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.7;
}`,
    errors: `[
      {
        title: "Ignorar el estado Focus",
        description: "Quitar el anillo de focus nativo sin reemplazarlo. Esto hace que sea imposible para alguien sin ratón saber en qué botón están parados."
      },
      {
        title: "Efectos en elementos disabled",
        description: "Olvidar añadir :not(:disabled) a tus reglas de hover/active, provocando que un botón deshabilitado se mueva o parezca clickeable."
      }
    ]`,
    practice: `[
      {
        title: "Comprueba el Focus",
        description: "Haz clic en la ventana de preview de la derecha y pulsa la tecla TAB para ver cómo funciona el estado :focus-visible que acabamos de crear."
      },
      {
        title: "Diseña un nuevo estado",
        description: "Añade una clase .loading al botón normal y modifícalo para que se vea diferente (por ejemplo, opaco y sin eventos de cursor) cuando está procesando algo."
      }
    ]`
  },
  {
    file: 'loading-states.astro',
    title: 'Loading States',
    current: '/interactions/loading-states',
    next: { title: 'Success y Error Feedback', href: '/interactions/success-error' },
    content: `
      <h2>Reduciendo la ansiedad del usuario</h2>
      <p>Cuando el usuario pide información (hace login, busca un producto, guarda un documento), el servidor tarda en responder. Si la interfaz se queda congelada, el usuario piensa: <em>"¿Ha funcionado? ¿Hago clic otra vez?"</em>.</p>
      <p>Los <strong>Loading States</strong> o estados de carga son interacciones visuales que dicen: "Tranquilo, estoy trabajando en ello". Los más modernos evitan la sensación de lentitud usando animaciones dinámicas, Skeletons o microinteracciones directamente en los botones de acción.</p>
    `,
    consejo: 'Para cargas muy cortas (menos de 500ms) es mejor no mostrar un loader. Si el loader parpadea demasiado rápido, la pantalla se sentirá inestable (jitter). Usa delays sutiles antes de mostrar el loader.',
    exampleTitle: 'Botón con estado de carga integrado (Inline Loader)',
    html: `<button class="submit-btn" id="submitBtn">
  <span class="btn-text">Guardar cambios</span>
  <span class="btn-loader"></span>
</button>

<script>
  const btn = document.getElementById('submitBtn');
  btn.addEventListener('click', () => {
    // Simulamos carga
    btn.classList.add('loading');
    setTimeout(() => {
      btn.classList.remove('loading');
    }, 3000);
  });
</script>`,
    css: `.submit-btn {
  position: relative;
  padding: 14px 28px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  min-width: 160px;
}

.btn-text {
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: inline-block;
}

/* El loader oculto al inicio */
.btn-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

/* --- ESTADO DE CARGA --- */
.submit-btn.loading {
  background: #059669;
  cursor: wait;
}

.submit-btn.loading .btn-text {
  opacity: 0;
  transform: translateY(-20px);
}

.submit-btn.loading .btn-loader {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
}`,
    errors: `[
      {
        title: "Bloquear toda la pantalla",
        description: "Mostrar un spinner gigante que cubre toda la pantalla por tareas pequeñas, frustrando la navegación y asustando al usuario."
      },
      {
        title: "Dejar el botón activo",
        description: "Olvidar cambiar el cursor o deshabilitar clicks múltiples mientras se carga, resultando en peticiones duplicadas al servidor."
      }
    ]`,
    practice: `[
      {
        title: "Cambia el Loader",
        description: "Modifica CSS para que el .btn-loader no sea un spinner circular, sino tres pequeños puntos que saltan secuencialmente (pista: usa box-shadow o varios spans en HTML)."
      },
      {
        title: "Evita el reflow",
        description: "Asegúrate de definir un min-width en el botón para que al cambiar el texto largo por un loader pequeño, el tamaño del botón no colapse bruscamente."
      }
    ]`
  },
  {
    file: 'success-error.astro',
    title: 'Success y Error Feedback',
    current: '/interactions/success-error',
    next: { title: 'Botones interactivos', href: '/interactions/botones' },
    content: `
      <h2>Comunicación visual resolutiva</h2>
      <p>Después de que un estado de carga termina, el usuario necesita saber si tuvo éxito o si hubo un problema. No dejes que la interfaz simplemente vuelva a su estado normal. Dale un cierre claro y visual.</p>
      <ul>
        <li><strong>Success (Éxito):</strong> Colores verdes/azules vibrantes, iconos de check, animaciones ascendentes que transmiten logro.</li>
        <li><strong>Error:</strong> Colores rojos, vibraciones, sacudidas horizontales (como decir "no" con la cabeza). Esto atrae el ojo inmediatamente para corregir el fallo.</li>
      </ul>
      <p>Integrar estos estados directamente en los componentes (como botones o inputs) mejora increíblemente la usabilidad comparado con mostrar una aburrida alerta del navegador.</p>
    `,
    consejo: 'Usa la animación clásica de "shake" (sacudida) para los errores. Es un patrón universal inspirado en el mundo físico. Si metes la llave equivocada, la puerta no se abre y "vibra" la cerradura.',
    exampleTitle: 'Estados visuales de éxito y error con Keyframes integrados',
    html: `<div class="feedback-container">
  <button class="action-btn success-trigger">Probar Éxito</button>
  <button class="action-btn error-trigger">Probar Error</button>
</div>

<!-- Notificación animada -->
<div class="toast" id="toastBox">
  <span class="icon"></span>
  <span class="message" id="toastMsg">Mensaje</span>
</div>

<script>
  const toast = document.getElementById('toastBox');
  const msg = document.getElementById('toastMsg');

  document.querySelector('.success-trigger').addEventListener('click', () => {
    toast.className = 'toast show success';
    msg.textContent = '¡Guardado correctamente!';
    setTimeout(() => toast.classList.remove('show'), 2500);
  });

  document.querySelector('.error-trigger').addEventListener('click', () => {
    toast.className = 'toast show error';
    msg.textContent = 'Credenciales inválidas.';
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
</script>`,
    css: `.feedback-container {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
}

.action-btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid #444;
  background: #222;
  color: white;
  cursor: pointer;
}

/* TOAST STYLES */
.toast {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 12px;
  background: #1e293b;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  font-weight: 500;
  
  /* Estado inicial oculto y desplazado */
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
}

/* Transición de aparición suave con rebote */
.toast.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Modificadores de color y animaciones de iconos */
.toast.success { border-left: 6px solid #10b981; }
.toast.error { 
  border-left: 6px solid #ef4444; 
  /* Si el error entra, le damos un shake extra opcional a nivel app */
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-8px); }
}`,
    errors: `[
      {
        title: "Ocultar el feedback muy rápido",
        description: "Darle al usuario menos de 2 segundos para leer el mensaje de éxito o error antes de animarlo hacia afuera."
      },
      {
        title: "Depender solo del color",
        description: "No añadas solo color rojo o verde. Añade un icono descriptivo o una animación de 'shake' para usuarios con daltonismo."
      }
    ]`,
    practice: `[
      {
        title: "Mejora el mensaje",
        description: "Añade un icono de 'X' rojo o un 'Check' verde en HTML usando SVGs y controla su aparición en CSS dependiendo del estado .success o .error."
      },
      {
        title: "Anima la salida",
        description: "La transición funciona bien de entrada, pero al remover la clase .show se esconde rápido. Ajusta la transición para que se desvanezca suavemente hacia la derecha o hacia arriba."
      }
    ]`
  }
];

lessons.forEach(l => {
  const fileContent = template(l.title, l.current, l.next, l.content, l.consejo, l.exampleTitle, l.html, l.css, l.errors, l.practice);
  fs.writeFileSync(path.join(dir, l.file), fileContent);
});

console.log('Created first 5 lessons');
