export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessonsCount: number;
}

export const categories: Category[] = [
  {
    id: 'css',
    title: 'CSS Animations',
    description: 'Domina las animaciones con CSS, transitions, keyframes y animaciones fluidas.',
    icon: 'css',
    color: 'blue',
    lessonsCount: 12,
  },
  {
    id: 'svg',
    title: 'SVG Animations',
    description: 'Crea animaciones vectoriales con SVG, SMIL y JavaScript.',
    icon: 'svg',
    color: 'green',
    lessonsCount: 10,
  },
  {
    id: 'canvas',
    title: 'Canvas API',
    description: 'Programa gráficos 2D interactivos con la API de Canvas.',
    icon: 'canvas',
    color: 'yellow',
    lessonsCount: 14,
  },
  {
    id: 'threejs',
    title: 'Three.js',
    description: 'Construye experiencias 3D en el navegador con Three.js.',
    icon: 'threejs',
    color: 'purple',
    lessonsCount: 16,
  },
  {
    id: 'gsap',
    title: 'GSAP',
    description: 'Animaciones profesionales con GreenSock Animation Platform.',
    icon: 'gsap',
    color: 'charcoal',
    lessonsCount: 11,
  },
  {
    id: 'webgl',
    title: 'WebGL',
    description: 'Gráficos 3D de alto rendimiento con WebGL y shaders.',
    icon: 'webgl',
    color: 'indigo',
    lessonsCount: 13,
  },
];
