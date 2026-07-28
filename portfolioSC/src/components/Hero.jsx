import { motion } from 'framer-motion';
import miFoto from '../assets/yo.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, 
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    // Usamos max-w-6xl y px-6 para que coincida exactamente con los límites de Intereses y Mi Trayectoria
    <section className="relative z-10 w-full max-w-6xl mx-auto pt-24 md:pt-48 pb-12 px-6 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 min-h-[90vh] transition-colors duration-300">

      {/* TEXTO (Izquierda en PC, respetando el límite de la app) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-tight text-gray-900 dark:text-white transition-colors duration-300"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-300 mt-6 mb-8 max-w-md font-light leading-relaxed transition-colors duration-300"
        >
          {t('hero.description')}
        </motion.p>

        {/* BOTÓN PREMIUM */}
        <motion.div variants={itemVariants} className="relative inline-flex group">
          <motion.div
            animate={{ 
              opacity: [0.3, 0.6, 0.3], 
              scale: [0.95, 1.05, 0.95] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut" 
            }}
            className="absolute -inset-1 rounded-full bg-gray-400 dark:bg-white/40 blur-lg transition-all duration-300 group-hover:blur-xl group-hover:opacity-100"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/portfolio')}
            className="relative flex items-center justify-center gap-3 bg-black text-white dark:bg-white dark:text-gray-900 px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm md:text-base tracking-wide"
          >
            <span>{t('hero.button')}</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* IMAGEN (Derecha en PC, alineada con el borde derecho del contenedor) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.215, 0.610, 0.355, 1.000], delay: 0.2 }}
        className="w-full md:w-1/2 flex justify-center md:justify-end relative"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
          className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] md:w-[380px] md:h-[480px] lg:w-[420px] lg:h-[520px]"
        >
          {/* Resplandor trasero súper suave */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-300 to-transparent dark:from-gray-700/50 dark:to-transparent blur-2xl opacity-60 rounded-[2rem] md:rounded-[2.5rem] -z-10 transition-colors duration-500"></div>

          {/* Contenedor principal de la imagen */}
          <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl dark:shadow-black/60 ring-1 ring-black/5 dark:ring-white/10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <img
              src={miFoto}
              alt={t('hero.imageAlt')}
              draggable="false"
              className="w-full h-full object-cover select-none"
            />
            {/* Sombra interior para dar efecto de profundidad 3D */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2rem] md:rounded-[2.5rem] pointer-events-none transition-colors duration-300"></div>
          </div>
          
        </motion.div>
      </motion.div>
      
    </section>
  );
}