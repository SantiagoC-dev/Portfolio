import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── COMPONENTE INDIVIDUAL DE HOBBY CON PARALLAX ───
const ParallaxHobby = ({ hobby, index }) => {
  const ref = useRef(null);
  
  // Rastrear el scroll solo cuando esta sección entra en la vista
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Físicas de movimiento (Parallax)
  // El texto se mueve sutilmente
  const yText = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  // La imagen principal tiene un movimiento moderado
  const yImagePrimary = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  // La imagen secundaria se mueve más rápido y en dirección opuesta para crear profundidad 3D
  const yImageSecondary = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const isEven = index % 2 === 0;

  return (
    <section 
      ref={ref} 
      className="relative min-h-[90vh] flex items-center justify-center py-24 md:py-32 overflow-hidden"
    >
      {/* ─── NÚMERO DE FONDO GIGANTE (ESTILO EDITORIAL) ─── */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[18vw] font-serif font-bold text-gray-100 select-none -z-10 leading-none tracking-tighter"
      >
        0{hobby.id}
      </motion.div>

      <div className={`max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        
        {/* ─── BLOQUE DE TEXTO ─── */}
        <motion.div 
          style={{ y: yText }}
          className={`lg:col-span-5 flex flex-col z-10 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-gray-300"></span>
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Pasatiempo 0{hobby.id}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif mb-8 tracking-tight text-gray-900">
            {hobby.title}
          </h2>
          
          <p className="text-gray-500 font-light leading-relaxed text-lg md:text-xl">
            {hobby.description}
          </p>
        </motion.div>

        {/* ─── BLOQUE DE IMÁGENES COMPUESTAS (SUPERPOSICIÓN) ─── */}
        <div className={`lg:col-span-7 relative w-full h-[50vh] md:h-[70vh] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Imagen Principal */}
          <motion.div 
            style={{ y: yImagePrimary }}
            className={`absolute top-0 bottom-10 w-4/5 overflow-hidden rounded-2xl bg-gray-100 shadow-xl ${isEven ? 'right-0' : 'left-0'}`}
          >
            <img 
              src={hobby.imgPrimary} 
              alt={hobby.title} 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Imagen Secundaria (Flotante) */}
          <motion.div 
            style={{ y: yImageSecondary }}
            className={`absolute bottom-0 w-2/5 aspect-[4/5] overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ${isEven ? 'left-4 md:left-10' : 'right-4 md:right-10'}`}
          >
            <div className="w-full h-full overflow-hidden rounded-xl bg-gray-100">
              <img 
                src={hobby.imgSecondary} 
                alt={`${hobby.title} detalle`} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


// ─── COMPONENTE PRINCIPAL ───
export default function HobbiesPage() {
  const hobbiesData = [
    {
      id: 1,
      title: "Tenis",
      description: "Ya sea practicándolo en la cancha o siguiéndolo como espectador, el tenis es una disciplina que exige constancia, estrategia y agilidad mental. Me ayuda a mantener el equilibrio físico y me inspira a superar mis propios límites en cada set.",
      imgPrimary: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=80", 
      imgSecondary: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&auto=format&fit=crop&q=80" 
    },
    {
      id: 2,
      title: "E-sports",
      description: "La escena competitiva en títulos como Valorant me fascina por el nivel de coordinación, comunicación y táctica que exige. Es un entorno de alta presión donde la toma de decisiones en fracciones de segundo y la sinergia del equipo definen la victoria.",
      imgPrimary: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80", 
      imgSecondary: "https://images.unsplash.com/photo-1506506200949-df6ed8da0b1e?w=500&auto=format&fit=crop&q=80" 
    },
    {
      id: 3,
      title: "Alta Relojería",
      description: "Soy un verdadero apasionado de la micromecánica y la historia detrás de los relojes. Dedico mi tiempo a investigar y aprender sobre calibres, complicaciones y el trabajo artesanal de esta industria, con la gran meta de construir mi propia colección en el futuro.",
      imgPrimary: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=80", 
      imgSecondary: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80" 
    },
    {
      id: 4,
      title: "Música y Percusión",
      description: "Entiendo la música como una expresión excepcional de brillantez humana, especialmente en géneros de gran complejidad técnica como el jazz, el blues y los boleros. Disfruto profundamente estudiar teoría musical y aprender batería para apreciar este arte desde su núcleo.",
      imgPrimary: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80", 
      imgSecondary: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=80" 
    },
    {
      id: 5,
      title: "Lectura",
      description: "La lectura es una de mis actividades favoritas, ya que me permite sumergirme en diferentes mundos y perspectivas. Disfruto tanto de lo narrativo hasta lo lirico, y siempre estoy buscando nuevos libros para explorar.",
      imgPrimary: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80", 
      imgSecondary: "https://images.unsplash.com/photo-1493912260786-339d5c9a4a4e?w=500&auto=format&fit=crop&q=80" 
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 pt-40 md:pt-48 pb-32">
      
      {/* ─── CABECERA ─── */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-10 md:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
        >
          Mis pasatiempos
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Las disciplinas fuera del desarrollo de software que forman mi enfoque, nutren mi creatividad y mantienen mi mente afilada.
        </motion.p>
      </section>

      {/* ─── LISTA DE HOBBIES (RENDERIZADO DINÁMICO) ─── */}
      <div className="flex flex-col">
        {hobbiesData.map((hobby, index) => (
          <ParallaxHobby key={hobby.id} hobby={hobby} index={index} />
        ))}
      </div>

    </div>
  );
}