export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'basico' | 'intermedio' | 'avanzado';
  lessonsCount: number;
  duration: string;
  image?: string;
}

export const courses: Course[] = [
  {
    id: 'css-fundamentos',
    title: 'CSS Animations: Fundamentos',
    description: 'Aprende los conceptos básicos de animaciones CSS desde cero.',
    category: 'css',
    level: 'basico',
    lessonsCount: 6,
    duration: '2h 30min',
  },
  {
    id: 'css-avanzado',
    title: 'CSS Animations: Nivel Avanzado',
    description: 'Técnicas avanzadas de animación y optimización de rendimiento.',
    category: 'css',
    level: 'avanzado',
    lessonsCount: 6,
    duration: '3h 15min',
  },
  {
    id: 'svg-fundamentos',
    title: 'SVG: Fundamentos',
    description: 'Crea y anima elementos SVG desde cero.',
    category: 'svg',
    level: 'basico',
    lessonsCount: 5,
    duration: '2h',
  },
  {
    id: 'canvas-fundamentos',
    title: 'Canvas API: Fundamentos',
    description: 'Programa gráficos 2D con JavaScript y Canvas.',
    category: 'canvas',
    level: 'basico',
    lessonsCount: 7,
    duration: '3h',
  },
  {
    id: 'threejs-fundamentos',
    title: 'Three.js: Fundamentos',
    description: 'Introducción al desarrollo 3D con Three.js.',
    category: 'threejs',
    level: 'basico',
    lessonsCount: 8,
    duration: '4h',
  },
  {
    id: 'gsap-fundamentos',
    title: 'GSAP: Fundamentos',
    description: 'Domina las animaciones profesionales con GSAP.',
    category: 'gsap',
    level: 'basico',
    lessonsCount: 6,
    duration: '2h 45min',
  },
  {
    id: 'webgl-fundamentos',
    title: 'WebGL: Fundamentos',
    description: 'Introducción a los gráficos 3D con WebGL.',
    category: 'webgl',
    level: 'basico',
    lessonsCount: 7,
    duration: '3h 30min',
  },
  {
    id: 'creative-coding',
    title: 'Creative Coding: Introducción',
    description: 'Explora el arte generativo y la programación creativa.',
    category: 'canvas',
    level: 'intermedio',
    lessonsCount: 10,
    duration: '5h',
  },
];
