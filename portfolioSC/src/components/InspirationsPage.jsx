import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// ─── TARJETA ───
const TypographicFlipCard = ({ item, variants }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation();

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
      className={`relative group cursor-pointer h-full min-h-[400px] md:min-h-[460px] ${item.colSpan}`}
      style={{ perspective: 1500 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
      >

        {/* ─── FRONT ─── */}
        <div 
          className="absolute inset-0 w-full h-full 
          bg-white dark:bg-gray-900 
          rounded-2xl overflow-hidden 
          border border-gray-200 dark:border-gray-800 
          shadow-sm dark:shadow-black/20 
          flex flex-col justify-end 
          transition-colors duration-500 
          group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Letra gigante */}
          <div className="absolute -bottom-10 -right-4 text-[250px] md:text-[300px] font-serif font-bold 
          text-gray-100/60 dark:text-gray-800/40 
          leading-none select-none pointer-events-none 
          group-hover:scale-110 transition-transform duration-1000 ease-out">
            {item.letter}
          </div>

          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                {item.overline}
              </span>

              {/* Botón + */}
              <div className="w-8 h-8 rounded-full 
              bg-gray-100 dark:bg-gray-800 
              flex items-center justify-center 
              text-gray-400 dark:text-gray-500 
              shrink-0 
              group-hover:bg-gray-900 group-hover:text-white 
              dark:group-hover:bg-white dark:group-hover:text-gray-900 
              transition-colors duration-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white tracking-wide mt-auto">
              {item.title}
            </h3>
          </div>
        </div>

        {/* ─── BACK ─── */}
        <div 
          className="absolute inset-0 w-full h-full 
          bg-gray-900 dark:bg-gray-950 
          rounded-2xl overflow-hidden 
          shadow-xl dark:shadow-black/40 
          p-8 md:p-12 flex flex-col justify-center text-center items-center 
          border border-gray-800"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-6 block">
              {t('inspirations.ui.whyInspires')}
            </span>

            <p className="text-gray-200 dark:text-gray-300 font-serif italic text-lg md:text-xl leading-relaxed max-w-sm">
              "{item.description}"
            </p>
            
            <div className="mt-10 text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              {t('inspirations.ui.back')}
            </div>
        </div>

      </motion.div>
    </motion.div>
  );
};


// ─── MAIN ───
export default function InspirationsPage() {
  const { t } = useTranslation();

  const bentoVisualData = {
    1: { letter: "M", colSpan: "md:col-span-2" },
    2: { letter: "J", colSpan: "md:col-span-1" },
    3: { letter: "D", colSpan: "md:col-span-1" },
    4: { letter: "N", colSpan: "md:col-span-1" },
    5: { letter: "L", colSpan: "md:col-span-1" },
    6: { letter: "R", colSpan: "md:col-span-1" },
    7: { letter: "W", colSpan: "md:col-span-2" }
  };

  const inspirations = t('inspirations.bento', { returnObjects: true }).map(item => ({
    ...item,
    letter: bentoVisualData[item.id]?.letter,
    colSpan: bentoVisualData[item.id]?.colSpan
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    // Se quitaron las clases de bg para dejar pasar el fondo global de App.jsx
    <div className="min-h-screen text-gray-900 dark:text-white pt-40 md:pt-48 pb-32 transition-colors duration-300">
      
      {/* HEADER */}
      <section className="text-center mb-20 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-gray-900 dark:text-white"
        >
          {t('inspirations.header.title')}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {t('inspirations.header.description')}
        </motion.p>
      </section>

      {/* GRID */}
      <section className="max-w-6xl mx-auto px-4 mb-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {inspirations.map((item) => (
            <TypographicFlipCard key={item.id} item={item} variants={itemVariants} />
          ))}
        </motion.div>
      </section>

      {/* MEMORIAL */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative py-20 md:py-32 border-t border-gray-200 dark:border-gray-800 text-center flex flex-col items-center transition-colors duration-300"
        >
          <div className="w-px h-16 bg-gradient-to-b from-gray-200 dark:from-gray-800 to-transparent absolute top-0"></div>
          
          <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-10 block">
            {t('inspirations.memorial.overline')}
          </span>
          
          <h2 className="text-3xl md:text-5xl font-serif text-gray-900 dark:text-white mb-12 tracking-wide">
            {t('inspirations.memorial.name')}
          </h2>
          
          <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-400 font-light leading-relaxed md:leading-loose max-w-3xl italic">
            {t('inspirations.memorial.quote')}
          </p>
        </motion.div>
      </section>

    </div>
  );
}