import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import JourneyImage1 from '../assets/Journey1.png';
import JourneyImage2 from '../assets/Journey2.png';
import JourneyImage3 from '../assets/Journey3.png';
import JourneyImage4 from '../assets/Journey4.png';

const journeyImages = [
  JourneyImage1, 
  JourneyImage2, 
  JourneyImage3, 
  JourneyImage4
];

const dotPositionsX = [100, 367, 633, 900];
const PROGRESS_BY_INDEX = [0, 0.333, 0.666, 1.0];

// Medidas del riel vertical en móvil
const MOBILE_ROW_HEIGHT = 44;
const MOBILE_ROW_GAP = 24;

export default function MyJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  const journeyData = journeyImages.map((image, index) => ({
    id: index,
    year: t(`journey.stages.${index}.year`),
    title: t(`journey.stages.${index}.title`),
    description: t(`journey.stages.${index}.description`),
    image: image,
  }));

  const mobileTrackLength = (journeyData.length - 1) * (MOBILE_ROW_HEIGHT + MOBILE_ROW_GAP);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => Math.min(prev + 1, journeyImages.length - 1));
    } else if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16 md:py-32 border-t border-gray-200 dark:border-gray-800 text-center transition-colors duration-300">
      
      <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase mb-3 md:mb-4 block">
        {t('journey.subtitle')}
      </span>
      <h2 className="text-3xl md:text-5xl font-serif mb-10 md:mb-16 tracking-tight text-gray-900 dark:text-white transition-colors duration-300">
        {t('journey.title')}
      </h2>

      {/* ── LÍNEA DEL TIEMPO RESPONSIVA ── */}
      
      {/* VERSIÓN MÓVIL: Vertical con la tipografía general de la app */}
      <div className="flex md:hidden justify-center mb-12">
        <div className="relative w-full max-w-xs">
          
          {/* Riel base */}
          <div
            className="absolute left-[7px] w-[2px] bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
            style={{ top: MOBILE_ROW_HEIGHT / 2, height: mobileTrackLength }}
          />

          {/* Riel de progreso */}
          <motion.div
            className="absolute left-[7px] w-[2px] bg-gray-900 dark:bg-white origin-top"
            style={{ top: MOBILE_ROW_HEIGHT / 2, height: mobileTrackLength }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: activeIndex / (journeyData.length - 1) }}
            transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
          />

          <div className="flex flex-col gap-6">
            {journeyData.map((stage, index) => {
              const isActive = activeIndex === index;
              const isPast = index <= activeIndex;

              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileTap={{ scale: 0.97 }}
                  className="relative h-11 w-full flex items-center gap-4 text-left"
                >
                  {/* Punto */}
                  <span className="relative z-10 flex items-center justify-center w-4 h-4 shrink-0">
                    {isActive && (
                      <motion.span
                        className="absolute w-4 h-4 rounded-full border border-gray-900 dark:border-white"
                        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <span
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        isPast ? 'bg-gray-900 dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    />
                  </span>

                  {/* Año (Tipografía normal de la app, sin font-mono) */}
                  <span
                    className={`text-xs tracking-wider shrink-0 transition-colors duration-300 ${
                      isActive ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400 dark:text-gray-600'
                    }`}
                  >
                    {stage.year}
                  </span>

                  {/* Título */}
                  <span
                    className={`flex-1 min-w-0 truncate text-sm tracking-wide transition-colors duration-300 ${
                      isActive
                        ? 'text-gray-900 dark:text-white font-medium'
                        : 'text-gray-400 dark:text-gray-500 font-light'
                    }`}
                  >
                    {stage.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* VERSIÓN PC: Horizontal SVG Arquitectónica — tamaño original (1000px), escala fluida */}
      <div className="hidden md:block w-full max-w-[1000px] mx-auto mb-16 overflow-visible">
        <svg
          viewBox="0 0 1000 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          <line
            x1="100" y1="40" x2="900" y2="40"
            className="stroke-gray-200 dark:stroke-gray-800 transition-colors duration-300"
            strokeWidth="2" strokeLinecap="round"
          />

          <motion.line
            x1="100" y1="40" x2="900" y2="40"
            className="stroke-gray-900 dark:stroke-white transition-colors duration-300"
            strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: PROGRESS_BY_INDEX[activeIndex] }}
            transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
          />

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

                <line
                  x1={cx} y1={48} x2={cx} y2={62}
                  className="stroke-gray-200 dark:stroke-gray-800 transition-colors duration-300"
                  strokeWidth={1}
                />

                {isActive && (
                  <motion.circle
                    cx={cx} cy={40} fill="none"
                    className="stroke-gray-900 dark:stroke-white"
                    strokeWidth={1}
                    initial={{ r: 8, opacity: 0.8 }}
                    animate={{ r: 24, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                <motion.circle
                  cx={cx} cy={40} r={8} fill="none"
                  className="stroke-gray-900 dark:stroke-white"
                  strokeWidth={1.5}
                  initial={false}
                  animate={{ 
                    scale: isActive ? 1 : 0, 
                    opacity: isActive ? 1 : 0 
                  }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                />

                <circle
                  cx={cx} cy={40} r={4}
                  className={`transition-colors duration-300 ${
                    isPast
                      ? 'fill-gray-900 dark:fill-white'
                      : 'fill-gray-300 dark:fill-gray-700 group-hover:fill-gray-500 dark:group-hover:fill-gray-500'
                  }`}
                />

                <text
                  x={cx} y={78} textAnchor="middle"
                  className={`select-none transition-colors duration-300 ${
                    isActive
                      ? 'fill-gray-900 dark:fill-white font-semibold'
                      : 'fill-gray-400 dark:fill-gray-500 font-normal group-hover:fill-gray-600 dark:group-hover:fill-gray-300'
                  }`}
                  style={{
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.1em"
                  }}
                >
                  {journeyData[index].year}
                </text>
              </g>
            );
          })}
        </svg>
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
          <h3 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white mb-3 md:mb-4 tracking-tight transition-colors duration-300">
            {journeyData[activeIndex].title}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-8 md:mb-12 max-w-2xl text-sm md:text-lg transition-colors duration-300">
            {journeyData[activeIndex].description}
          </p>

          <div className="overflow-hidden rounded-xl md:rounded-2xl bg-gray-100 dark:bg-gray-900 w-full max-w-4xl aspect-video md:aspect-[21/9] shadow-md group transition-colors duration-300 relative">
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