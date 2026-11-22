import labCover from '../assets/LabStock.webp';
import tourCover from '../assets/TourCraft.webp';
import ls1 from '../assets/LS1.webp';
import ls2 from '../assets/LS2.webp';
import ls3 from '../assets/LS3.webp';
import ls4 from '../assets/LS4.webp';
import ls5 from '../assets/LS5.webp';
import ls6 from '../assets/LS6.webp';
import tc1 from '../assets/TC1.webp';
import tc2 from '../assets/TC2.webp';
import tc3 from '../assets/TC3.webp';
import tc4 from '../assets/TC4.webp';
import tc5 from '../assets/TC5.webp';
export const contact = {
  email: 'santiagocalderon1703@icloud.com',
  whatsapp: '525632131110',
  // Número del CV original; confirmar que está habilitado en WhatsApp.
  linkedin: 'https://www.linkedin.com/in/santiagocalderondev/',
  github: 'https://github.com/SantiagoC-dev',
  cv: '/SantiagoCalderonCV.pdf'
};
export const projects = [{
  id: '1',
  slug: 'labstock',
  name: 'LabStock',
  cover: labCover,
  preview: [ls2, ls5],
  gallery: [ls1, ls2, ls3, ls4, ls5, ls6],
  device: 'mobile',
  stack: ['React Native', 'Node.js', 'MySQL']
}, {
  id: '2',
  slug: 'tourcraft',
  name: 'TourCraft',
  cover: tourCover,
  preview: [tc1],
  gallery: [tc1, tc2, tc3, tc4, tc5],
  device: 'desktop',
  stack: ['React', 'Vite', 'Node.js', 'MongoDB']
}];
export const stack = [{
  key: 'frontend',
  items: ['React', 'React Native', 'Vue.js', 'JavaScript', 'TypeScript', 'Tailwind CSS']
}, {
  key: 'backend',
  items: ['Node.js', 'Python', 'C++']
}, {
  key: 'data',
  items: ['MySQL', 'MongoDB']
}, {
  key: 'tools',
  items: ['Figma', 'Git', 'Vite']
}];
