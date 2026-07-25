import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogoB from '../assets/LogoB.png';
import LogoN from '../assets/LogoN.png';

export default function Navbar() {
  // ─── LÓGICA DE MODO OSCURO CON LOCALSTORAGE ───
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      // Si el usuario ya había elegido un tema antes, lo respetamos
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // Si es su primera vez, revisamos si su celular/PC está en modo oscuro
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // ─── ESTADO PARA EL MENÚ MÓVIL ───
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = i18n?.language || 'es';

  // ─── EFECTO PARA APLICAR Y GUARDAR EL TEMA ───
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Guardamos la preferencia
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Guardamos la preferencia
    }
  }, [isDarkMode]);

  // Cerrar el menú móvil si se cambia de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Bloquear el scroll de la página si el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Lógica de ocultamiento al hacer scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (!isMobileMenuOpen) {
      if (latest > previous && latest > 100) {
        if (!hidden) setHidden(true); 
      } else {
        if (hidden) setHidden(false); 
      }
    }
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const links = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.portfolio'), path: '/portfolio' }
  ];

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0, 
      transition: { duration: 0.2, ease: "easeOut" }
    },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 }
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.215, 0.610, 0.355, 1.000] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 md:pt-8 px-4 pointer-events-none"
    >
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 rounded-[2rem] md:rounded-full p-3 md:p-2 flex flex-col md:grid md:grid-cols-3 md:items-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] pointer-events-auto w-full max-w-4xl transition-all duration-300">

        {/* ─── FILA SUPERIOR (Móvil y PC) ─── */}
        <div className="flex items-center justify-between w-full md:col-start-1 md:justify-start">
          
          {/* LOGO */}
          <div className="flex items-center pl-2 md:pl-4 shrink-0">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)} // ← Eliminado scrollTo(0,0)
              className="flex items-center hover:opacity-70 transition-opacity"
            >
              <img 
                src={isDarkMode ? LogoB : LogoN} 
                alt="Mi Logo" 
                className="h-8 md:h-11 w-auto object-contain scale-125 md:scale-150 transform origin-left translate-y-[2px]"
              />
            </Link>
          </div>

          {/* BOTONES MÓVILES EXTRAS */}
          <div className="flex items-center gap-1 pr-1 md:hidden">
            {/* Idioma */}
            <button 
              onClick={toggleLanguage}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-bold text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all overflow-hidden"
            >
              <motion.span
                key={currentLang}
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {currentLang.toUpperCase()}
              </motion.span>
            </button>
            
            <div className="w-px h-3 bg-gray-200 dark:bg-gray-700"></div>

            {/* Tema */}
            <button 
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isDarkMode ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </motion.div>
            </button>

            {/* BOTÓN HAMBURGUESA CORREGIDO */}
            <button 
              onClick={toggleMobileMenu}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all ml-1 relative"
              title={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <motion.div
                className="w-5 h-4 flex flex-col justify-between items-center"
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                <motion.span 
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}
                  className="w-5 h-[2px] bg-current rounded-full origin-center transition-transform duration-200"
                />
                <motion.span 
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  className="w-5 h-[2px] bg-current rounded-full transition-opacity duration-200"
                />
                <motion.span 
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}
                  className="w-5 h-[2px] bg-current rounded-full origin-center transition-transform duration-200"
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* ─── MENÚ DESPLEGABLE MÓVIL ─── */}
        <AnimatePresence>
          {(isMobileMenuOpen || window.innerWidth >= 768) && (
            <motion.div 
              className={`md:static md:col-start-2 w-full md:w-auto flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 mx-auto pt-4 md:pt-0 overflow-hidden ${window.innerWidth < 768 ? 'absolute top-full left-0 right-0 bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 p-6 z-[60]' : ''}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              style={window.innerWidth >= 768 ? { height: 'auto', opacity: 1, position: 'static' } : {}}
            >
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)} // ← Eliminado scrollTo(0,0)
                    className={`relative w-full md:w-auto px-6 py-3 md:py-2.5 text-xs font-bold tracking-widest uppercase transition-colors rounded-full whitespace-nowrap flex items-center justify-center overflow-hidden z-10 ${
                      isActive 
                        ? 'text-white dark:text-gray-900' 
                        : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 md:hover:bg-transparent md:dark:hover:bg-transparent'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── BOTONES PC EXTRAS ─── */}
        <div className="hidden md:flex flex items-center justify-end gap-1 md:gap-2 pr-1 md:pr-2 md:col-start-3 md:justify-end">
          <button 
            onClick={toggleLanguage}
            className="w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 overflow-hidden"
          >
            <motion.span
              key={currentLang}
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {currentLang.toUpperCase()}
            </motion.span>
          </button>
          
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>

          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </motion.div>
          </button>
        </div>

      </nav>
    </motion.header>
  );
}