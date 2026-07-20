import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('ES');
  const location = useLocation();

  // ─── LÓGICA DEL SMART HEADER ───
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(language === 'EN' ? 'ES' : 'EN');

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre mí', path: '/about' },
    { name: 'Portafolio', path: '/portfolio' }
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
      {/* ─── DOCK FLOTANTE ─── */}
      <nav className="bg-white/80 backdrop-blur-xl border border-gray-200/80 rounded-full p-2 flex items-center justify-between md:grid md:grid-cols-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] pointer-events-auto w-full max-w-4xl">

        <div className="hidden md:block"></div>

        {/* ─── ENLACES CENTRALES (Fondo eliminado, diseño libre) ─── */}
        <div className="flex items-center justify-center gap-1 md:gap-2 mx-auto md:mx-0">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                // Ajustamos paddings y cambiamos colores para el contraste extremo
                className={`relative px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors rounded-full whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    // Pastilla oscura de alto contraste con sombra
                    className="absolute inset-0 bg-gray-900 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* ─── UTILIDADES (IDIOMA & TEMA) ─── */}
        <div className="flex items-center justify-end gap-1 md:gap-2 pr-1 md:pr-2">
          
          <button 
            onClick={toggleLanguage}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-[10px] md:text-xs font-bold text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
            title="Cambiar idioma"
          >
            {language}
          </button>
          
          <div className="w-px h-3 md:h-4 bg-gray-200"></div>

          <button 
            onClick={toggleTheme}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
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