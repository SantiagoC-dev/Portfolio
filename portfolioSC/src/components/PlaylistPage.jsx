import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import PortadaJM from '../assets/PortadaJM.jpg';
import PortadaU2 from '../assets/PortadaU2.jpg';
import PortadaLM from '../assets/PortadaLM.jpg';
import PortadaFS from '../assets/PortadaFS.jpg';
import PortadaJM1 from '../assets/PortadaJM1.jpg';

// ─── DATOS MULTIMEDIA FUERA DEL COMPONENTE ───
const songMediaData = [
  {
    albumCover: PortadaU2,
    duration: 336,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=WfunypXsBO4&list=RDWfunypXsBO4&start_radio=1",
  },
  {
    albumCover: PortadaFS,
    duration: 155,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=ZwAERaRUsp0&list=RDZwAERaRUsp0&start_radio=1",
  },
  {
    albumCover: PortadaJM1,
    duration: 331,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=Nt-jb5JHWB8&list=RDNt-jb5JHWB8&start_radio=1",
  },
  {
    albumCover: PortadaLM,
    duration: 266,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=BG5wy5DbARM&list=PLrEX0oYRnMW7FjhqswdoaA4icwdcLKIgY&index=6",
  },
  {
    albumCover: PortadaJM,
    duration: 625,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=yVeyU-zg43M&list=RDyVeyU-zg43M&start_radio=1",
  }
];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

// ─── COMPONENTE OPTIMIZADO DEL PROGRESS BAR ───
// Al extraer esto, evitamos que toda la página se re-renderice cada segundo
const ProgressBar = ({ duration, startAt, onComplete }) => {
  const [currentTime, setCurrentTime] = useState(startAt);

  useEffect(() => {
    setCurrentTime(startAt); // Reset cuando cambia la canción
    
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          onComplete(); // Llama a siguiente canción
          return startAt;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, startAt, onComplete]);

  const progressPercent = (currentTime / duration) * 100;

  return (
    <div className="w-full mb-8">
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gray-900 dark:bg-white rounded-full shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>
      <div className="flex justify-between mt-3 text-xs font-mono tracking-wider text-gray-400 dark:text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>-{formatTime(duration - currentTime)}</span>
      </div>
    </div>
  );
};


// ─── COMPONENTE PRINCIPAL ───
export default function PlaylistPage() {
  const { t } = useTranslation();

  const playlistData = t('playlist.songs', { returnObjects: true }).map((song, index) => ({
    ...song,
    albumCover: songMediaData[index].albumCover,
    duration: songMediaData[index].duration,
    startAt: songMediaData[index].startAt,
    youtubeUrl: songMediaData[index].youtubeUrl
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSong = playlistData[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % playlistData.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? playlistData.length - 1 : prev - 1));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen text-gray-900 dark:text-white pt-32 md:pt-48 pb-20 lg:pb-32 flex flex-col items-center transition-colors duration-300"
    >
        
      {/* ─── CABECERA ─── */}
      <motion.section variants={itemVariants} className="text-center mb-12 md:mb-20 px-4 w-full max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-4 md:mb-6 tracking-tight text-gray-900 dark:text-white">
          {t('playlist.header.title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-light text-base md:text-xl leading-relaxed">
          {t('playlist.header.description')}
        </p>
      </motion.section>

      {/* ─── REPRODUCTOR (Tarjeta Unificada Blanca) ─── */}
      <motion.div
        variants={itemVariants}
        // Ajuste de padding para móviles (px-6 py-8) vs PC (p-10)
        className="w-full max-w-[90%] sm:max-w-[440px] bg-white dark:bg-gray-900 rounded-[32px] md:rounded-[40px] px-6 py-8 md:p-10 flex flex-col items-center shadow-xl md:shadow-2xl dark:shadow-gray-950/50 border border-gray-100 dark:border-gray-800 relative overflow-hidden transition-colors duration-300 mx-auto"
      >
        
        {/* Portada Gigante */}
        <div className="w-full aspect-square mb-6 md:mb-8 relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSong.id}
              src={currentSong.albumCover}
              alt={currentSong.title}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="w-full h-full object-cover absolute inset-0 select-none"
              draggable="false"
            />
          </AnimatePresence>
        </div>

        {/* Título y Artista Responsivos */}
        <div className="w-full text-center overflow-hidden mb-6 md:mb-8 px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSong.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <h3 className="text-gray-900 dark:text-white font-bold text-xl sm:text-2xl md:text-3xl tracking-tight mb-1 truncate w-full">
                {currentSong.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg font-light truncate w-full">
                {currentSong.artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progreso del tiempo - Ahora optimizado */}
        <ProgressBar 
          duration={currentSong.duration} 
          startAt={currentSong.startAt} 
          onComplete={handleNext} 
        />

        {/* ─── CONTROLES DE REPRODUCCIÓN Y YOUTUBE ─── */}
        <div className="flex justify-center items-center gap-6 md:gap-8 w-full mb-8 md:mb-10">
          
          {/* Botón Anterior */}
          <motion.button
            onClick={handlePrev}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 md:p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Canción Anterior"
          >
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 5.14v13.72a1.5 1.5 0 01-2.27 1.28L10 15.3v3.2a1.5 1.5 0 01-3 0V5.5a1.5 1.5 0 013 0v3.2L16.73 3.86A1.5 1.5 0 0119 5.14z" />
            </svg>
          </motion.button>

          {/* Botón Central (Link a YouTube) */}
          <motion.a
            href={currentSong.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 md:w-20 md:h-20 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:bg-black dark:hover:bg-gray-200 transition-colors shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Escuchar en YouTube"
          >
            <svg className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="1 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.a>

          {/* Botón Siguiente */}
          <motion.button
            onClick={handleNext}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 md:p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Canción Siguiente"
          >
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5.14v13.72a1.5 1.5 0 002.27 1.28L14 15.3v3.2a1.5 1.5 0 003 0V5.5a1.5 1.5 0 00-3 0v3.2L7.27 3.86A1.5 1.5 0 005 5.14z" />
            </svg>
          </motion.button>

        </div>

        {/* ─── DESCRIPCIÓN NARRATIVA ─── */}
        <div className="w-full relative pt-6 md:pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 px-3 md:px-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 whitespace-nowrap">
            {t('playlist.ui.whyListen')}
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSong.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 dark:text-gray-400 font-light italic leading-relaxed text-xs sm:text-sm md:text-base max-w-sm mx-auto"
            >
              "{currentSong.description}"
            </motion.p>
          </AnimatePresence>
        </div>

      </motion.div>

    </motion.div>
  );
}