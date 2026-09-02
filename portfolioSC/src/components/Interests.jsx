import { useEffect, useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ─────────────────────────────────────────────────────────────────────────────
// CARD CON SENSOR 3D INTELIGENTE Y AUTOCALIBRADO
// ─────────────────────────────────────────────────────────────────────────────

function CreativeCard({ card, variants, permissionGranted }) {
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const isGyroActive = useRef(false);
  const initialBeta = useRef(null);
  const initialGamma = useRef(null);

  // Animación más fluida para manejar los cientos de datos por segundo del sensor
  const smoothX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });

  // ─────────────────────────────────────────────────────────────────────────
  // MOUSE (SOLO PC)
  // ─────────────────────────────────────────────────────────────────────────

  const handleMouseMove = (event) => {
    if (isGyroActive.current || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const normalizedY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    x.set(Math.max(-1, Math.min(1, normalizedX)));
    y.set(Math.max(-1, Math.min(1, normalizedY)));
  };

  const handleMouseLeave = () => {
    if (isGyroActive.current) return;
    x.set(0);
    y.set(0);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // GIROSCOPIO RELATIVO (MÓVILES)
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!permissionGranted) return;

    const handleDeviceOrientation = (event) => {
      if (event.gamma == null || event.beta == null) return;
      
      isGyroActive.current = true;

      // 1. Calibramos el "centro" la primera vez que recibimos datos
      if (initialBeta.current === null) {
        initialBeta.current = event.beta;
        initialGamma.current = event.gamma;
      }

      // 2. Calculamos la diferencia desde la postura inicial
      let diffGamma = event.gamma - initialGamma.current;
      let diffBeta = event.beta - initialBeta.current;

      // Evitamos saltos bruscos si el usuario gira el teléfono demasiado
      if (diffGamma > 180) diffGamma -= 360;
      if (diffGamma < -180) diffGamma += 360;

      // 3. Normalizamos (35 grados de inclinación física equivalen al máximo efecto 3D)
      const normalizedX = Math.max(-1, Math.min(1, diffGamma / 35));
      const normalizedY = Math.max(-1, Math.min(1, diffBeta / 35));

      x.set(normalizedX);
      y.set(normalizedY);
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [permissionGranted, x, y]);

  // ─────────────────────────────────────────────────────────────────────────
  // TRANSFORMACIONES
  // ─────────────────────────────────────────────────────────────────────────
  
  // Ángulos amplios (12 grados) para que el efecto sea muy visible en el móvil
  const rotateX = useTransform(smoothY, [-1, 1], [12, -12]);
  const rotateY = useTransform(smoothX, [-1, 1], [-12, 12]);

  return (
    <motion.div
      variants={variants}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (card.link) navigate(card.link);
        }}
        style={{ rotateX, rotateY }}
        className="
          group
          relative
          flex
          h-full
          min-h-[300px]
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-gray-200/80
          bg-white
          p-7
          transition-all
          duration-300
          hover:border-gray-300
          hover:shadow-xl
          hover:shadow-black/5

          dark:border-gray-800
          dark:bg-gray-900/80
          dark:hover:border-gray-700
          dark:hover:bg-gray-900
          dark:hover:shadow-gray-900/30
        "
      >
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-medium tracking-[0.18em] text-gray-400 dark:text-gray-500">
            {String(card.id).padStart(2, '0')}
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300 group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white dark:border-gray-700/80 dark:bg-transparent dark:text-gray-500 dark:group-hover:border-gray-600 dark:group-hover:bg-gray-800 dark:group-hover:text-gray-300">
            <svg className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <div className="mt-auto pt-16">
          <h3 className="max-w-[320px] text-2xl font-serif leading-tight tracking-tight text-gray-950 transition-all duration-300 group-hover:translate-x-1 dark:text-gray-200 dark:group-hover:text-white">
            {card.title}
          </h3>

          <div className="mt-5 h-px w-8 bg-gray-300 transition-all duration-300 group-hover:w-12 group-hover:bg-gray-900 dark:bg-gray-700 dark:group-hover:bg-gray-500" />

          <p className="mt-5 max-w-[340px] text-sm leading-7 font-light text-gray-500 dark:text-gray-400">
            {card.text}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function Interests() {
  const { t } = useTranslation();

  const [needsPermission, setNeedsPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      setNeedsPermission(true);
    } else {
      setPermissionGranted(true);
    }
  }, []);

  const requestAccess = async () => {
    try {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        const permission = await DeviceOrientationEvent.requestPermission();
        
        // El navegador verifica el permiso almacenado.
        if (permission === 'granted') {
          setPermissionGranted(true);
          setNeedsPermission(false);
        } else {
          alert("El efecto 3D está desactivado en tus ajustes de navegador. Puedes seguir navegando con normalidad.");
          setNeedsPermission(false);
        }
      } else {
        setPermissionGranted(true);
        setNeedsPermission(false);
      }
    } catch (error) {
      console.warn('El dispositivo no soporta orientación:', error);
      setNeedsPermission(false);
    }
  };

  const cards = [
    {
      id: 1,
      title: t('interests.cards.hobbies.title'),
      text: t('interests.cards.hobbies.text'),
      link: '/hobbies',
    },
    {
      id: 2,
      title: t('interests.cards.inspirations.title'),
      text: t('interests.cards.inspirations.text'),
      link: '/inspirations',
    },
    {
      id: 3,
      title: t('interests.cards.playlist.title'),
      text: t('interests.cards.playlist.text'),
      link: '/playlist',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="interests" className="w-full border-t border-gray-200/70 dark:border-gray-800/70">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={revealVariants} className="mb-14 flex flex-col gap-7 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-gray-900 dark:bg-white" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400 dark:text-gray-500">
                  Personal
                </span>
              </div>
              <h2 className="max-w-2xl text-4xl font-serif leading-[1.05] tracking-tight text-gray-950 sm:text-5xl dark:text-white">
                {t('interests.title')}
              </h2>
            </div>

            {needsPermission && (
              <button
                type="button"
                onClick={requestAccess}
                className="self-start rounded-full border border-gray-200 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500 transition-colors duration-300 hover:border-gray-400 hover:text-gray-900 dark:border-gray-800 dark:text-gray-500 dark:hover:border-gray-600 dark:hover:text-white md:self-end"
              >
                {t('interests.activateExperience')}
              </button>
            )}
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <CreativeCard
                key={card.id}
                card={card}
                variants={revealVariants}
                permissionGranted={permissionGranted}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}