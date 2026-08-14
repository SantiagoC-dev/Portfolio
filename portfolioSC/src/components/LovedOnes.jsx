import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// ─── COMPONENTE INDIVIDUAL DE TESTIMONIO ───
const InteractiveTestimonialCard = ({ item, t }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [3, -3]);
  const rotateY = useTransform(x, [0, 1], [-3, 3]);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleReveal}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000
      }}
      // snap-center: ajusta al centro. md:w y md:min-h aumentados para PC.
      className="w-[300px] sm:w-[350px] md:w-[450px] flex-shrink-0 snap-center snap-always border border-gray-100 dark:border-gray-800 rounded-3xl p-7 md:p-10 bg-white dark:bg-gray-900 flex flex-col justify-between min-h-[280px] md:min-h-[300px] select-none shadow-sm hover:shadow-2xl dark:hover:shadow-gray-950/40 transition-shadow duration-500 relative overflow-hidden group cursor-pointer box-border mx-2 md:mx-4"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          x: useTransform(x, [0, 1], [-5, 5]),
          y: useTransform(y, [0, 1], [-5, 5]),
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
        <motion.p 
          className="text-gray-700 dark:text-gray-300 italic font-light text-base md:text-xl leading-relaxed mb-8 md:mb-10 text-left h-full flex items-center"
          initial={false}
          animate={{ 
            filter: isRevealed ? "blur(0px)" : "blur(8px)",
            opacity: isRevealed ? 1 : 0.4
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
         {item.quote}
        </motion.p>

        {!isRevealed && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/70 dark:bg-white/80 backdrop-blur-sm text-white dark:text-gray-900 text-xs font-medium px-4 py-2 rounded-full shadow-lg tracking-wider uppercase">
                    {t('lovedOnes.tapToRead')}
                </span>
            </div>
        )}

        <div className="flex items-center gap-4 mt-auto shrink-0">
          <motion.div 
            style={{
              x: useTransform(x, [0, 1], [-3, 3]),
              y: useTransform(y, [0, 1], [-3, 3]),
            }}
            className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-950 dark:text-white font-serif text-lg md:text-xl Transition-colors duration-500 group-hover:bg-gray-100 dark:group-hover:bg-gray-700"
          >
            {item.initials}
          </motion.div>

          <motion.div
            style={{
              x: useTransform(x, [0, 1], [-2, 2]),
            }}
            className="min-w-0 flex-1 text-left"
          >
            <h4 className="text-base font-semibold text-gray-950 dark:text-white tracking-tight truncate">{item.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-snug truncate">{item.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── COMPONENTE PRINCIPAL ───
export default function LovedOnes() {
  const { t } = useTranslation();
  const testimonials = t('lovedOnes.testimonials', { returnObjects: true });
  const scrollRef = useRef(null);
  
  // Estados para controlar la visibilidad de las sombras de scroll
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const checkScroll = () => {
    const contenedor = scrollRef.current;
    if (contenedor) {
      const { scrollLeft, scrollWidth, clientWidth } = contenedor;
      setShowLeftShadow(scrollLeft > 10);
      // Margen de 1px para evitar problemas de redondeo
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const contenedor = scrollRef.current;
    if (contenedor) {
      checkScroll(); // Comprobación inicial
      contenedor.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll); // Re-comprobar si cambia el tamaño de ventana
      
      return () => {
        contenedor.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [testimonials]);

  // Clase base para las sombras, usando pseudo-elementos o divs absolutos.
  // Usaremos divs absolutos para mayor compatibilidad inline.
  const shadowClass = "absolute top-0 bottom-0 w-16 z-20 pointer-events-none transition-opacity duration-300";

  return (
    // ✅ CORRECCIÓN 2: Espaciado al footer acortado sutilmente (pb-16 -> pb-10, md:pb-28 -> md:pb-20)
    // También se ajusta overflow y padding dinámico para contener las sombras de las tarjetas.
    <section className="w-full max-w-[1600px] mx-auto px-0 pt-16 pb-10 md:pt-28 md:pb-20 border-t border-gray-200 dark:border-gray-800 text-center transition-colors duration-300 box-border relative overflow-hidden">
      
      {/* HEADER - Minimalista, sin la etiqueta de scroll */}
      <div className="max-w-6xl mx-auto mb-12 md:mb-16 px-6 sm:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif tracking-tight text-gray-950 dark:text-white"
        >
          {t('lovedOnes.title')}
        </motion.h2>
      </div>

      {/* CONTENEDOR RELATIVO PARA LAS SOMBRAS Y EL SCROLL */}
      <div className="relative w-full">
        
        {/* Sombras de Scroll (Scroll Shadows) - Indicador minimalista y profesional */}
        <div 
          className={`${shadowClass} left-0 bg-gradient-to-r from-white dark:from-gray-950 to-transparent`}
          style={{ opacity: showLeftShadow ? 1 : 0 }}
        />
        <div 
          className={`${shadowClass} right-0 bg-gradient-to-l from-white dark:from-gray-950 to-transparent`}
          style={{ opacity: showRightShadow ? 1 : 0 }}
        />

        {/* CONTENEDOR DEL SCROLL MANUAL */}
        {/* ✅ CORRECCIÓN 1: Padding inferior aumentado (pb-8 -> pb-14) para evitar corte de sombras en hover */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth box-border scrollbar-hide active:cursor-grabbing group pt-4 pb-14"
          style={{ 
            perspective: 1200,
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none',  // IE/Edge
            // Padding dinámico: grande en móvil para peek-a-boo, centrado en PC
            paddingLeft: 'max(1.5rem, calc((100% - 1300px) / 2))',
            paddingRight: 'max(1.5rem, calc((100% - 1300px) / 2))',
          }}
        >
          {/* Estilo inline para esconder scrollbar en Chrome/Safari */}
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          <div className="flex justify-start md:justify-center flex-nowrap">
            {testimonials.map((item, index) => (
              <InteractiveTestimonialCard 
                key={`testimonial-${item.id}-${index}`} 
                item={item}
                t={t}
              />
            ))}
          </div>
          
          {/* Spacer final responsivo */}
          <div className="w-6 md:w-0 flex-shrink-0" />
        </div>
      </div>

    </section>
  );
}