import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ─── COMPONENTE DE TARJETA CON PARALLAX Y BOTÓN MAGNÉTICO ───
function CreativeCard({ card, index, variants }) {
  const navigate = useNavigate();

  // Valores de movimiento del ratón (-1 a 1, donde 0 es el centro)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Suavizado con física (Spring)
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  // Manejador para calcular la posición relativa del ratón
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

  // Transformaciones para el efecto "Magnético" del botón
  const magneticX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const magneticY = useTransform(smoothY, [-1, 1], [-20, 20]);

  // Transformaciones para el Parallax de la imagen
  const imageX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const imageY = useTransform(smoothY, [-1, 1], [-12, 12]);

  // Hacemos que la tarjeta central baje un poco en pantallas grandes para el diseño asimétrico
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
      className={`group cursor-pointer flex flex-col ${isMiddle ? 'md:translate-y-16' : ''}`}
    >
      {/* ─── CONTENEDOR DE IMAGEN (Efecto Ventana) ─── */}
      <div className="overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] mb-6 relative shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
        <motion.img 
          src={card.image} 
          alt={card.title}
          style={{ x: imageX, y: imageY }}
          // Escala ligeramente mayor para que al moverse no se vean los bordes blancos
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-out" 
        />
        
        {/* Overlay sutil para oscurecer la imagen al pasar el ratón */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
      </div>

      {/* ─── ÁREA DE TEXTO Y BOTÓN MAGNÉTICO ─── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-black transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3">
            {card.text}
          </p>
        </div>

        {/* Botón Magnético - El toque premium */}
        <motion.div 
          style={{ x: magneticX, y: magneticY }}
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300 shadow-sm"
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
  const cards = [
    {
      id: 1,
      title: "Hobbies",
      text: "Mis pasatiempos favoritos me permiten desconectar y recargar energías, desde el deporte hasta la competitividad de los videojuegos.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
      link: "/hobbies"
    },
    {
      id: 2,
      title: "Inspirations",
      text: "Hay personas, lugares y momentos que han dejado una huella en mi camino como desarrollador y como individuo.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
      link: "/inspirations"
    },
    {
      id: 3,
      title: "Playlist",
      text: "Una combinación de géneros y artistas que me acompañan siempre y me proporcionan la banda sonora perfecta para mi trabajo y mis pasiones.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
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
    // Respetamos tu padding, border y max-width original
    <section id="about" className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-200">
      
      {/* Respetamos tu h2 exactamente como lo tenías */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-serif mb-12 tracking-wide"
      >
        Más que solo código, mis pasiones e inspiraciones.
      </motion.h2>
      

      {/* Eliminamos el estilo de perspective 3D del padre porque la interacción magnética es 2D y mucho más limpia */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-16"
      >
        {cards.map((card, index) => (
          <CreativeCard key={card.id} card={card} index={index} variants={cardVariants} />
        ))}
      </motion.div>
      
    </section>
  );
}