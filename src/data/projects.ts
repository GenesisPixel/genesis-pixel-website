export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'basico' | 'intermedio' | 'avanzado';
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'animated-portfolio',
    title: 'Portfolio Animado',
    description: 'Crea un portfolio personal con animaciones CSS y transiciones fluidas.',
    category: 'css',
    difficulty: 'basico',
    tags: ['CSS', 'HTML', 'Responsive'],
  },
  {
    id: 'svg-logo-animation',
    title: 'Logo Animation SVG',
    description: 'Anima un logo vectorial con SVG y JavaScript.',
    category: 'svg',
    difficulty: 'intermedio',
    tags: ['SVG', 'JavaScript', 'Animation'],
  },
  {
    id: 'particle-system',
    title: 'Sistema de Partículas',
    description: 'Crea un sistema de partículas interactivo con Canvas.',
    category: 'canvas',
    difficulty: 'intermedio',
    tags: ['Canvas', 'JavaScript', 'Particles'],
  },
  {
    id: '3d-portfolio',
    title: 'Portfolio 3D',
    description: 'Construye un portfolio inmersivo con Three.js.',
    category: 'threejs',
    difficulty: 'avanzado',
    tags: ['Three.js', '3D', 'WebGL'],
  },
  {
    id: 'scroll-animations',
    title: 'Scroll Animations',
    description: 'Anima elementos al hacer scroll con GSAP.',
    category: 'gsap',
    difficulty: 'intermedio',
    tags: ['GSAP', 'Scroll', 'Animation'],
  },
  {
    id: 'shader-art',
    title: 'Shader Art',
    description: 'Crea arte generativo con shaders WebGL.',
    category: 'webgl',
    difficulty: 'avanzado',
    tags: ['WebGL', 'Shaders', 'Art'],
  },
];
