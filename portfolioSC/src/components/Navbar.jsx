import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogoB from '../assets/LogoB.png';
import LogoN from '../assets/LogoN.png';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Guardamos el idioma actual de forma segura (si no existe, por defecto es 'es')
  const currentLang = i18n?.language || 'es';

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const links = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.portfolio'), path: '/portfolio' }
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 }
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 md:pt-8 px-4 pointer-events-none"
    >
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-gray-700/80 rounded-full p-2 flex items-center justify-between md:grid md:grid-cols-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] pointer-events-auto w-full max-w-4xl transition-colors duration-300">

        <div className="flex items-center pl-2 md:pl-4">
          <Link to="/" className="flex items-center hover:opacity-70 transition-opacity">
            <img 
              src={isDarkMode ? LogoB : LogoN} 
              alt="Mi Logo" 
              className="h-10 md:h-11 w-auto object-contain scale-125 md:scale-150 transform origin-left translate-y-[2px]"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1 md:gap-2 mx-auto md:mx-0">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors rounded-full whitespace-nowrap flex items-center justify-center overflow-hidden ${
                  isActive 
                    ? 'text-white dark:text-gray-900' 
                    : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {/* Ahora usamos la variable segura `currentLang` */}
                <motion.span 
                  key={currentLang}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10"
                >
                  {link.name}
                </motion.span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-1 md:gap-2 pr-1 md:pr-2">
          
          <button 
            onClick={toggleLanguage}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-[10px] md:text-xs font-bold text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 overflow-hidden"
            title="Cambiar idioma"
          >
            {/* Animación blindada contra el error de undefined */}
            <motion.span
              key={currentLang}
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {currentLang.toUpperCase()}
            </motion.span>
          </button>
          
          <div className="w-px h-3 md:h-4 bg-gray-200 dark:bg-gray-700"></div>

          <button 
            onClick={toggleTheme}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300"
            title="Alternar modo oscuro"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {isDarkMode ? (
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </motion.div>
          </button>

        </div>
      </nav>
    </motion.header>
  );
}