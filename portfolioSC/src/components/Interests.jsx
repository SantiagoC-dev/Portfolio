import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hobbies from '../assets/Hobbies.svg';
import Inspirations from '../assets/Inspirations.svg';
import Playlist from '../assets/Playlist.svg';

function CreativeCard({ card, index, variants, permissionGranted }) {
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // ─── FÍSICA MEJORADA: Menos rígida, más "flotante" y orgánica ───
  const smoothX = useSpring(x, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 25 });

  // ─── EVENTOS DE RATÓN (PC) ───
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // ─── EVENTOS DE GIROSCOPIO (MÓVIL) ───
  useEffect(() => {
    if (!permissionGranted) return;

    const handleDeviceOrientation = (e) => {
      // Si el dispositivo no tiene giroscopio o está bloqueado por HTTP
      if (e.gamma === null || e.beta === null) return;
      
      // Aumentamos la sensibilidad cambiando el divisor de 30 a 25
      let normalizedX = e.gamma / 25; 
      let normalizedY = (e.beta - 40) / 25;
      
      normalizedX = Math.max(-1, Math.min(1, normalizedX));
      normalizedY = Math.max(-1, Math.min(1, normalizedY));

      x.set(normalizedX);
      y.set(normalizedY);
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, [permissionGranted, x, y]);

  // ─── DESPLAZAMIENTO AUMENTADO: Mucho más pronunciado ───
  const magneticX = useTransform(smoothX, [-1, 1], [-20, 20]); // Antes: 15
  const magneticY = useTransform(smoothY, [-1, 1], [-20, 20]); // Antes: 15
  const imageX = useTransform(smoothX, [-1, 1], [-35, 35]);    // Antes: 12 (Casi el triple)
  const imageY = useTransform(smoothY, [-1, 1], [-35, 35]);    // Antes: 12 (Casi el triple)

  const isMiddle = index === 1;

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (card.link) {
          navigate(card.link);
        }
      }}
      className={`group cursor-pointer flex flex-col h-full text-center md:text-left ${isMiddle ? 'md:translate-y-12' : ''}`}
    >
      <div className="relative h-56 sm:h-64 md:h-72 mb-8 md:mb-10 flex items-center justify-center w-full">
        <div className="absolute -bottom-4 w-3/4 h-6 bg-black/25 dark:bg-black/50 blur-xl rounded-[50%] transition-all duration-700 group-hover:w-[85%] group-hover:bg-black/15 dark:group-hover:bg-black/70" />
        
        <motion.img
          src={card.image}
          alt={card.title}
          style={{ x: imageX, y: imageY }}
          className="relative z-10 w-full h-full object-contain scale-[1.15] md:scale-[1.25] group-hover:scale-[1.3] drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out"
        />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6 flex-1">
        <div className="flex flex-col flex-1 w-full">
          <h3 className="text-xl font-serif text-gray-900 dark:text-white mb-2 group-hover:text-black dark:group-hover:text-gray-300 transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
            {card.text}
          </p>
        </div>

        <motion.div 
          style={{ x: magneticX, y: magneticY }}
          className="mx-auto md:mx-0 w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-300 group-hover:bg-black dark:group-hover:bg-white dark:group-hover:text-gray-900 group-hover:text-white group-hover:border-black dark:group-hover:border-white transition-all duration-300 shadow-sm group-hover:shadow-md"
        >
          <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Interests() {
  const { t } = useTranslation();
  
  const [needsPermission, setNeedsPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Detección para dispositivos iOS (iPhone/iPad)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      setNeedsPermission(true);
    } else {
      // Android y PC tienen permiso libre automático (sujeto a HTTPS)
      setPermissionGranted(true);
    }
  }, []);

  const requestAccess = async () => {
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          setNeedsPermission(false);
        }
      }
    } catch (error) {
      console.warn("Device orientation request failed:", error);
    }
  };

  const cards = [
    {
      id: 1,
      title: t('interests.cards.hobbies.title'),
      text: t('interests.cards.hobbies.text'),
      image: Hobbies,
      link: "/hobbies"
    },
    {
      id: 2,
      title: t('interests.cards.inspirations.title'),
      text: t('interests.cards.inspirations.text'),
      image: Inspirations,
      link: "/inspirations"
    },
    {
      id: 3,
      title: t('interests.cards.playlist.title'),
      text: t('interests.cards.playlist.text'),
      image: Playlist,
      link: "/playlist"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-serif tracking-wide text-gray-900 dark:text-white text-center md:text-left"
        >
          {t('interests.title')}
        </motion.h2>

        {/* Botón dinámico (Solo visible en iOS sin permiso) */}
        {needsPermission && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={requestAccess}
            className="mt-6 md:mt-0 mx-auto md:mx-0 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Activar Efectos 3D
          </motion.button>
        )}
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14 pb-12"
      >
        {cards.map((card, index) => (
          <CreativeCard 
            key={card.id} 
            card={card} 
            index={index} 
            variants={cardVariants} 
            permissionGranted={permissionGranted}
          />
        ))}
      </motion.div>
      
    </section>
  );
}