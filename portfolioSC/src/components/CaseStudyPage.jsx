import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Hook de traducción

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

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto mb-16 relative">
        <div className="sticky top-12">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white tracking-tight">
            {t('caseStudy.ui.section3Title')}
          </h2>
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 mt-4 rounded-full"></div>
        </div>
      </div>

      {layout === 'desktop' ? (
        // LAYOUT ESCRITORIO — mockup de navegador, minimalista y editorial
        <div className="max-w-5xl mx-auto space-y-20">
          {images.map((img, idx) => (
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="w-full"
            >
              {/* Barra superior tipo navegador */}
              <div className="flex items-center gap-1.5 rounded-t-2xl border border-b-0 border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm px-5 py-3.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700" />
              </div>
              <div className="aspect-video rounded-b-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 shadow-sm">
                <img src={img} alt={`Captura ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
              {/* Índice editorial */}
              <figcaption className="flex items-center gap-4 mt-5">
                <span className="text-xs font-mono tracking-wider text-gray-400 dark:text-gray-600">
                  0{idx + 1}
                </span>
                <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      ) : (
        // LAYOUT MÓVIL — marco de dispositivo fino, con desfase alterno para dar ritmo
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-16">
          {images.map((img, idx) => (
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.215, 0.610, 0.355, 1.000] }}
              className={`w-full max-w-[220px] mx-auto ${idx % 2 === 1 ? 'sm:translate-y-10' : ''}`}
            >
              <div className="relative aspect-[9/19.5] rounded-[2rem] border-[5px] border-gray-900 dark:border-gray-800 bg-gray-900 dark:bg-gray-800 overflow-hidden shadow-md">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-gray-900 dark:bg-gray-800 rounded-b-xl z-10" />
                <img src={img} alt={`Captura móvil ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
              <figcaption className="flex items-center justify-center mt-4">
                <span className="text-xs font-mono tracking-wider text-gray-400 dark:text-gray-600">
                  0{idx + 1}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}
    </section>
  );
}

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Obtenemos los datos desde el JSON traducido o caemos al "1" por defecto
  const rawData = t(`caseStudy.data.${id}`, { returnObjects: true });
  const data = rawData.title ? rawData : t(`caseStudy.data.1`, { returnObjects: true });
  const images = galleryImages[id] || galleryImages["1"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    // Se removió el bg sólido del contenedor principal
    <div className="min-h-screen text-gray-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-gray-900 pb-20 transition-colors duration-300">
      
      {/* ─── CABECERA EDITORIAL ─── */}
      <section className="pt-40 md:pt-48 pb-24 px-6 max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          
          <motion.button 
            variants={fadeInUp}
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-3 text-sm font-medium tracking-widest uppercase hover:text-black dark:hover:text-white transition-colors text-gray-400 dark:text-gray-500 mb-20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            {t('caseStudy.ui.backButton')}
          </motion.button>

          <motion.span variants={fadeInUp} className="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-6 block">
            {t('caseStudy.ui.headerLabel')}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-serif mb-8 tracking-tighter text-gray-900 dark:text-white leading-none">
            {data.title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-3xl font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-16">
            {data.subtitle}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gray-200 dark:border-gray-800">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-2">{t('caseStudy.ui.labels.role')}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{data.role}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-2">{t('caseStudy.ui.labels.client')}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{data.client}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-2">{t('caseStudy.ui.labels.timeline')}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{data.timeline}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-2">{t('caseStudy.ui.labels.stack')}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{data.stack}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 01. EL RETO (Se usó un fondo translúcido/glassmorphism sutil para mantener el diseño sin tapar el fondo) ─── */}
      <section className="py-32 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm px-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4 relative">
            <div className="sticky top-12">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white tracking-tight">
                {t('caseStudy.ui.section1Title')}
              </h2>
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 mt-4 rounded-full"></div>
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-gray-600 dark:text-gray-300 font-light text-xl md:text-2xl leading-relaxed mb-12">
              {data.problemText}
            </p>
            <div className="space-y-8">
              {data.problemPoints.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-l-2 border-gray-300 dark:border-gray-700 pl-6 hover:border-gray-800 dark:hover:border-gray-300 transition-colors duration-500"
                >
                  <span className="text-gray-900 dark:text-white font-medium min-w-[140px] text-lg">{point.title}:</span>
                  <span className="text-gray-500 dark:text-gray-400 font-light text-base leading-relaxed">{point.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02. LA ARQUITECTURA ─── */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4 relative">
            <div className="sticky top-12">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white tracking-tight">
                {t('caseStudy.ui.section2Title')}
              </h2>
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 mt-4 rounded-full"></div>
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-8 leading-tight">
              {data.architectureSubtitle}
            </h3>
            <div className="space-y-6 text-gray-500 dark:text-gray-400 font-light text-lg leading-relaxed mb-16">
              <p>{data.architectureText1}</p>
              <p>{data.architectureText2}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data.features.map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-gray-950/50 transition-all duration-500"
                >
                  <h4 className="text-lg font-serif text-gray-900 dark:text-white mb-3">{feature.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03. LA SOLUCIÓN VISUAL (GALERÍA) ─── */}
      <ProjectGallery layout={data.deviceType} images={images} />

      {/* ─── 04. EL IMPACTO ─── */}
      <section className="py-32 px-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase mb-20 block">
            {t('caseStudy.ui.section4Title')}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {data.metrics.map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <p className="text-6xl md:text-7xl font-serif text-gray-900 dark:text-white mb-4">{metric.value}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-3">{metric.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light mx-auto max-w-[250px] leading-relaxed">
                  {metric.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}