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
    hidden: { opacity: 0, x: -50, filter: "blur(8px)" }, 
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto pt-28 md:pt-50 pb-12 pr-10 pl-10 md:pl-20 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 min-h-[90vh] transition-colors duration-300">

      {/* TEXT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="md:w-1/2 z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-serif tracking-tight leading-tight text-gray-900 dark:text-white transition-colors duration-300"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-500 dark:text-gray-300 mt-6 mb-10 max-w-md font-light leading-relaxed min-h-[100px] transition-colors duration-300"
        >
          {t('hero.description')}
        </motion.p>

        {/* BOTÓN PREMIUM (Breathing Glow + Arrow) */}
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
            onClick={() => {
              navigate('/portfolio');
              window.scrollTo(0, 0);
            }}
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

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
          className="relative w-[320px] h-[420px] md:w-[420px] md:h-[520px]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 dark:from-gray-800 to-transparent blur-3xl opacity-40 rounded-3xl transition-colors duration-300"></div>

          <img
            src={miFoto}
            alt={t('hero.imageAlt')}
            className="relative w-full h-full object-cover rounded-3xl shadow-2xl z-10"
          />

          <div className="absolute -inset-6 border border-gray-200 dark:border-gray-700 rounded-3xl rotate-2 opacity-60 transition-colors duration-300"></div>
        </motion.div>
      </motion.div>
      
    </section>
  );
}