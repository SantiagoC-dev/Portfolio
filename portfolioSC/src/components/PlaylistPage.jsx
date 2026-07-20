import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortadaJM from '../assets/PortadaJM.jpg';
import PortadaU2 from '../assets/PortadaU2.jpg';
import PortadaLM from '../assets/PortadaLM.jpg';
import PortadaFS from '../assets/PortadaFS.jpg';
import PortadaJM1 from '../assets/PortadaJM1.jpg';

const playlistData = [
  {
    id: 1,
    artist: "U2",
    title: "Where The Streets Have No Name (Remastered)",
    albumCover: PortadaU2,
    duration: 336,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=WfunypXsBO4&list=RDWfunypXsBO4&start_radio=1",
    description: "Una pieza de extraordinaria musicalidad. Me cautiva la brillantez técnica de The Edge y el profundo significado que Bono le imprime sobre algo religioso; un recordatorio sonoro de la búsqueda de la pureza espiritual."
  },
  {
    id: 2,
    artist: "Frank Sinatra",
    title: "Strangers in the Night",
    albumCover: PortadaFS,
    duration: 155,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=ZwAERaRUsp0&list=RDZwAERaRUsp0&start_radio=1",
    description: "Esta canción me transporta instantáneamente a un momento muy especial con mi pareja. Es una pieza increíble con un significado invaluable que marca el ritmo de nuestra historia juntos."
  },
  {
    id: 3,
    artist: "John Mayer",
    title: "Edge of Desire",
    albumCover: PortadaJM1,
    duration: 331,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=Nt-jb5JHWB8&list=RDNt-jb5JHWB8&start_radio=1",
    description: "Elegida por el estilo que maneja musicalmente para hablar de un tema tan complicado en una relación. La forma en que la guitarra expresa esa desesperación y anhelo es sencillamente fascinante."
  },
  {
    id: 4,
    artist: "Luis Miguel",
    title: "Que Tú Te Vas",
    albumCover: PortadaLM,
    duration: 266,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=BG5wy5DbARM&list=PLrEX0oYRnMW7FjhqswdoaA4icwdcLKIgY&index=6",
    description: "Destaca por su gran complejidad musical y una interpretación perfecta. Luis Miguel transmite con maestría la madurez y la melancolía necesarias para afrontar un momento difícil."
  },
  {
    id: 5,
    artist: "John Mayer",
    title: "Covered in Rain (Live at Tweeter Center, Philadelphia, Pennsylvania, August 2004)",
    albumCover: PortadaJM,
    duration: 625,
    startAt: 0,
    youtubeUrl: "https://www.youtube.com/watch?v=yVeyU-zg43M&list=RDyVeyU-zg43M&start_radio=1",
    description: "Seleccionada pura y exclusivamente por lo completa, compleja y exquisita que es. Una calidad sin igual que relata una historia profunda a través de su impecable improvisación en vivo."
  }
];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function PlaylistPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(playlistData[0].startAt);

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  const currentSong = playlistData[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % playlistData.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? playlistData.length - 1 : prev - 1));

  // Simulación del progreso de la canción
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const duration = playlistData[currentIndexRef.current].duration;
        if (prev >= duration) {
          handleNext();
          return playlistData[currentIndexRef.current].startAt;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentTime(playlistData[currentIndex].startAt);
  }, [currentIndex]);

  const progressPercent = (currentTime / currentSong.duration) * 100;

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
      className="min-h-screen bg-[#fafafa] text-gray-900 pt-40 md:pt-48 pb-32 flex flex-col items-center"
    >
        
      {/* ─── CABECERA ─── */}
      <motion.section variants={itemVariants} className="text-center mb-16 md:mb-20 px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-gray-900">
          Lo que escucho.
        </h1>
        <p className="text-gray-500 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          La técnica, el sentimiento y la complejidad sonora que inspiran mi desarrollo diario y los momentos más valiosos de mi vida.
        </p>
      </motion.section>

      {/* ─── REPRODUCTOR (Tarjeta Unificada Blanca) ─── */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-[440px] bg-white rounded-[40px] p-8 flex flex-col items-center shadow-2xl border border-gray-100 relative overflow-hidden mx-4"
      >
        
        {/* Portada Gigante */}
        <div className="w-full aspect-square mb-8 relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
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
        <div className="w-full text-center overflow-hidden mb-8 px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSong.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              {/* truncate evita que títulos largos rompan el diseño en celulares */}
              <h3 className="text-gray-900 font-bold text-2xl md:text-3xl tracking-tight mb-1 truncate w-full">
                {currentSong.title}
              </h3>
              <p className="text-gray-500 text-base md:text-lg font-light truncate w-full">
                {currentSong.artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progreso del tiempo */}
        <div className="w-full mb-8">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gray-900 rounded-full shadow-sm"
              animate={{ width: `${progressPercent}%` }}
              transition={{ ease: "linear", duration: 1 }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs font-mono tracking-wider text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(currentSong.duration - currentTime)}</span>
          </div>
        </div>

        {/* ─── CONTROLES DE REPRODUCCIÓN Y YOUTUBE ─── */}
        <div className="flex justify-center items-center gap-8 w-full mb-10">
          
          {/* Botón Anterior */}
          <motion.button
            onClick={handlePrev}
            className="text-gray-400 hover:text-gray-900 transition-colors p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Canción Anterior"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 5.14v13.72a1.5 1.5 0 01-2.27 1.28L10 15.3v3.2a1.5 1.5 0 01-3 0V5.5a1.5 1.5 0 013 0v3.2L16.73 3.86A1.5 1.5 0 0119 5.14z" />
            </svg>
          </motion.button>

          {/* Botón Central (Link a YouTube) simulando el botón de "Play" */}
          <motion.a
            href={currentSong.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:bg-black transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Escuchar en YouTube"
          >
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.a>

          {/* Botón Siguiente */}
          <motion.button
            onClick={handleNext}
            className="text-gray-400 hover:text-gray-900 transition-colors p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Canción Siguiente"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5.14v13.72a1.5 1.5 0 002.27 1.28L14 15.3v3.2a1.5 1.5 0 003 0V5.5a1.5 1.5 0 00-3 0v3.2L7.27 3.86A1.5 1.5 0 005 5.14z" />
            </svg>
          </motion.button>

        </div>

        {/* ─── DESCRIPCIÓN NARRATIVA ─── */}
        <div className="w-full relative pt-8 border-t border-gray-100 text-center">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Por qué la escucho
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSong.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 font-light italic leading-relaxed text-sm md:text-base max-w-sm mx-auto"
            >
              "{currentSong.description}"
            </motion.p>
          </AnimatePresence>
        </div>

      </motion.div>

    </motion.div>
  );
}