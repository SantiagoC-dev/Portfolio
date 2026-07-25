import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// ─── COMPONENTE INDIVIDUAL DE TESTIMONIO CON FÍSICA 3D ───
const InteractiveTestimonialCard = ({ item, onCardPointerDown, onCardPointerUp, onCardPointerLeave }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [3, -3]);
  const rotateY = useTransform(x, [0, 1], [-3, 3]);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={onCardPointerDown}
      onPointerUp={onCardPointerUp}
      onPointerLeave={onCardPointerLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000
      }}
      className="w-[260px] sm:w-[300px] md:w-[400px] flex-shrink-0 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 md:p-8 bg-white dark:bg-gray-900 flex flex-col justify-between min-h-[240px] md:min-h-[280px] select-none mx-2 md:mx-3 shadow-sm hover:shadow-xl dark:hover:shadow-gray-950 transition-shadow duration-500 relative overflow-hidden group cursor-pointer"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 dark:to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          x: useTransform(x, [0, 1], [-5, 5]),
          y: useTransform(y, [0, 1], [-5, 5]),
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
        <p className="text-gray-600 dark:text-gray-300 italic font-light text-sm md:text-xl leading-relaxed mb-6 md:mb-8 text-left">
         {item.quote}
        </p>

        <div className="flex items-center gap-3 md:gap-4 mt-auto">
          <motion.div 
            style={{
              x: useTransform(x, [0, 1], [-3, 3]),
              y: useTransform(y, [0, 1], [-3, 3]),
            }}
            className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-900 dark:text-white font-serif text-base md:text-lg transition-colors duration-500 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600"
          >
            {item.initials}
          </motion.div>

          <motion.div
            style={{
              x: useTransform(x, [0, 1], [-2, 2]),
            }}
            className="min-w-0 flex-1 text-left"
          >
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight truncate">{item.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-snug truncate">{item.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── COMPONENTE PRINCIPAL ───
export default function LovedOnes() {
  const [isPaused, setIsPaused] = useState(false);
  
  const { t } = useTranslation();
  const testimonials = t('lovedOnes.testimonials', { returnObjects: true });

  // ─── PAUSA POR TIPO DE PUNTERO ───
  // Mouse: mantener presionado pausa, soltar reanuda.
  // Touch: cada tap alterna pausa/reanuda.
  const handleCardPointerDown = (e) => {
    if (e.pointerType === 'mouse') {
      setIsPaused(true);
    }
  };

  const handleCardPointerUp = (e) => {
    if (e.pointerType === 'mouse') {
      setIsPaused(false);
    } else if (e.pointerType === 'touch') {
      setIsPaused((prev) => !prev);
    }
  };

  const handleCardPointerLeave = (e) => {
    // Si sueltan el mouse fuera de la tarjeta mientras lo mantenían
    // presionado, evita que el carrusel quede pausado sin querer.
    if (e.pointerType === 'mouse') {
      setIsPaused(false);
    }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-32 border-t border-gray-200 dark:border-gray-800 text-center overflow-hidden transition-colors duration-300 box-border">
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50%)); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
          width: max-content;
        }
      `}</style>

      {/* HEADER ADAPTATIVO */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-14 max-w-6xl mx-auto gap-4 md:gap-0 px-2">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-serif tracking-wide text-gray-900 dark:text-white"
        >
          {t('lovedOnes.title')}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-gray-400 select-none"
        >
          <span className="text-[10px] md:text-xs tracking-widest font-medium uppercase">
            {isPaused ? t('lovedOnes.status.paused') : t('lovedOnes.status.playing')}
          </span>
          <div className="w-8 md:w-10 h-[2px] bg-gray-200 dark:bg-gray-800 relative overflow-hidden rounded-full">
            <motion.div
              animate={isPaused ? { x: "0%" } : { x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className={`absolute w-1/2 h-full rounded-full ${isPaused ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-800 dark:bg-white'}`}
            />
          </div>
        </motion.div>
      </div>

      {/* CONTENEDOR DEL CARRUSEL INFINITO CON ENCAPSULAMIENTO ESTRICTO */}
      <div 
        className="w-full overflow-hidden group pb-4 md:pb-10 box-border"
        style={{ perspective: 1200 }}
      >
        <div 
          className="flex animate-scroll"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {testimonials.map((item, index) => (
            <InteractiveTestimonialCard 
              key={`original-${item.id}-${index}`} 
              item={item}
              onCardPointerDown={handleCardPointerDown}
              onCardPointerUp={handleCardPointerUp}
              onCardPointerLeave={handleCardPointerLeave}
            />
          ))}
          {testimonials.map((item, index) => (
            <InteractiveTestimonialCard 
              key={`copy-${item.id}-${index}`} 
              item={item}
              onCardPointerDown={handleCardPointerDown}
              onCardPointerUp={handleCardPointerUp}
              onCardPointerLeave={handleCardPointerLeave}
            />
          ))}
        </div>
      </div>

    </section>
  );
}