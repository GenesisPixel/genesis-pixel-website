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
${opts.css.replace(/\.state-btn/g, '.state-btn-p').replace(/\.submit-btn/g, '.submit-btn-p').replace(/\.action-btn/g, '.action-btn-p').replace(/\.toast/g, '.toast-p').replace(/\.premium-btn/g, '.premium-btn-p')}
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
    file: 'estados-interfaz.astro',
    title: 'Estados de la interfaz',
    id: 'estados-interfaz',
    current: '/interactions/estados-interfaz',
    prev: { title: 'Microinteracciones', href: '/interactions/microinteracciones' },
    next: { title: 'Loading States', href: '/interactions/loading-states' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 3',
    readingTime: 6,
    content: `<h3>Los 5 pilares interactivos</h3>
    <p>Para construir componentes consistentes, siempre debes considerar cómo se ven y cómo transicionan entre sus estados básicos. Un elemento interactivo en la web no existe de una sola forma.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Default:</strong> El estado base, en reposo.</li>
      <li><strong>Hover:</strong> Cuando el cursor está sobre él (descubrimiento).</li>
      <li><strong>Active:</strong> El instante en que el usuario hace clic o lo presiona.</li>
      <li><strong>Focus:</strong> Cuando el usuario navega con el teclado y llega al elemento (accesibilidad).</li>
      <li><strong>Disabled:</strong> Cuando la acción no está disponible, visualmente apagado.</li>
    </ul>
    <p>Diseñar todos estos estados y la <em>transición visual</em> entre ellos es lo que diferencia a una plantilla básica de un producto digital premium.</p>`,
    consejo: 'El estado :focus es el más olvidado pero el más importante para la accesibilidad. Nunca uses &quot;outline: none;&quot; sin proporcionar un estilo alternativo evidente para los usuarios que navegan por teclado.',
    exampleTitle: 'Implementando todos los estados de un botón',
    previewDesc: 'Interactúa con los botones (hover, click, y navega con Tab) para ver sus estados.',
    html: `<button class="state-btn">Estado Normal</button>
<button class="state-btn" disabled>Estado Disabled</button>`,
    previewHtml: `<div style="display:flex; gap:16px;">
  <button class="state-btn-p">Estado Normal</button>
  <button class="state-btn-p" disabled>Estado Disabled</button>
</div>`,
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

.state-btn:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
}

.state-btn:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 5px 5px -3px rgba(37, 99, 235, 0.4);
}

.state-btn:focus-visible {
  outline: none;
  border-color: #93c5fd;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3);
}

.state-btn:disabled {
  background: #475569;
  color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.7;
}`,
    errors: [
      { label: 'Ignorar el estado Focus', description: 'Quitar el anillo de focus nativo sin reemplazarlo. Esto hace imposible para alguien sin ratón saber dónde está.' },
      { label: 'Efectos en elements disabled', description: 'Olvidar añadir :not(:disabled) a tus reglas de hover, haciendo que un botón deshabilitado parezca interactivo.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Construye un botón que implemente los 5 estados de forma visual y clara.',
    practiceSteps: [
      { number: 1, text: 'Crea tu botón base con color primario sólido.', color: 'dm-purple', rotate: '-2deg' },
      { number: 2, text: 'Diseña :hover con elevación (translateY y box-shadow).', color: 'dm-green', rotate: '4deg' },
      { number: 3, text: 'Diseña :active con transform: scale(0.96) y transición de 0.1s.', color: 'app-color-yellow400', rotate: '-4deg' },
      { number: 4, text: 'Diseña :focus-visible con un anillo de color visible.', color: 'dm-blue', rotate: '2deg' },
      { number: 5, text: 'Diseña :disabled con opacidad 0.5 y cursor: not-allowed.', color: 'dm-purple', rotate: '-3deg' },
    ]
  },
  {
    file: 'loading-states.astro',
    title: 'Loading States',
    id: 'loading-states',
    current: '/interactions/loading-states',
    prev: { title: 'Estados de la interfaz', href: '/interactions/estados-interfaz' },
    next: { title: 'Success y Error Feedback', href: '/interactions/success-error' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 4',
    readingTime: 6,
    content: `<h3>Reduciendo la ansiedad del usuario</h3>
    <p>Cuando el usuario pide información (hace login, busca un producto, guarda un documento), el servidor tarda en responder. Si la interfaz se queda congelada, el usuario piensa: <em>"¿Ha funcionado? ¿Hago clic otra vez?"</em>.</p>
    <p>Los <strong>Loading States</strong> o estados de carga son interacciones visuales que dicen: "Tranquilo, estoy trabajando en ello". Los más modernos evitan la sensación de lentitud usando animaciones dinámicas directamente en los botones de acción en lugar de bloquear toda la pantalla.</p>`,
    consejo: 'Para cargas muy cortas (menos de 500ms) es mejor no mostrar un loader. Si el loader parpadea demasiado rápido, la pantalla se sentirá inestable (jitter). Usa delays sutiles.',
    exampleTitle: 'Botón con estado de carga integrado',
    previewDesc: 'Haz clic en el botón para simular una petición asíncrona de 3 segundos.',
    html: `<button class="submit-btn" id="submitBtn">
  <span class="btn-text">Guardar cambios</span>
  <span class="btn-loader"></span>
</button>`,
    previewHtml: `<button class="submit-btn-p" id="submitBtnP">
  <span class="btn-text">Guardar cambios</span>
  <span class="btn-loader"></span>
</button>`,
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
    errors: [
      { label: 'Bloquear toda la pantalla', description: 'Mostrar un spinner gigante por tareas pequeñas frustra la navegación.' },
      { label: 'Dejar el botón activo', description: 'Olvidar cambiar el cursor o deshabilitar clicks resulta en peticiones duplicadas.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Implementa un botón que asuma el estado de carga al hacer clic con un spinner integrado.',
    practiceSteps: [
      { number: 1, text: 'Crea un botón con min-width fijo para que no colapse.', color: 'dm-purple', rotate: '3deg' },
      { number: 2, text: 'Añade un span .spinner oculto dentro del botón.', color: 'dm-green', rotate: '-3deg' },
      { number: 3, text: 'Anima el spinner con @keyframes y border-top.', color: 'app-color-yellow400', rotate: '5deg' },
      { number: 4, text: 'Con JS, añade la clase .loading al clic y ocúltala tras 3s.', color: 'dm-blue', rotate: '-2deg' },
      { number: 5, text: 'Mueve el texto fuera con translateY y muestra el spinner.', color: 'dm-purple', rotate: '2deg' },
    ],
    scriptInit: `const btnP = document.getElementById('submitBtnP');
    if(btnP) {
      btnP.addEventListener('click', () => {
        btnP.classList.add('loading');
        setTimeout(() => btnP.classList.remove('loading'), 3000);
      });
    }`
  },
  {
    file: 'success-error.astro',
    title: 'Success y Error Feedback',
    id: 'success-error',
    current: '/interactions/success-error',
    prev: { title: 'Loading States', href: '/interactions/loading-states' },
    next: { title: 'Botones interactivos', href: '/interactions/botones' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 5',
    readingTime: 7,
    content: `<h3>Comunicación visual resolutiva</h3>
    <p>Después de que un estado de carga termina, el usuario necesita saber si tuvo éxito o si hubo un problema. No dejes que la interfaz simplemente vuelva a su estado normal. Dale un cierre claro y visual.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Success (Éxito):</strong> Colores verdes/azules, iconos de check, animaciones ascendentes que transmiten logro.</li>
      <li><strong>Error:</strong> Colores rojos, vibraciones, sacudidas horizontales (shake). Esto atrae el ojo inmediatamente para corregir el fallo.</li>
    </ul>
    <p>Integrar estos estados directamente en los componentes (o en Toasts emergentes) mejora increíblemente la usabilidad.</p>`,
    consejo: 'Usa la animación de "shake" (sacudida) para los errores. Es un patrón universal inspirado en el mundo físico. Si metes la llave equivocada, la puerta no se abre y vibra la cerradura.',
    exampleTitle: 'Notificaciones animadas (Toasts)',
    previewDesc: 'Haz clic en los botones para disparar el feedback.',
    html: `<button class="action-btn success-trigger">Éxito</button>
<button class="action-btn error-trigger">Error</button>

<div class="toast" id="toastBox">
  <span class="message" id="toastMsg">Mensaje</span>
</div>`,
    previewHtml: `<div style="display:flex; gap:16px; position:relative; width:100%; height:100%; justify-content:center; align-items:flex-start; padding-top: 20px;">
  <button class="action-btn-p success-trigger-p" style="padding:10px 20px; border-radius:6px; border:1px solid #444; background:#222; color:white; cursor:pointer;">Éxito</button>
  <button class="action-btn-p error-trigger-p" style="padding:10px 20px; border-radius:6px; border:1px solid #444; background:#222; color:white; cursor:pointer;">Error</button>
  <div class="toast-p" id="toastBoxP" style="position:absolute; top: 80px;">
    <span class="message" id="toastMsgP">Mensaje</span>
  </div>
</div>`,
    css: `.toast {
  position: absolute;
  padding: 16px 24px;
  border-radius: 12px;
  background: #1e293b;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  font-weight: 500;
  
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
}

.toast.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.toast.success { border-left: 6px solid #10b981; }
.toast.error { 
  border-left: 6px solid #ef4444; 
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-8px); }
}`,
    errors: [
      { label: 'Ocultar rápido', description: 'Darle al usuario menos de 2 segundos para leer el mensaje de éxito o error antes de animarlo hacia afuera.' },
      { label: 'Depender del color', description: 'Añade un icono descriptivo o una animación de shake para ayudar a usuarios con daltonismo.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Crea un sistema de toast animado que diferencie visualmente éxito y error.',
    practiceSteps: [
      { number: 1, text: 'Crea una caja .toast oculta con opacity: 0.', color: 'dm-purple', rotate: '-4deg' },
      { number: 2, text: 'Defínele transition para que aparezca con scale y opacity.', color: 'dm-green', rotate: '2deg' },
      { number: 3, text: 'Crea modificadores .success y .error con border-left de color.', color: 'app-color-yellow400', rotate: '-2deg' },
      { number: 4, text: 'Con JS, añade la clase .show según la acción.', color: 'dm-blue', rotate: '4deg' },
      { number: 5, text: 'Elimina la clase .show después de 2500ms.', color: 'dm-purple', rotate: '-3deg' },
    ],
    scriptInit: `const toast = document.getElementById('toastBoxP');
    const msg = document.getElementById('toastMsgP');
    const sBtn = document.querySelector('.success-trigger-p');
    const eBtn = document.querySelector('.error-trigger-p');
    if(toast && sBtn && eBtn) {
      sBtn.addEventListener('click', () => {
        toast.className = 'toast-p show success';
        msg.textContent = '¡Guardado correctamente!';
        setTimeout(() => toast.classList.remove('show'), 2500);
      });
      eBtn.addEventListener('click', () => {
        toast.className = 'toast-p show error';
        msg.textContent = 'Credenciales inválidas.';
        setTimeout(() => toast.classList.remove('show'), 2500);
      });
    }`
  },
  {
    file: 'botones.astro',
    title: 'Botones interactivos',
    id: 'botones',
    current: '/interactions/botones',
    prev: { title: 'Success y Error Feedback', href: '/interactions/success-error' },
    next: { title: 'Cards interactivas', href: '/interactions/cards' },
    chapterNumber: '04',
    chapterLabel: 'Capítulo 4 · Lección 6',
    readingTime: 8,
    content: `<h3>Los elementos más clickeados de la web</h3>
    <p>Un botón no es solo un rectángulo con texto. En diseño moderno, es un componente vivo que invita a la acción y responde a ella. Hemos visto estados aislados, ahora vamos a construir el botón perfecto combinando transformaciones, transiciones y un diseño premium.</p>
    <p>Un buen botón debe tener peso visual en reposo, sentirse ligero y clicable al pasar el cursor (hover = profundidad, resplandor) y sentirse pesado/físico al ser presionado (active = hundimiento).</p>`,
    consejo: 'Evita animar el padding o margin del botón en hover. Esto causará un recálculo (reflow) costoso. Usa transform: translateY() o scale() para cambiar su tamaño aparente.',
    exampleTitle: 'Botón Premium con Transform y Box Shadow',
    previewDesc: 'Prueba el hover y haz clic sostenido (active) para sentir el hundimiento físico.',
    html: `<button class="premium-btn">
  Comenzar Aventura
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
</button>`,
    previewHtml: `<button class="premium-btn-p">
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
  
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.premium-btn svg {
  transition: transform 0.3s ease;
}

.premium-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(59, 130, 246, 0.5);
}

.premium-btn:hover svg {
  transform: translateX(4px);
}

.premium-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(59, 130, 246, 0.4);
  transition-duration: 0.1s;
}`,
    errors: [
      { label: 'Botones sin contraste', description: 'Crear botones transparentes que apenas cambian de color en hover, haciendo dudar al usuario.' },
      { label: 'Animar width', description: 'Cambiar el ancho o alto real del botón empujará el contenido a su alrededor, creando un diseño ruidoso.' }
    ],
    practiceTitle: 'Practica lo Aprendido',
    practiceDesc: 'Crea un botón premium que combine transform, box-shadow y un ícono animado.',
    practiceSteps: [
      { number: 1, text: 'Diseña un botón con gradiente y border-radius de 12px.', color: 'dm-purple', rotate: '2deg' },
      { number: 2, text: 'En :hover, aplica translateY(-3px) y aumenta el box-shadow.', color: 'dm-green', rotate: '-4deg' },
      { number: 3, text: 'Agrega un ícono SVG de flecha con transition: transform.', color: 'app-color-yellow400', rotate: '3deg' },
      { number: 4, text: 'En :hover, mueve la flecha con translateX(4px).', color: 'dm-blue', rotate: '-2deg' },
      { number: 5, text: 'Añade :active que reduzca el shadow y baje el botón 1px.', color: 'dm-purple', rotate: '4deg' },
    ]
  }
];

lessons.forEach(l => {
  fs.writeFileSync(path.join(dir, l.file), createTemplate(l));
});
console.log('Done rewriting 3-6');
