import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// ─── COMPONENTE INDIVIDUAL DE TESTIMONIO CON FÍSICA 3D ───
const InteractiveTestimonialCard = ({ item }) => {
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
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000
      }}
      className="w-[350px] md:w-[400px] flex-shrink-0 border border-gray-100 rounded-2xl p-8 bg-white flex flex-col justify-between min-h-[280px] select-none mx-3 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          x: useTransform(x, [0, 1], [-5, 5]),
          y: useTransform(y, [0, 1], [-5, 5]),
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
        <p className="text-gray-600 italic font-light text-lg md:text-xl leading-relaxed mb-8">
         {item.quote}
        </p>

        <div className="flex items-center gap-4 mt-auto">
          <motion.div 
            style={{
              x: useTransform(x, [0, 1], [-3, 3]),
              y: useTransform(y, [0, 1], [-3, 3]),
            }}
            className="w-12 h-12 flex-shrink-0 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 font-serif text-lg transition-colors duration-500 group-hover:bg-gray-100 group-hover:border-gray-300"
          >
            {item.initials}
          </motion.div>

          <motion.div
            style={{
              x: useTransform(x, [0, 1], [-2, 2]),
            }}
            className="min-w-0 flex-1 text-left"
          >
            <h4 className="text-sm font-semibold text-gray-900 tracking-tight truncate">{item.name}</h4>
            <p className="text-xs text-gray-500 font-light leading-snug truncate">{item.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


// ─── COMPONENTE PRINCIPAL ───
export default function LovedOnes() {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote: "“Santiago es alguien sumamente estructurado y enfocado en sus metas. Su capacidad para organizar sus prioridades se refleja en los resultados de todo lo que emprende.”",
      name: "Dulce Calderón",
      description: "Madre",
      initials: "DC"
    },
    {
      id: 2,
      quote: "“Una persona respetuosa, amable e inteligente, con sus objetivos claros y capaz de lograr todo lo que se propone por su dedicación y esfuerzo en lo que hace.”" ,
      name: "Joanna Alvarez",
      description: "Pareja",
      initials: "JA"
    },
    {
      id: 3,
      quote: "“Un profesional sumamente responsable. Durante su paso por la empresa, demostró gran precisión técnica y una actitud proactiva ante las resoluciones de problemas en la red.”",
      name: "Pedro Hernández",
      description: "Ex Jefe / Supervisor - Aguakan",
      initials: "PH"
    },
    {
      id: 4,
      quote: "“Acompañé a Santiago durante su proceso de servicio. Destaca por su constancia académica y su notable facilidad para estructurar soluciones multiplataforma.”",
      name: "Juan Domínguez",
      description: "Mentor Académico - UTRM",
      initials: "JD"
    },
    {
      id: 5,
      quote: "“Tiene una visión muy clara de la arquitectura de software. Es el tipo de desarrollador que prioriza el código limpio y diseña sistemas pensando en la escalabilidad.”",
      name: "Eduardo Solorzano",
      description: "Desarrollador de Software Senior",
      initials: "ES"
    },
    {
      id: 6,
      quote: "“Trabajar con él en Tourcraft fue clave para el proyecto. Aporta excelentes soluciones lógicas, depura errores rápidamente y mantiene al equipo enfocado.”",
      name: "David Fraga",
      description: "Co-desarrollador App Tourcraft",
      initials: "DF"
    }
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-32 border-t border-gray-200 text-center overflow-hidden">
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50%)); }
        }
        .animate-scroll {
          /* Ajusta los segundos (70s) para hacerlo más rápido o más lento */
          animation: scroll 60s linear infinite;
          /* El ancho debe ser suficiente para albergar los duplicados */
          width: max-content;
        }
      `}</style>

      {/* HEADER */}
      <div className="flex justify-between items-end mb-14 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-serif tracking-wide text-gray-900"
        >
          Lo que dicen de mí
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-gray-400 select-none"
        >
          <span className="text-xs tracking-widest font-medium uppercase hidden md:block">
            {isPaused ? 'PAUSADO' : 'AUTO SCROLL'}
          </span>
          <div className="w-10 h-[2px] bg-gray-200 relative overflow-hidden rounded-full">
            <motion.div
              animate={isPaused ? { x: "0%" } : { x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className={`absolute w-1/2 h-full rounded-full ${isPaused ? 'bg-gray-300' : 'bg-gray-800'}`}
            />
          </div>
        </motion.div>
      </div>

      {/* CONTENEDOR DEL CARRUSEL INFINITO */}
      <div 
        className="overflow-hidden group cursor-grab active:cursor-grabbing pb-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{ perspective: 1200 }}
      >
        <div 
          className="flex animate-scroll"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {/* Renderizamos el array original */}
          {testimonials.map((item, index) => (
            <InteractiveTestimonialCard key={`original-${item.id}-${index}`} item={item} />
          ))}
          {/* Renderizamos una copia exacta para crear la ilusión de infinito */}
          {testimonials.map((item, index) => (
            <InteractiveTestimonialCard key={`copy-${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>

    </section>
  );
}