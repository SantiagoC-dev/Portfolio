import { useRef } from 'react';
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

const ParallaxHobby = ({ hobby, index, hobbyLabel }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yImagePrimary = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const yImageSecondary = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const isEven = index % 2 === 0;

  return (
    <section 
      ref={ref} 
      className="relative min-h-[90vh] flex items-center justify-center py-24 md:py-32 overflow-hidden transition-colors duration-300"
    >
      {/* Número fondo */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        text-[25vw] md:text-[18vw] font-serif font-bold 
        text-gray-100 dark:text-gray-900 
        select-none -z-10 leading-none tracking-tighter"
      >
        0{hobby.id}
      </motion.div>

      <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Texto */}
        <motion.div 
          style={{ y: yText }}
          className={`lg:col-span-5 flex flex-col z-10 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-gray-300 dark:bg-gray-800"></span>
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              {hobbyLabel} 0{hobby.id}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif mb-8 tracking-tight text-gray-900 dark:text-white">
            {hobby.title}
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-lg md:text-xl">
            {hobby.description}
          </p>
        </motion.div>

        {/* Imágenes */}
        <div className={`lg:col-span-7 relative w-full h-[50vh] md:h-[70vh] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Principal */}
          <motion.div 
            style={{ y: yImagePrimary }}
            className={`absolute top-0 bottom-10 w-4/5 overflow-hidden rounded-2xl 
            bg-gray-100 dark:bg-gray-900 
            shadow-xl dark:shadow-black/30 
            ${isEven ? 'right-0' : 'left-0'}`}
          >
            <img 
              src={hobby.imgPrimary} 
              alt={hobby.title} 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Secundaria */}
          <motion.div 
            style={{ y: yImageSecondary }}
            className={`absolute bottom-0 w-2/5 aspect-[4/5] overflow-hidden rounded-2xl 
            bg-white dark:bg-gray-950 
            p-2 shadow-2xl dark:shadow-black/40 
            ${isEven ? 'left-4 md:left-10' : 'right-4 md:right-10'}`}
          >
            <div className="w-full h-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900">
              <img 
                src={hobby.imgSecondary} 
                alt={`${hobby.title} detalle`} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

        </div>
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

  const hobbyLabel = t('hobbies.ui.hobbyLabel');

  return (
    <div className="min-h-screen bg-transparent dark:bg-gray-950 text-gray-900 dark:text-white pt-40 md:pt-48 pb-32 transition-colors duration-300">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-10 md:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-gray-900 dark:text-white"
        >
          {t('hobbies.header.title')}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
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
            hobbyLabel={hobbyLabel} 
          />
        ))}
      </div>

    </div>
  );
}