const fs = require('fs');
const path = require('path');

const dir = 'src/pages/interactions';

const updates = {
  'modales-overlays.astro': {
    content: `<h3>¿Qué son los Modales y Overlays?</h3>
    <p>Un modal (o caja de diálogo) es una ventana secundaria que se sobrepone al contenido principal para requerir la atención inmediata del usuario. Un overlay es la capa semi-transparente que se coloca detrás del modal para oscurecer y bloquear la interfaz base, desenfocando al usuario del fondo.</p>

    <h3>¿Para qué sirven?</h3>
    <p>Son el componente más agresivo de la UI moderna, por lo que su propósito es interrumpir. Se utilizan para flujos críticos que no deben ignorarse o para configuraciones rápidas que no ameritan cargar una página completa.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Prevenir errores críticos:</strong> Pedir confirmación (¿Seguro que deseas borrar este proyecto?).</li>
      <li><strong>Concentración total:</strong> Mostrar un formulario complejo sin distracciones periféricas.</li>
      <li><strong>Mantener el contexto:</strong> El usuario no abandona la página actual; simplemente abre un paréntesis, lo resuelve y vuelve exactamente donde estaba.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>Aparecer instantáneamente genera "ceguera de interfaz" (interrupción brusca). Una entrada animada guía el ojo hacia el centro y avisa al cerebro que el contexto ha cambiado suavemente. Usualmente se aplica <code>opacity: 0</code> y <code>visibility: hidden</code> al overlay y se usa un <code>transition-delay</code> en la caja del modal para que aparezca una fracción de segundo <em>después</em> de que el fondo se ha oscurecido.</p>`,
    consejo: `Anima siempre el fondo (overlay) con opacidad para oscurecer la pantalla, y el modal en sí usando transform: scale o transform: translateY. Evita animar propiedades de layout como width/height.`
  },
  'dropdowns-menus.astro': {
    content: `<h3>¿Qué son los Dropdowns y Menús?</h3>
    <p>Un dropdown es un menú oculto que se despliega o revela opciones secundarias cuando el usuario interactúa (hace clic o hover) con un botón disparador. Es el patrón de diseño por excelencia para la navegación compacta y las acciones de usuario.</p>

    <h3>¿Para qué sirven?</h3>
    <p>Sirven para conservar el preciado espacio en pantalla (real estate). Si tienes 10 acciones disponibles pero solo 2 son principales, las otras 8 van dentro de un menú de "Opciones".</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Navegación limpia:</strong> Agrupan enlaces categorizados sin saturar el encabezado de tu sitio web.</li>
      <li><strong>Jerarquía de acciones:</strong> Esconden opciones peligrosas (Cerrar sesión, Eliminar cuenta) bajo un clic intencional.</li>
      <li><strong>Revelación progresiva:</strong> Muestran información solo cuando el usuario activamente la requiere.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>El error más común es hacer que aparezcan de la nada cambiando <code>display: none</code> a <code>display: block</code>. Una interacción mágica utiliza el <strong>transform-origin</strong> para controlar desde dónde "crece" o "nace" el menú. Si el botón está arriba a la derecha, el menú debe originarse de forma orgánica desde esa esquina (<code>transform-origin: top right</code>) junto con un <code>scale</code> desde 0.95 a 1.</p>`,
    consejo: `Para evitar el clásico problema donde el cursor se sale del botón un píxel y el menú colapsa (súper frustrante), añade padding transparente al menú o usa un pequeño retraso (transition-delay) al desaparecer.`
  },
  'tooltips.astro': {
    content: `<h3>¿Qué son los Tooltips?</h3>
    <p>Los tooltips son pequeños globos informativos y contextuales que aparecen de forma temporal al pasar el cursor o enfocar un elemento de la interfaz. Representan la capa más granular de ayuda al usuario en un producto digital.</p>

    <h3>¿Para qué sirven?</h3>
    <p>El diseño moderno abusa de la iconografía para ahorrar espacio, asumiendo que los usuarios entenderán qué hace cada símbolo. Los tooltips son la red de seguridad de la usabilidad que soluciona la ambigüedad.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Aclarar íconos:</strong> Decodificar que un engranaje significa "Configuración" y una estrella "Favoritos".</li>
      <li><strong>Instrucciones rápidas:</strong> "La contraseña debe contener 8 caracteres" sobre un campo de texto.</li>
      <li><strong>Información extendida:</strong> Mostrar el nombre completo de un usuario al posarse sobre su pequeño avatar circular.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>La regla de oro de un tooltip es la <strong>intencionalidad</strong>. Si los tooltips aparecen instantáneamente mientras el usuario mueve velozmente el ratón por la pantalla, generarán un caos visual insoportable de cajas parpadeando. La interacción profesional requiere añadir un <code>transition-delay</code> de entre 300ms y 500ms en el estado de aparición. Solo se muestra si el usuario detiene su cursor intencionalmente para preguntar "¿Qué es esto?".</p>`,
    consejo: `Un buen tooltip usa transition-delay solo en la entrada, pero desaparece instantáneamente en la salida (sin delay). Así evitas que bloqueen la lectura de elementos cercanos cuando el usuario aparta el cursor.`
  },
  'feedback-formularios.astro': {
    content: `<h3>¿Qué es el Feedback en Formularios?</h3>
    <p>Llenar un formulario web es intrínsecamente aburrido y propenso a errores. El feedback de formularios es la capa de interactividad que guía al usuario campo por campo, informándole en tiempo real dónde está, qué debe escribir y si lo que escribió es correcto o incorrecto.</p>

    <h3>¿Para qué sirve?</h3>
    <p>Sin feedback visual, los inputs parecen cajas inertes. Al reaccionar visualmente (cambiando bordes, levantando textos), el usuario nunca se pierde.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Ubicación visual (Focus):</strong> Resaltar el borde inferior fuertemente ayuda a saber dónde va a aparecer el texto.</li>
      <li><strong>Retención de contexto (Floating Label):</strong> El patrón donde el placeholder se mueve arriba pero no desaparece, permite al usuario saber qué dato está llenando incluso si se distrae.</li>
      <li><strong>Validación instantánea:</strong> Bordes verdes o rojos que evitan la frustración de llenar 10 campos y que el servidor los rechace al final.</li>
    </ul>

    <h3>¿Cómo se usa?</h3>
    <p>El patrón moderno CSS-only (Floating Label) se logra usando el orden del DOM y pseudo-clases astutas. Colocas el <code>&lt;label&gt;</code> después del <code>&lt;input&gt;</code>, y usas el selector <code>input:focus ~ label</code> o <code>input:not(:placeholder-shown) ~ label</code> para disparar un <code>translateY</code> y achicar el texto, empujándolo fuera del camino elegantemente sin tocar JavaScript.</p>`,
    consejo: `Aprovecha las pseudo-clases nativas :placeholder-shown y :focus-within. Con ellas puedes crear validaciones y animaciones complejas en contenedores padres de forma puramente declarativa y fluida.`
  },
  'sistemas-consistentes.astro': {
    content: `<h3>¿Qué son los Sistemas Consistentes?</h3>
    <p>Un sistema de interacciones consistente (Motion System) es la estandarización de variables de movimiento y tiempo a través de toda una aplicación. En lugar de codificar manualmente cada transición de cada componente aislado, defines reglas físicas globales de las que beben todos los elementos.</p>

    <h3>¿Para qué sirven?</h3>
    <p>Un producto se percibe barato y desordenado si un botón rebota cómicamente como goma, mientras que la tarjeta contigua se desvanece de forma plana y lenta. Las personas construyen modelos mentales de cómo funciona el mundo físico; si tu software rompe esas leyes físicas de componente en componente, causará fatiga cognitiva.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Personalidad de marca:</strong> La app de Apple se siente distinta a Android no solo por los colores, sino por las curvas de aceleración (easing).</li>
      <li><strong>Mantenibilidad técnica:</strong> Si el director de diseño pide que la app sea "un 20% más ágil", cambias un token y 1000 componentes se actualizan instantáneamente.</li>
      <li><strong>Familiaridad:</strong> Si los enlaces y botones elevan la misma distancia al hover, el usuario aprende un lenguaje universal de interactividad en tu app.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>Se implementan creando <strong>Motion Tokens</strong> utilizando CSS Custom Properties (Variables) en el bloque <code>:root</code>. Defines variables como <code>--duration-fast: 150ms</code>, <code>--ease-snappy: cubic-bezier(0.175, 0.885, 0.32, 1.275)</code> y luego las inyectas en todos los atributos <code>transition</code> y <code>animation</code> de tus hojas de estilo.</p>`,
    consejo: `Organiza tus tokens por intención, no por tiempo absoluto. Nombra tus variables como --t-micro (para hovers) o --t-panel (para modales) en lugar de --t-150ms. Así tu sistema tendrá sentido semántico.`
  },
  'interacciones-combinadas.astro': {
    content: `<h3>¿Qué son las Interacciones Combinadas?</h3>
    <p>Una interacción combinada es la orquestación simultánea de múltiples técnicas de animación de CSS en un solo componente o evento para crear una experiencia profundamente inmersiva. Es la frontera donde el diseño web deja de ser un documento y se convierte en una aplicación interactiva.</p>

    <h3>¿Para qué sirven?</h3>
    <p>Las animaciones simples cumplen su función utilitaria, pero las combinadas generan la categoría de "Wow Factor". Son ideales para Landing Pages (páginas de aterrizaje), componentes clave (hero headers) y acciones de gamificación.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Riqueza espacial:</strong> Un contenedor se eleva en 2D mientras el contenido interior gira en 3D o emite pulsos de luz infinitos.</li>
      <li><strong>Storytelling de UI:</strong> El hover no solo resalta el elemento, sino que desencadena una narrativa paralela (como un ícono estático que de pronto comienza a levitar).</li>
      <li><strong>Foco absoluto:</strong> Una tarjeta tan rica visualmente que el usuario inevitablemente centrará su atención en ella sobre otros elementos estáticos.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>Combina <strong>Transitions</strong> (para responder a la acción instantánea del hover con suavidad), <strong>Transforms</strong> (para las matemáticas físicas del componente base) y <strong>Keyframes</strong> (para efectos secundarios infinitos, como brillos palpitantes, que solo viven mientras el cursor esté encima). El arte consiste en no animar todo a la vez para no causar caos.</p>`,
    consejo: `Evita animar la misma propiedad (ej. transform) con un keyframe y una transición simultáneamente en el mismo nodo HTML. Esto causará sobreescrituras (glitches) severos. Divide las capas: el contenedor usa la transición, el SVG hijo usa el keyframe infinito.`
  },
  'performance.astro': {
    content: `<h3>¿Qué es el Performance en Interactions?</h3>
    <p>El Performance (Rendimiento) en animaciones es la capacidad técnica de tu página web de ejecutar todos los cambios visuales y matemáticos a una tasa de refresco inquebrantable de <strong>60 Frames Per Second (FPS)</strong>. Significa que el navegador tiene solo 16 milisegundos para calcular y pintar cada fotograma en la pantalla.</p>

    <h3>¿Para qué sirve?</h3>
    <p>De nada sirve crear la interacción más bella de la historia si corre a trompicones (Jank). En móviles o en computadoras menos potentes, las animaciones mal estructuradas causarán que la interfaz se congele, drene la batería rápidamente y dispare los ventiladores de la máquina.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Fluidez profesional:</strong> Una animación a 60 FPS se siente pesada, natural y bien programada.</li>
      <li><strong>Retención de usuarios:</strong> Los cuellos de botella visuales (lag) generan frustración instantánea en el usuario.</li>
      <li><strong>Ahorro de recursos computacionales:</strong> Optimizar significa descargar de trabajo al CPU principal de la máquina del usuario.</li>
    </ul>

    <h3>¿Cómo se usan las propiedades seguras?</h3>
    <p>El secreto definitivo de las interacciones CSS: <strong>Animar el layout (width, height, margin, top/left) es terriblemente costoso (Reflow).</strong> El navegador debe recalcular toda la geometría de la página. Por el contrario, debes animar exclusivamente propiedades de Composición (Composite): <code>transform</code> y <code>opacity</code>. Estas propiedades son delegadas por el navegador directamente a la Tarjeta Gráfica (GPU), asegurando un rendimiento matemáticamente perfecto.</p>`,
    consejo: `Para animaciones críticas de gran tamaño, usa 'will-change: transform;' para decirle a la GPU por adelantado que se prepare para el movimiento. Pero úsalo con extrema moderación, ya que consumirá mucha memoria VRAM.`
  }
};

Object.keys(updates).forEach(filename => {
  const filepath = path.join(dir, filename);
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Reemplazar el bloque de artículo y el consejo
  content = content.replace(/<article class="prose[^>]+>([\s\S]*?)<\/article>/, `<article class="prose prose-invert max-w-none" style="margin-top: 64px;">\n    ${updates[filename].content}\n  </article>`);
  content = content.replace(/<ConsejoProfesional tip="[^"]+" \/>/, `<ConsejoProfesional tip='${updates[filename].consejo}' />`);
  content = content.replace(/<ConsejoProfesional tip='[^']+' \/>/, `<ConsejoProfesional tip='${updates[filename].consejo}' />`);
  
  fs.writeFileSync(filepath, content);
  console.log('Updated content in', filename);
});
