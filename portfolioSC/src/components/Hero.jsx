import { motion } from 'framer-motion';
import miFoto from '../assets/yo.webp';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      }
    }
  };

  const smoothReveal = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto pt-24 md:pt-44 pb-20 md:pb-28 px-6 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 transition-colors duration-300">

      {/* TEXTO (Izquierda en PC) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left"
      >
        {/* Badge sutil de estatus (da un aire muy cotizado y profesional) */}
        <motion.div
          variants={smoothReveal}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gray-200/80 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm mb-6 text-[11px] uppercase font-semibold tracking-widest text-gray-600 dark:text-gray-300 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {/* Aquí mandamos llamar la traducción 👇 */}
          <span>{t('hero.badge')}</span> 
        </motion.div>

        {/* Título editorial de alto impacto */}
        <motion.h1
          variants={smoothReveal}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-[-0.03em] leading-[1.08] text-gray-950 dark:text-white transition-colors duration-300"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Descripción refinada */}
        <motion.p
          variants={smoothReveal}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300/90 mt-6 mb-9 max-w-md font-light leading-relaxed transition-colors duration-300"
        >
          {t('hero.description')}
        </motion.p>

        {/* Botón Call-To-Action */}
        <motion.div variants={smoothReveal} className="relative inline-flex group">
          <div
            className="absolute -inset-1 rounded-full bg-gray-950/20 dark:bg-white/25 blur-md opacity-40 transition-all duration-500 group-hover:blur-lg group-hover:opacity-100 group-hover:scale-105"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/portfolio')}
            className="relative flex items-center justify-center gap-3 bg-black text-white dark:bg-white dark:text-gray-950 px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm md:text-base tracking-wide"
          >
            <span>{t('hero.button')}</span>
            <div className="transform transition-transform duration-300 group-hover:translate-x-1.5">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* IMAGEN CON AURA REAL Y PROFUNDIDAD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.215, 0.610, 0.355, 1.000], delay: 0.2 }}
        className="w-full md:w-1/2 flex justify-center md:justify-end relative"
      >
        <motion.div
          whileHover={{ scale: 1.015 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
          className="relative w-[270px] h-[350px] sm:w-[310px] sm:h-[410px] md:w-[370px] md:h-[470px] lg:w-[410px] lg:h-[510px]"
        >
          {/* ─── AURA 1: Halo exterior amplio y luminoso (claramente visible) ─── */}
          <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-tr from-gray-400/90 via-gray-200/60 to-transparent dark:from-indigo-500/30 dark:via-white/25 dark:to-transparent blur-3xl opacity-85 pointer-events-none transition-all duration-700" />

          {/* ─── AURA 2: Núcleo de luz central cercano que realza el contorno ─── */}
          <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gray-400/30 dark:bg-white/20 blur-xl opacity-70 pointer-events-none" />

          {/* ─── CONTENEDOR DE LA FOTO (Sin bordes toscos, pero con acabado fino) ─── */}
          <div className="relative w-full h-full rounded-[2.2rem] md:rounded-[2.8rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-black/5 dark:ring-white/10 select-none">
            <img
              src={miFoto}
              alt={t('hero.imageAlt')}
              draggable="false"
              fetchPriority="high"
              className="w-full h-full object-cover object-center select-none"
            />
            {/* Gradiente sutil inferior para fundir con la iluminación sin verse como marco */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
          
        </motion.div>
      </motion.div>
      
    </section>
  );
}