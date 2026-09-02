import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import Tennis1 from '../assets/Tennis1.jpg';
import Tennis2 from '../assets/Tennis2.jpeg';
import Music1 from '../assets/Music1.jpg';
import Music2 from '../assets/Music2.jpg';
import Watch1 from '../assets/Watch1.jpg';
import Watch2 from '../assets/Watch2.jpg';
import Books1 from '../assets/Books1.jpg';
import Books2 from '../assets/Books2.jpg';
import eSport1 from '../assets/eSport1.jpg';
import eSport2 from '../assets/eSport2.jpg';

const hobbyImages = {
  1: { primary: Tennis2, secondary: Tennis1 },
  2: { primary: eSport1, secondary: eSport2 },
  3: { primary: Watch2, secondary: Watch1 },
  4: { primary: Music1, secondary: Music2 },
  5: { primary: Books2, secondary: Books1 }
};

const ParallaxHobby = ({ hobby, index }) => {
  const ref = useRef(null);
  
  // Detectamos si es móvil para apagar el parallax costoso y mejorar rendimiento
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Si es móvil, anulamos el movimiento (0%) para que el celular no calcule parallax pesado.
  // Si es PC, activamos los movimientos amplios.
  const yText = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["5%", "-5%"]);
  const yNumber = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-15%", "15%"]);
  const yImagePrimary = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["10%", "-10%"]);
  const yImageSecondary = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-15%", "15%"]);

  const isEven = index % 2 === 0;

  return (
    <section 
      ref={ref} 
      className="relative min-h-[70vh] lg:min-h-[90vh] flex items-center justify-center py-16 lg:py-32 overflow-hidden transition-colors duration-300"
    >
      {/* En móvil usamos flex-col, en PC grid */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* IMÁGENES (Aparecen primero en móvil, ordenadas por grid en PC) */}
        <div className={`w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] relative mb-12 lg:mb-0 lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Principal */}
          <motion.div 
            style={{ y: yImagePrimary, z: 0 }}
            className={`absolute top-0 w-4/5 lg:bottom-10 h-full lg:h-auto overflow-hidden rounded-2xl 
            bg-gray-100 dark:bg-gray-900 
            shadow-xl dark:shadow-black/30 will-change-transform
            ${isEven ? 'right-0 lg:right-0' : 'left-0 lg:left-0'}`}
          >
            <img 
              src={hobby.imgPrimary} 
              alt={hobby.title} 
              loading="lazy" 
              decoding="async"
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-[filter] duration-700"
            />
          </motion.div>

          {/* Secundaria */}
          <motion.div 
            style={{ y: yImageSecondary, z: 0 }}
            className={`absolute bottom-[-10%] lg:bottom-0 w-2/5 aspect-[4/5] overflow-hidden rounded-2xl 
            bg-white dark:bg-gray-950 
            p-1.5 lg:p-2 shadow-2xl dark:shadow-black/40 will-change-transform
            ${isEven ? 'left-2 sm:left-10 lg:left-10' : 'right-2 sm:right-10 lg:right-10'}`}
          >
            <div className="w-full h-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900">
              <img 
                src={hobby.imgSecondary} 
                alt={`${hobby.title} detalle`}
                loading="lazy" 
                decoding="async" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

        </div>

        {/* TEXTO Y NÚMERO DE FONDO */}
        <motion.div 
          style={{ y: yText, z: 0 }}
          className={`relative w-full lg:col-span-5 flex flex-col z-10 will-change-transform text-center lg:text-left mt-8 lg:mt-0 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {/* Número gigante (más sutil en móvil para no estorbar la lectura) */}
          <motion.div 
            style={{ y: yNumber, z: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[16rem] font-serif font-bold 
            text-gray-100 dark:text-gray-800/80 
            select-none -z-10 leading-none tracking-tighter will-change-transform pointer-events-none"
          >
            {hobby.id}
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif mb-4 lg:mb-8 tracking-tight text-gray-900 dark:text-white">
            {hobby.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-base sm:text-lg lg:text-xl px-2 lg:px-0">
            {hobby.description}
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default function HobbiesPage() {
  const { t } = useTranslation();

  const hobbiesData = t('hobbies.items', { returnObjects: true }).map(hobby => ({
    ...hobby,
    imgPrimary: hobbyImages[hobby.id]?.primary,
    imgSecondary: hobbyImages[hobby.id]?.secondary
  }));

  return (
    <div className="min-h-screen text-gray-900 dark:text-white pt-32 md:pt-48 pb-20 lg:pb-32 transition-colors duration-300">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-12 lg:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-serif mb-4 lg:mb-6 tracking-tight text-gray-900 dark:text-white"
        >
          {t('hobbies.header.title')}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 font-light text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {t('hobbies.header.description')}
        </motion.p>
      </section>

      {/* Lista */}
      <div className="flex flex-col">
        {hobbiesData.map((hobby, index) => (
          <ParallaxHobby 
            key={hobby.id} 
            hobby={hobby} 
            index={index} 
          />
        ))}
      </div>

    </div>
  );
}