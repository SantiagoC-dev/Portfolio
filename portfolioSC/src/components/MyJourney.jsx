import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const journeyData = [
  {
    id: 0,
    year: "Ene 2022",
    title: "Inicios en la Ingeniería",
    description: "Comencé la carrera de Ingeniería en Sistemas Computacionales en el Tecnológico de Chalco. Sin embargo, decidí reorientar mi camino para enfocarme de lleno en el desarrollo directo de software y sistemas.",
    // Recuerda cambiar estas URLs por tus imágenes locales en la carpeta assets
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=90",
  },
  {
    id: 1,
    year: "Nov 2023",
    title: "Enfoque Multiplataforma",
    description: "Inicié la carrera de Desarrollo de Software Multiplataforma en la Riviera Maya, cursando el programa bajo un sistema bilingüe que amplió mi visión técnica y profesional.",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1000&auto=format&fit=crop&q=90",
  },
  {
    id: 2,
    year: "Dic 2025",
    title: "Técnico Superior Universitario",
    description: "Concluí con éxito mi primera etapa profesional, obteniendo el título como Técnico Superior Universitario (TSU) en Desarrollo de Software Multiplataforma.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=90",
  },
  {
    id: 3,
    year: "May 2026",
    title: "Innovación Digital",
    description: "Actualmente curso la Ingeniería en Tecnologías de la Información e Innovación Digital en la Universidad Tecnológica de Nezahualcóyotl, consolidando mi perfil como ingeniero.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1000&auto=format&fit=crop&q=90",
  }
];

// Eje X recalculado para 4 nodos (dividiendo los 800px de recorrido en 3 segmentos iguales)
const dotPositionsX = [100, 367, 633, 900];
const PROGRESS_BY_INDEX = [0, 0.333, 0.666, 1.0];

export default function MyJourney() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Navegación por teclado (Flechas Izquierda / Derecha) adaptada dinámicamente
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => Math.min(prev + 1, journeyData.length - 1));
    } else if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-32 border-t border-gray-200 text-center">
      
      <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 block">
        Línea de tiempo
      </span>
      <h2 className="text-4xl md:text-5xl font-serif mb-20 tracking-tight text-gray-900">
        Mi trayectoria
      </h2>

      {/* ── LÍNEA DEL TIEMPO (Estilo Arquitectónico) ── */}
      <div className="w-full mb-20 overflow-x-auto overflow-y-hidden pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="min-w-[1000px] mx-auto flex justify-center relative">
          
          <svg
            viewBox="0 0 1000 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[1000px] overflow-visible"
            style={{ height: 100 }}
          >
            {/* Eje base (Línea gris clara) */}
            <line
              x1="100" y1="40" x2="900" y2="40"
              stroke="#F3F4F6" strokeWidth="2" strokeLinecap="round"
            />

            {/* Eje de progreso animado (Línea oscura) */}
            <motion.line
              x1="100" y1="40" x2="900" y2="40"
              stroke="#111827" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: PROGRESS_BY_INDEX[activeIndex] }}
              transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
            />

            {/* Nodos Interactivos */}
            {dotPositionsX.map((cx, index) => {
              const isActive = activeIndex === index;
              const isPast = index <= activeIndex;

              return (
                <g
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer group outline-none"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(index)}
                >
                  <circle cx={cx} cy={40} r={30} fill="transparent" />

                  {isActive && (
                    <motion.circle
                      cx={cx} cy={40} fill="none" stroke="#111827" strokeWidth={1}
                      initial={{ r: 8, opacity: 0.8 }}
                      animate={{ r: 24, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}

                  <motion.circle
                    cx={cx} cy={40} r={8} fill="none" stroke="#111827" strokeWidth={1.5}
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1 : 0, 
                      opacity: isActive ? 1 : 0 
                    }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                  />

                  <motion.circle
                    cx={cx} cy={40} r={4}
                    initial={false}
                    animate={{ fill: isPast ? "#111827" : "#E5E7EB" }}
                    className="group-hover:fill-gray-400 transition-colors duration-300"
                  />

                  <motion.text
                    x={cx} y={75} textAnchor="middle" className="select-none"
                    initial={false}
                    animate={{
                      fill: isActive ? "#111827" : "#9CA3AF",
                      fontWeight: isActive ? 600 : 400
                    }}
                    style={{
                      fontFamily: "ui-sans-serif, system-ui, sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.1em"
                    }}
                  >
                    {journeyData[index].year}
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── CONTENIDO DINÁMICO DE LA ETAPA ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="flex flex-col items-center"
        >
          <h3 className="text-3xl font-serif text-gray-900 mb-4 tracking-tight">
            {journeyData[activeIndex].title}
          </h3>

          <p className="text-gray-500 font-light leading-relaxed mb-12 max-w-2xl text-base md:text-lg">
            {journeyData[activeIndex].description}
          </p>

          <div className="overflow-hidden rounded-2xl bg-gray-100 w-full max-w-4xl aspect-[16/7] md:aspect-[21/9] shadow-md group">
            <img
              src={journeyData[activeIndex].image}
              alt={journeyData[activeIndex].title}
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 ease-out hover:scale-105"
            />
          </div>
        </motion.div>
      </AnimatePresence>
      
    </section>
  );
}