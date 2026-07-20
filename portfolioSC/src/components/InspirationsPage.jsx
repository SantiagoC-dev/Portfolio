import { useState } from 'react';
import { motion } from 'framer-motion';

// ─── COMPONENTE INDIVIDUAL DE TARJETA GIRATORIA (SIN IMÁGENES) ───
const TypographicFlipCard = ({ item, variants }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
      className={`relative group cursor-pointer h-full min-h-[400px] md:min-h-[460px] ${item.colSpan}`}
      style={{ perspective: 1500 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
      >
        
        {/* ─── CARA FRONTAL (TIPOGRAFÍA EDITORIAL Y MINIMALISMO) ─── */}
        <div 
          className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-end transition-colors duration-500 group-hover:bg-gray-50/50"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Letra Gigante de Fondo (Marca de agua tipográfica) */}
          <div className="absolute -bottom-10 -right-4 text-[250px] md:text-[300px] font-serif font-bold text-gray-100/60 leading-none select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000 ease-out">
            {item.letter}
          </div>

          {/* Texto Frontal */}
          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                {item.overline}
              </span>
              {/* Icono de + interactivo */}
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-wide mt-auto">
              {item.title}
            </h3>
          </div>
        </div>

        {/* ─── CARA TRASERA (DESCRIPCIÓN OSCURA) ─── */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#111827] rounded-2xl overflow-hidden shadow-xl p-8 md:p-12 flex flex-col justify-center text-center items-center border border-gray-800"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-6 block">
              Por qué me inspira
            </span>
            <p className="text-gray-200 font-serif italic text-lg md:text-xl leading-relaxed max-w-sm">
              "{item.description}"
            </p>
            
            {/* Botón para cerrar */}
            <div className="mt-10 text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              Volver
            </div>
        </div>

      </motion.div>
    </motion.div>
  );
};


// ─── COMPONENTE PRINCIPAL ───
export default function InspirationsPage() {
  const inspirations = [
    {
      id: 1,
      overline: "Mi Madre",
      title: "Dulce Nancy",
      description: "La persona que más admiro. De ella aprendí que el amor se demuestra con presencia y tiene el corazón mas grande que he conocido jamás.",
      letter: "M",
      colSpan: "md:col-span-2", 
    },
    {
      id: 2,
      overline: "Mi Pareja",
      title: "Joanna",
      description: "Mi razón favorita para esforzarme cada día. En ella encontré apoyo, amor y complicidad incondicional.",
      letter: "J",
      colSpan: "md:col-span-1",
    },
    {
      id: 3,
      overline: "Mi Fe",
      title: "Dios",
      description: "El pilar central de mi vida. La fuente de mi propósito, mi paz y la gracia que guía cada uno de mis pasos.",
      letter: "D",
      colSpan: "md:col-span-1",
    },
    {
      id: 4,
      overline: "Mi Mascota",
      title: "Nacho",
      description: "Me enseñó que el amor incondicional existe de verdad y no requiere palabras.",
      letter: "N",
      colSpan: "md:col-span-1",
    },
    {
      id: 5,
      overline: "Literatura",
      title: "Él vino a dar libertad a los cautivos (Rebecca Brown)",
      description: "Una lectura profunda que transformó mi perspectiva y redefinió mi vida espiritual y personal.",
      letter: "L",
      colSpan: "md:col-span-1",
    },
    {
      id: 6,
      overline: "Tenis",
      title: "Roger Federer",
      description: "Su elegancia, precisión y mentalidad estratégica en la cancha me inspiran a buscar la excelencia en todo lo que hago.",
      letter: "R",
      colSpan: "md:col-span-1",
    },
    {
      id: 7,
      overline: "E-sports",
      title: "Jay Won",
      description: "Su enfoque, disciplina y filosofía en el juego y en la vida, me motivan a aplicar la misma dedicación en mis proyectos y metas personales.",
      letter: "W",
      colSpan: "md:col-span-2",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 pt-40 md:pt-48 pb-32">
      
      {/* ─── CABECERA ─── */}
      <section className="text-center mb-20 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif mb-6 tracking-tight"
        >
          Mis inspiraciones
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Las personas, historias y presencias que dan forma a quien soy. Haz clic en las tarjetas para descubrir el porqué.
        </motion.p>
      </section>

      {/* ─── GRID TIPOGRÁFICO (BENTO) ─── */}
      <section className="max-w-6xl mx-auto px-4 mb-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {inspirations.map((item) => (
            <TypographicFlipCard key={item.id} item={item} variants={itemVariants} />
          ))}
        </motion.div>
      </section>

      {/* ─── SECCIÓN ESPECIAL: MI PADRE ─── */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative py-20 md:py-32 border-t border-gray-200 text-center flex flex-col items-center"
        >
          {/* Detalle decorativo superior */}
          <div className="w-px h-16 bg-gradient-to-b from-gray-200 to-transparent absolute top-0"></div>
          
          <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-10 block">
            En memoria
          </span>
          
          <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-12 tracking-wide">
            David Gutiérrez
          </h2>
          
          <div className="relative">
            {/* Comillas decorativas minimalistas */}

            <p className="text-xl md:text-3xl text-gray-600 font-light leading-relaxed md:leading-loose max-w-3xl relative z-10 italic">
              A mi padre, cuya presencia y enseñanza permanecen conmigo, recordándome siempre la importancia del esfuerzo, la perseverancia y el valor de seguir adelante incluso en los momentos difíciles.
            </p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}