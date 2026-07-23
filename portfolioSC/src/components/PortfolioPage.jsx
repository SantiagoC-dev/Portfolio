import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// 1. Importar el hook de traducción
import { useTranslation } from 'react-i18next';

import LabStock from '../assets/labstock.png';
import TourCraft from '../assets/tourcraft.png';

// ─── DICCIONARIO DE ICONOS OFICIALES A COLOR ───
// (Este objeto se queda exactamente igual, no necesita traducción)
const techData = {
  "React Native": { 
    color: "#61DAFB", 
    fill: "currentColor",
    icon: <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
  },
  "React": { 
    color: "#61DAFB", 
    fill: "currentColor",
    icon: <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
  },
  "Node.js": { 
    color: "#339933", 
    fill: "currentColor",
    icon: <path d="M12.004 0L1.75 5.922v12.156L12.004 24l10.246-5.922V5.922zM10.875 18.59l-.004-.002a2.383 2.383 0 01-1.077-.282A5.626 5.626 0 016.9 16.48l1.325-1.464a4.42 4.42 0 002.394 1.5c1.084.28 2.21-.186 2.456-.732.18-.396-.065-.898-1.07-1.19l-1.396-.397c-1.928-.548-2.656-1.942-2.308-3.21.36-1.314 1.76-2.193 3.498-2.193a5.535 5.535 0 013.25 1.053l-1.158 1.543a4.015 4.015 0 00-2.18-1.002c-.933-.147-1.803.18-1.968.614-.15.397.106.812.99 1.066l1.373.39c2.148.608 2.8 2.052 2.382 3.454-.42 1.408-1.968 2.316-3.615 2.316-.002.002-.002.002 0 .002zm6.27-.478V8.92h2.003v10.514c0 .066-.022.12-.06.155a.2.2 0 01-.15.056h-1.637a.2.2 0 01-.144-.055.205.205 0 01-.06-.153z"/>
  },
  "MySQL": { 
    color: "#4479A1", 
    fill: "none", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
  },
  "AP Config": { 
    color: "#6B7280", 
    fill: "none", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"/>
  },
  "Vite": { 
    color: "#646CFF", 
    fill: "currentColor",
    icon: <path d="M23.692 4.237c-.12-.423-.5-.733-.94-.775l-21.2-.988c-.463-.02-.876.242-1.026.657-.15.413-.01.884.34 1.156l10.82 8.358V23.47c0 .445.313.834.75.955.438.12.905-.064 1.15-.456l10.45-18.452c.23-.393.18-.887-.14-1.233l-.2-.047zM11.666 11.39l-8.625-6.66 17.514.815-8.89 15.703V11.39z"/>
  },
  "MongoDB": {
    color: "#47A248",
    fill: "currentColor",
    icon: <path d="M17.193 9.555c-1.393-3.037-3.21-6.195-5.184-8.877-.042-.058-.178-.069-.228 0-1.976 2.682-3.791 5.84-5.184 8.877-1.117 2.44-1.636 5.564-1.284 8.169.314 2.335 1.768 4.295 3.905 5.25.321.143.66.24 1.008.288 1.5.21 2.898-.553 3.652-1.782.754 1.229 2.152 1.992 3.652 1.782.348-.048.687-.145 1.008-.288 2.137-.955 3.59-2.915 3.905-5.25.352-2.605-.167-5.729-1.284-8.169zm-5.08 9.539c-.58.336-1.332.336-1.912 0-.547-.318-.87-1.246-.948-2.642.668.214 1.385.325 2.124.325s1.456-.111 2.124-.325c-.078 1.396-.401 2.324-.948 2.642zm.968-3.323c-.636.177-1.306.27-1.984.27s-1.348-.093-1.984-.27c-.234-2.883.69-7.07 1.83-10.02.05-.129.258-.129.308 0 1.14 2.95 2.064 7.137 1.83 10.02z"/>
  }
};

export default function PortfolioPage() {
  // 2. Inicializar el hook
  const { t } = useTranslation();

  // 3. Importar y combinar los datos traducidos con las imágenes estáticas
  const projectImages = {
    1: LabStock,
    2: TourCraft
  };

  const projects = t('portfolio.projects', { returnObjects: true }).map(project => ({
    ...project,
    image: projectImages[project.id]
  }));

  // ─── DEFINICIÓN DE VARIANTES DE ANIMACIÓN ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1 
      } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] } }
  };

  const titleReveal = {
    hidden: { y: "120%" },
    visible: { y: "0%", transition: { duration: 1, ease: [0.215, 0.610, 0.355, 1.000] } }
  };

  return (
    // Se añadió bg-[#fafafa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 y selección adaptada
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 pt-40 md:pt-48 pb-32 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto px-6">
        
        {/* ─── HERO SECTION ─── */}
        <motion.section className="mb-40 max-w-4xl">
          <motion.span variants={fadeInUp} className="text-xs font-semibold tracking-widest text-gray-400 uppercase block">
            {t('portfolio.hero.subtitle')}
          </motion.span>
          
          <h1 className="text-7xl md:text-9xl font-serif mb-8 tracking-tighter leading-none">
            <span className="block overflow-hidden pb-2">
              <motion.span variants={titleReveal} className="block text-gray-900 dark:text-white">{t('portfolio.hero.title1')}</motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={titleReveal} className="block text-gray-400">{t('portfolio.hero.title2')}</motion.span>
            </span>
          </h1>
          
          <motion.p variants={fadeInUp} className="text-gray-500 dark:text-gray-400 font-light text-xl md:text-2xl leading-relaxed max-w-2xl">
            {t('portfolio.hero.description')}
          </motion.p>
        </motion.section>

        {/* ─── SHOWCASE INMERSIVO ─── */}
        <div className="space-y-48">
          {projects.map((project) => (
            <motion.section 
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className={`flex flex-col gap-16 lg:gap-24 ${project.align === "left" ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Bloque de Imagen con Problemática en Hover */}
              <motion.div variants={fadeInUp} className="w-full md:w-1/2 group relative">
                <div className="relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900 aspect-[4/3] shadow-2xl transition-all duration-700 group-hover:shadow-black/10">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[15%] group-hover:grayscale-0"
                  />
                  {/* Overlay Informativo Restaurado */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm p-8 md:p-12">
                    <div className="text-white text-center">
                      <p className="text-xs tracking-widest uppercase mb-4 text-gray-300 italic font-medium">{t('portfolio.ui.problemLabel')}</p>
                      <p className="text-lg font-light leading-relaxed">"{project.problem}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bloque de Texto y Detalles */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <motion.span variants={fadeInUp} className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">
                  {project.category}
                </motion.span>
                <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-serif text-gray-900 dark:text-white mb-6 tracking-tighter">
                  {project.title}
                </motion.h2>
                
                <motion.p variants={fadeInUp} className="text-gray-500 dark:text-gray-400 font-light text-lg md:text-xl leading-relaxed mb-10">
                  {project.description}
                </motion.p>

                {/* Tech Stack con Animación Spring */}
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-14">
                  {project.techStack.map(tech => (
                    <motion.span 
                      key={tech} 
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-[11px] font-medium text-gray-700 dark:text-gray-300 tracking-wide flex items-center gap-2 shadow-sm hover:shadow-md cursor-default"
                    >
                      {techData[tech] && (
                        <svg 
                          className="w-4 h-4" 
                          viewBox="0 0 24 24" 
                          fill={techData[tech].fill === 'none' ? 'none' : techData[tech].color}
                          stroke={techData[tech].fill === 'none' ? techData[tech].color : 'none'}
                        >
                          {techData[tech].icon}
                        </svg>
                      )}
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Botón Minimalista y Elegante */}
                <motion.div variants={fadeInUp}>
                  <Link 
                    to={`/case-study/${project.id}`} 
                    className="group relative inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.15em] text-gray-900 dark:text-white"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-500 dark:group-hover:text-gray-400">
                      {t('portfolio.ui.exploreButton')}
                    </span>
                    <span className="w-8 h-[1px] bg-gray-900 dark:bg-white transition-all duration-500 group-hover:w-16 group-hover:bg-gray-500 dark:group-hover:bg-gray-400"></span>
                    <svg 
                      className="w-4 h-4 transform transition-all duration-500 group-hover:translate-x-2 text-gray-900 dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-400" 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </Link>
                </motion.div>

              </div>
            </motion.section>
          ))}
        </div>

      </motion.div>
    </div>
  );
}