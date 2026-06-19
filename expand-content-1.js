const fs = require('fs');
const path = require('path');

const dir = 'src/pages/interactions';

const updates = {
  'que-son.astro': {
    content: `<h3>¿Qué son las Interactions?</h3>
    <p>Las interacciones son la respuesta directa, visual y táctil que una interfaz le da al usuario cuando este realiza una acción. Si Keyframes es el movimiento autónomo de la aplicación, y Transforms es su geometría física, las <strong>Interactions</strong> son el diálogo entre el software y el humano.</p>
    
    <h3>¿Para qué sirven?</h3>
    <p>Imagina presionar el botón de un ascensor físico y que no se encienda su luz. No sabrías si el botón se rompió o si el ascensor ya viene. Las interacciones sirven exactamente para resolver esa ansiedad en el mundo digital.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Confirmación de estado:</strong> Le dicen al usuario "hemos registrado tu acción".</li>
      <li><strong>Prevención de errores:</strong> Indican si un elemento es clickeable o si está desactivado.</li>
      <li><strong>Feedback asíncrono:</strong> Ocupan la mente del usuario mientras espera a que el servidor responda.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>En CSS, las interacciones se gestionan vinculando transiciones (<code>transition</code>) a cambios de estado producidos por pseudo-clases (<code>:hover</code>, <code>:active</code>, <code>:focus</code>) o mediante clases manipuladas por JavaScript (<code>.is-loading</code>, <code>.is-success</code>).</p>
    <p>El flujo siempre es el mismo: defines un estado base visualmente estable, defines cómo debe verse en el estado alterado, y aplicas una transición en el elemento original para que el cambio de A hacia B sea suave y natural.</p>`,
    consejo: `Piensa en las interacciones como una conversación. El usuario habla haciendo clic o pasando el cursor, y la interfaz debe responder de forma clara y rápida. Usa tiempos entre 150ms y 300ms; más lento parecerá 'lag'.`
  },
  'microinteracciones.astro': {
    content: `<h3>¿Qué son las Microinteracciones?</h3>
    <p>Una microinteracción es un evento minúsculo y altamente enfocado dentro de un producto que tiene una única tarea. A diferencia de una animación de pantalla completa, una microinteracción ocurre en el espacio de un botón, un icono o un interruptor (toggle).</p>
    <p>Son los detalles invisibles que transforman una aplicación utilitaria en un producto premium y memorable. El famoso "Me gusta" de Twitter o el rebote del switch de iOS son ejemplos icónicos de este concepto.</p>

    <h3>¿Para qué sirven?</h3>
    <p>El cerebro humano busca recompensas visuales inmediatas. Cuando un usuario interactúa con un elemento y obtiene una respuesta visual deleitante, se genera una micro-dosis de dopamina.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Comunicar estatus:</strong> Cambiar un toggle de gris a verde brillante.</li>
      <li><strong>Educar al usuario:</strong> Animar un icono de hamburguesa convirtiéndose en una "X" enseña dónde hacer clic para cerrar.</li>
      <li><strong>Prevenir el aburrimiento:</strong> Mantener al usuario entretenido en operaciones rutinarias.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>Requieren combinar CSS avanzado y SVG. Normalmente usas <code>stroke-dasharray</code> para animar bordes de iconos, <code>fill</code> para cambiar colores con <code>transition</code>, y <code>@keyframes</code> pequeños y explosivos (como un efecto de escala) acoplados al momento exacto en que se añade una clase "active" mediante JavaScript.</p>`,
    consejo: `Las microinteracciones deben ser extremadamente rápidas. Una regla de oro de diseño es que nunca deben durar más de 400ms, ya que su objetivo es informar y deleitar, no retrasar al usuario.`
  },
  'estados-interfaz.astro': {
    content: `<h3>¿Qué son los Estados de Interfaz?</h3>
    <p>Los estados de interfaz son las diferentes formas visuales que un componente interactivo puede adoptar dependiendo de la situación, del dispositivo o de la interacción directa del usuario. En la web moderna, los elementos nunca tienen un solo diseño estático.</p>

    <h3>¿Para qué sirven?</h3>
    <p>Sirven para dar contexto absoluto al usuario sobre qué se puede hacer, qué se está haciendo y qué no se puede hacer. Es el lenguaje visual universal de la usabilidad.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Hover (Exploración):</strong> Indica "Puedes interactuar conmigo" al levantar un elemento o iluminarlo sutilmente.</li>
      <li><strong>Active (Acción):</strong> Confirma que el clic fue físico y registrado (generalmente hundiendo el botón).</li>
      <li><strong>Focus (Accesibilidad):</strong> Guía al usuario que navega sin ratón, indicando en qué elemento exacto se encuentra.</li>
      <li><strong>Disabled (Restricción):</strong> Muestra qué acciones están bloqueadas temporalmente sin tener que borrarlas de la pantalla.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>Se implementan utilizando pseudo-clases en un orden muy específico dictado por la especificidad de CSS. Debes diseñar desde lo general hasta lo particular. Asegúrate de declarar el estado <code>:focus-visible</code> explícitamente para no penalizar visualmente a los usuarios de ratón mientras proteges a los de teclado.</p>`,
    consejo: `El estado :focus es crítico. Nunca uses 'outline: none;' globalmente a menos que proveas un anillo de sombra alternativo usando box-shadow para que los usuarios de teclado no se pierdan ciegos en tu página.`
  },
  'loading-states.astro': {
    content: `<h3>¿Qué son los Loading States?</h3>
    <p>Los estados de carga son representaciones visuales interinas que se muestran cuando la aplicación necesita tiempo para recuperar datos, procesar un formulario o conectarse a una API. Son la manera en que la UI pide paciencia de forma elegante.</p>

    <h3>¿Para qué sirven?</h3>
    <p>Sin un estado de carga, la interfaz parece congelada. Un usuario impaciente hará clic varias veces en un botón de "Comprar" si no sabe que su primer clic ya se está procesando, causando errores graves o cargos duplicados.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Reducir la fricción:</strong> Una animación suave hace que el tiempo de espera se perciba como más corto psicológicamente.</li>
      <li><strong>Prevenir acciones destructivas:</strong> Deshabilita interacciones secundarias mientras algo crítico está sucediendo.</li>
      <li><strong>Mantener el contexto:</strong> Los inline-loaders en los botones evitan tener que llevar al usuario a otra página.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>El patrón moderno evita los spinners gigantes de pantalla completa. En su lugar, cuando el usuario hace clic, se inyecta una clase CSS en el propio botón que oculta el texto, inyecta un pequeño SVG rotatorio en el centro, y usa <code>pointer-events: none</code> para evitar el doble envío.</p>`,
    consejo: `Para peticiones ultra rápidas (menos de 500ms), no muestres el loader de inmediato. Aplica un setTimeout para que el loader solo aparezca si la carga se demora, evitando 'flashes' visuales incómodos.`
  },
  'success-error.astro': {
    content: `<h3>¿Qué es el Feedback Visual (Success/Error)?</h3>
    <p>Es la resolución visual de una transacción. Tras un estado de carga, la interfaz debe comunicar explícitamente si la operación fue un éxito absoluto (Success) o si falló por alguna razón (Error). Es el cierre del ciclo de interacción.</p>

    <h3>¿Para qué sirve?</h3>
    <p>El usuario de hoy en día confía en la tecnología pero requiere comprobantes. Mostrar una pantalla que vuelve a la normalidad sin decir nada genera la temible pregunta: "¿Se habrá enviado?".</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Success:</strong> Da tranquilidad. Usa colores de confirmación (verde, azul), iconos de checkmark y animaciones ascendentes que transmiten logro o finalización positiva.</li>
      <li><strong>Error:</strong> Llama la atención urgentemente para corregir un fallo. Usa colores de alerta (rojo), iconos de cruz y animaciones sísmicas horizontales (shake) que imitan el movimiento de negar con la cabeza.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>Generalmente se implementan mediante un contenedor de notificaciones absoluto (Toasts) o cambiando el color y el icono del propio botón. Es esencial que estos estados vengan acompañados de transiciones fluidas de <code>opacity</code> y <code>transform</code> para que no aparezcan como errores abruptos del sistema, sino como mensajes de la interfaz.</p>`,
    consejo: `Usa la animación de shake (sacudida horizontal) para los estados de error. Es un lenguaje universal basado en el mundo real que guía inmediatamente la atención del usuario hacia el problema sin necesidad de leer.`
  },
  'botones.astro': {
    content: `<h3>¿Qué son los Botones Interactivos?</h3>
    <p>Son los actores principales de cualquier interfaz. Un botón es un componente call-to-action (CTA) diseñado específicamente para ser pulsado. No son simples bloques de color; en diseño moderno son contenedores físicos que responden a la ley de la gravedad digital.</p>

    <h3>¿Para qué sirven?</h3>
    <p>Un botón bien diseñado atrae el ojo, invita al usuario a realizar la acción crítica (comprar, registrarse, guardar) y le da retroalimentación física inmediata.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Jerarquía visual:</strong> Distinguen acciones primarias de secundarias. Un botón premium grita "haz clic aquí".</li>
      <li><strong>Retroalimentación táctil:</strong> Cuando el cursor pasa por encima, el botón debe levantarse, proyectando sombra para indicar "soy pulsable". Al hacer clic, debe hundirse como un botón mecánico de teclado.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>La combinación perfecta se logra usando <code>box-shadow</code> para la profundidad lumínica y <code>transform: translateY()</code> para la física. Además, puedes añadir sutiles íconos SVG dentro del botón que se desplacen independientemente al hacer hover, creando un efecto de paralaje en 2D que se siente extremadamente elegante.</p>`,
    consejo: `Jamás animes el margin o el width/height de un botón en hover. Esto causará un recálculo costoso (reflow) que empujará a los demás elementos de la página. Usa siempre transform para simular cambios de tamaño.`
  },
  'cards.astro': {
    content: `<h3>¿Qué son las Cards Interactivas?</h3>
    <p>Las tarjetas (Cards) son el contenedor de contenido estándar para blogs, e-commerces y dashboards. Una card estática es como un póster impreso, pero una card interactiva es un contenedor tridimensional que reacciona de forma compleja al interés del usuario.</p>

    <h3>¿Para qué sirven?</h3>
    <p>La web está llena de información, y el usuario escanea rápidamente. Las cards sirven para encapsular un tema (un producto, un post). Su interactividad sirve para recompensar la atención del usuario. Cuando el usuario pasa el ratón por encima, la tarjeta "despierta", confirmando que ese bloque es el punto de enfoque actual.</p>
    <ul class="space-y-2 list-disc pl-6 mb-6">
      <li><strong>Atraer el enfoque:</strong> Elevando la tarjeta con sombras difusas.</li>
      <li><strong>Revelar opciones secundarias:</strong> Mostrar un botón de "Añadir al carrito" que estaba oculto, manteniendo el diseño inicial limpio.</li>
      <li><strong>Generar profundidad:</strong> Acercando la imagen principal sutilmente.</li>
    </ul>

    <h3>¿Cómo se usan?</h3>
    <p>Se crea un contenedor base con <code>overflow: hidden</code>. En su estado <code>:hover</code> aplicamos <code>translateY(-8px)</code> al contenedor global para levantarlo, mientras simultáneamente aplicamos <code>scale(1.05)</code> a la imagen interior. Esta doble manipulación de transforms opuestos crea una sensación de ventana en 3D que los usuarios de Apple e iOS asocian instintivamente con diseño premium.</p>`,
    consejo: `El secreto de la profundidad premium radica en las escalas sutiles. Un scale(1.05) es elegante; un scale(1.2) parece un error amateur de zoom incontrolado. Mantén los valores ajustados.`
  }
};

Object.keys(updates).forEach(filename => {
  const filepath = path.join(dir, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Reemplazar el bloque de artículo y el consejo
  content = content.replace(/<article class="prose[^>]+>([\s\S]*?)<\/article>/, `<article class="prose prose-invert max-w-none" style="margin-top: 64px;">\n    ${updates[filename].content}\n  </article>`);
  content = content.replace(/<ConsejoProfesional tip="[^"]+" \/>/, `<ConsejoProfesional tip='${updates[filename].consejo}' />`);
  content = content.replace(/<ConsejoProfesional tip='[^']+' \/>/, `<ConsejoProfesional tip='${updates[filename].consejo}' />`);
  
  fs.writeFileSync(filepath, content);
  console.log('Updated content in', filename);
});
