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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto pt-28 md:pt-40 pb-12 px-6 md:px-20 flex flex-col md:flex-row items-center md:items-center md:justify-between gap-16 md:gap-20 min-h-[90vh] transition-colors duration-300">

      {/* TEXT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="md:w-[48%] max-w-xl z-10 flex flex-col justify-center min-h-[420px]"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-serif tracking-tight leading-tight text-gray-900 dark:text-white"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-500 dark:text-gray-400 mt-6 mb-10 max-w-md font-light leading-relaxed min-h-[120px]"
        >
          {t('hero.description')}
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            navigate('/portfolio');
            window.scrollTo(0, 0);
          }}
          className="w-fit bg-black text-white dark:bg-white dark:text-gray-900 px-8 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 font-medium text-sm tracking-wide"
        >
          {t('hero.button')}
        </motion.button>
      </motion.div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="md:w-[48%] flex justify-center relative"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
          className="relative w-[320px] h-[420px] md:w-[420px] md:h-[520px]"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 dark:from-gray-800 to-transparent blur-3xl opacity-40 rounded-3xl"></div>

          <img
            src={miFoto}
            alt={t('hero.imageAlt')}
            className="relative w-full h-full object-cover rounded-3xl shadow-2xl z-10"
          />

          {/* Marco */}
          <div className="absolute -inset-6 border border-gray-200 dark:border-gray-700 rounded-3xl rotate-2 opacity-60"></div>
        </motion.div>
      </motion.div>

    </section>
  );
}