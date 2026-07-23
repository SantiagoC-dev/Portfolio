import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hobbies from '../assets/Hobbies.svg';
import Inspirations from '../assets/Inspirations.svg';
import Playlist from '../assets/Playlist.svg';

// ─── COMPONENTE DE TARJETA CON PARALLAX Y BOTÓN MAGNÉTICO ───
function CreativeCard({ card, index, variants }) {
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

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

  const magneticX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const magneticY = useTransform(smoothY, [-1, 1], [-20, 20]);

  // Aumentamos ligeramente el movimiento parallax de la imagen
  const imageX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const imageY = useTransform(smoothY, [-1, 1], [-18, 18]);

  // Suavizamos un poco el desfase central para que sea más armónico
  const isMiddle = index === 1;

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (card.link) {
          navigate(card.link);
          window.scrollTo(0, 0);
        }
      }}
      className={`group cursor-pointer flex flex-col h-full ${isMiddle ? 'md:translate-y-12' : ''}`}
    >
      {/* Objeto flotante — Contenedor fijo para que las imágenes sean más grandes */}
      <div className="relative h-64 md:h-72 mb-10 flex items-center justify-center w-full">
        
        {/* Sombra de piso elíptica y más realista (efecto de estudio 3D) */}
        <div className="absolute -bottom-4 w-3/4 h-6 bg-black/10 dark:bg-black/50 blur-xl rounded-[50%] transition-all duration-700 group-hover:w-[85%] group-hover:bg-black/15 dark:group-hover:bg-black/70" />
        
        {/* Imagen SVG — Añadido scale-[1.25] para hacerlas más grandes por defecto */}
        <motion.img
          src={card.image}
          alt={card.title}
          style={{ x: imageX, y: imageY }}
          className="relative z-10 w-full h-full object-contain scale-[1.25] group-hover:scale-[1.35] drop-shadow-[0_30px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_30px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out"
        />
      </div>

      <div className="flex items-start justify-between gap-6 flex-1">
        {/* El min-h-[140px] asegura que el texto siempre ocupe el mismo espacio, evitando que el botón y el layout salten al cambiar de idioma */}
        <div className="flex flex-col flex-1 min-h-[140px]">
          <h3 className="text-xl font-serif text-gray-900 dark:text-white mt-1 mb-3 group-hover:text-black dark:group-hover:text-gray-300 transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
            {card.text}
          </p>
        </div>

        <motion.div 
          style={{ x: magneticX, y: magneticY }}
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-300 group-hover:bg-black dark:group-hover:bg-white dark:group-hover:text-gray-900 group-hover:text-white group-hover:border-black dark:group-hover:border-white transition-all duration-300 shadow-sm group-hover:shadow-md"
        >
          <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── COMPONENTE PRINCIPAL ───
export default function Interests() {
  const { t } = useTranslation();

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
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-serif mb-16 tracking-wide text-gray-900 dark:text-white"
      >
        {t('interests.title')}
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        // Aumenté un poco el gap para que respiren mejor las imágenes al ser más grandes
        className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-14 pb-16"
      >
        {cards.map((card, index) => (
          <CreativeCard key={card.id} card={card} index={index} variants={cardVariants} />
        ))}
      </motion.div>
      
    </section>
  );
}