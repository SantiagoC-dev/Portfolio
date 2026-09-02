import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

import LS1 from '../assets/LS1.png';
import LS2 from '../assets/LS2.png';
import LS3 from '../assets/LS3.png';
import LS4 from '../assets/LS4.png';
import LS5 from '../assets/LS5.png';
import LS6 from '../assets/LS6.png';
import TC1 from '../assets/TC1.png';
import TC2 from '../assets/TC2.png';
import TC3 from '../assets/TC3.png';
import TC4 from '../assets/TC4.png';
import TC5 from '../assets/TC5.png';

// ─── DICCIONARIO DE IMÁGENES LOCALES ───
const galleryImages = {
  "1": [LS1, LS2, LS3, LS4, LS5, LS6],
  "2": [TC1, TC2, TC3, TC4, TC5]
};

// ─── COMPONENTE: GALERÍA (GRID ELEGANTE, SIN SCROLL) ───
function ProjectGallery({ layout, images }) {
  const { t } = useTranslation();

  if (!images || images.length === 0) return null;

  // ✅ OPTIMIZACIÓN 1: Contenedor gestiona la entrada en cascada (stagger), no cada imagen suelta.
  const galleryContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const imageItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] } }
  };

  return (
    <section className="py-20 lg:py-32 px-6 max-w-7xl mx-auto border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto mb-12 lg:mb-16 relative">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white tracking-tight">
            {t('caseStudy.ui.section3Title')}
          </h2>
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 mt-4 rounded-full"></div>
        </div>
      </div>

      {layout === 'desktop' ? (
        // LAYOUT ESCRITORIO
        <motion.div 
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto space-y-16 lg:space-y-20"
        >
          {images.map((img, idx) => (
            <motion.figure key={idx} variants={imageItem} className="w-full">
              {/* Barra superior tipo navegador */}
              <div className="flex items-center gap-1.5 rounded-t-xl md:rounded-t-2xl border border-b-0 border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 md:px-5 py-2.5 md:py-3.5">
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
              </div>
              <div className="aspect-video rounded-b-xl md:rounded-b-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 shadow-sm">
                <img src={img} alt={`Captura ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              {/* Índice editorial */}
              <figcaption className="flex items-center gap-4 mt-4 md:mt-5">
                <span className="text-[10px] md:text-xs font-mono tracking-wider text-gray-400 dark:text-gray-600">
                  0{idx + 1}
                </span>
                <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      ) : (
        // LAYOUT MÓVIL
        <motion.div 
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-16 pb-10"
        >
          {images.map((img, idx) => {
            const translateClass = "sm:even:translate-y-12 lg:even:translate-y-0 lg:[&:nth-child(3n+2)]:translate-y-16";
            
            return (
              <motion.figure key={idx} variants={imageItem} className={`w-full max-w-[240px] sm:max-w-[220px] mx-auto ${translateClass}`}>
                <div className="relative aspect-[9/19.5] rounded-[2rem] border-[5px] border-gray-900 dark:border-gray-800 bg-gray-900 dark:bg-gray-800 overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-gray-900 dark:bg-gray-800 rounded-b-xl z-10" />
                  <img src={img} alt={`Captura móvil ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <figcaption className="flex items-center justify-center mt-4">
                  <span className="text-[10px] md:text-xs font-mono tracking-wider text-gray-400 dark:text-gray-600">
                    0{idx + 1}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const rawData = t(`caseStudy.data.${id}`, { returnObjects: true });
  const data = rawData.title ? rawData : t(`caseStudy.data.1`, { returnObjects: true });
  const images = galleryImages[id] || galleryImages["1"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const smoothReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-gray-900 pb-12 md:pb-20 transition-colors duration-300">
      
      {/* ─── CABECERA EDITORIAL ─── */}
      <section className="pt-32 sm:pt-40 md:pt-48 pb-16 md:pb-24 px-6 max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          
          <motion.button 
            variants={smoothReveal}
            onClick={() => {
              navigate('/portfolio');
              window.scrollTo(0, 0);
            }}
            // ✅ OPTIMIZACIÓN 2: Transición CSS pura para el botón hover
            className="group flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium tracking-widest uppercase hover:text-black dark:hover:text-white transition-colors text-gray-400 dark:text-gray-500 mb-12 md:mb-20"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            {t('caseStudy.ui.backButton')}
          </motion.button>

          <motion.span variants={smoothReveal} className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-4 md:mb-6 block">
            {t('caseStudy.ui.headerLabel')}
          </motion.span>
          
          <motion.h1 variants={smoothReveal} className="text-5xl sm:text-6xl md:text-8xl font-serif mb-6 md:mb-8 tracking-tighter text-gray-900 dark:text-white leading-tight md:leading-none">
            {data.title}
          </motion.h1>
          
          <motion.p variants={smoothReveal} className="text-lg sm:text-xl md:text-3xl font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12 md:mb-16">
            {data.subtitle}
          </motion.p>
          
          <motion.div variants={smoothReveal} className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 py-8 md:py-10 border-y border-gray-200 dark:border-gray-800">
            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-1.5 md:mb-2">{t('caseStudy.ui.labels.role')}</p>
              <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">{data.role}</p>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-1.5 md:mb-2">{t('caseStudy.ui.labels.client')}</p>
              <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">{data.client}</p>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-1.5 md:mb-2">{t('caseStudy.ui.labels.timeline')}</p>
              <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">{data.timeline}</p>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-1.5 md:mb-2">{t('caseStudy.ui.labels.stack')}</p>
              <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">{data.stack}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 01. EL RETO ─── */}
      <section className="py-20 lg:py-32 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm px-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white tracking-tight">
                {t('caseStudy.ui.section1Title')}
              </h2>
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 mt-4 rounded-full"></div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="text-gray-600 dark:text-gray-300 font-light text-lg md:text-2xl leading-relaxed mb-10 md:mb-12">
              {data.problemText}
            </p>
            
            {/* ✅ OPTIMIZACIÓN 3: Agrupación de la lista bajo un solo whileInView */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6 md:space-y-8"
            >
              {data.problemPoints.map((point, index) => (
                <motion.div key={index} variants={smoothReveal} className="flex flex-col sm:flex-row gap-1 sm:gap-4 lg:gap-6 border-l-2 border-gray-300 dark:border-gray-700 pl-5 hover:border-gray-800 dark:hover:border-gray-300 transition-colors duration-500">
                  <span className="text-gray-900 dark:text-white font-medium min-w-[120px] lg:min-w-[140px] text-base lg:text-lg">{point.title}:</span>
                  <span className="text-gray-500 dark:text-gray-400 font-light text-sm lg:text-base leading-relaxed">{point.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 02. LA ARQUITECTURA ─── */}
      <section className="py-20 lg:py-32 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white tracking-tight">
                {t('caseStudy.ui.section2Title')}
              </h2>
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 mt-4 rounded-full"></div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h3 className="text-2xl md:text-4xl font-serif text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
              {data.architectureSubtitle}
            </h3>
            <div className="space-y-4 md:space-y-6 text-gray-500 dark:text-gray-400 font-light text-base md:text-lg leading-relaxed mb-12 md:mb-16">
              <p>{data.architectureText1}</p>
              <p>{data.architectureText2}</p>
            </div>
            
            {/* ✅ OPTIMIZACIÓN 3: Agrupación de grid bajo un solo whileInView */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
            >
              {data.features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={smoothReveal}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-gray-950/50"
                >
                  <h4 className="text-base md:text-lg font-serif text-gray-900 dark:text-white mb-2 md:mb-3">{feature.title}</h4>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 03. LA SOLUCIÓN VISUAL (GALERÍA) ─── */}
      <ProjectGallery layout={data.deviceType} images={images} />

      {/* ─── 04. EL IMPACTO ─── */}
      <section className="py-20 lg:py-32 px-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-12 md:mb-20 block">
            {t('caseStudy.ui.section4Title')}
          </span>
          
          {/* ✅ OPTIMIZACIÓN 3: Agrupación de métricas bajo un solo whileInView */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16"
          >
            {data.metrics.map((metric, i) => (
              <motion.div key={i} variants={smoothReveal}>
                <p className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-3 md:mb-4">{metric.value}</p>
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-2 md:mb-3">{metric.label}</p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light mx-auto max-w-[250px] leading-relaxed">
                  {metric.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}