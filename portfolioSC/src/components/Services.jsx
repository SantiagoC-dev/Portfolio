import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// ─── ICONOS MINIMALISTAS ───────────────────────────────────────────────────
const icons = [
  // Desarrollo Web/Multiplataforma
  <svg key="web" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M8 14l-2 2 2 2m3-4l2 2-2 2" />
  </svg>,
  // Arquitectura
  <svg key="architecture" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4m0 10v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M3 12h4m10 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>,
  // Consultoría/Freelance
  <svg key="consulting" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <circle cx="12" cy="8" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 20a7 7 0 0114 0M4 12h3m10 0h3M12 3v2" />
  </svg>,
  // Diseño UI/UX (Innovación)
  <svg key="innovation" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 21h4M8.5 14.5a6 6 0 117-1.3c-.95.75-1.5 1.45-1.5 2.8h-4c0-1.35-.55-2.05-1.5-2.8z" />
  </svg>
];

// ─── ANIMACIONES ───────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const revealVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────
export default function Services() {
  const { t } = useTranslation();
  
  const servicesList = t('services.items', { returnObjects: true });

  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="relative w-full border-t border-gray-200/70 dark:border-gray-800/70">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* ───────────────── HEADER ───────────────── */}
          <motion.div variants={revealVariants} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-16 mb-16 md:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-gray-900 dark:bg-white" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.22em] uppercase text-gray-500 dark:text-gray-400">
                  {t('services.subtitle')}
                </span>
              </div>

              <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-serif tracking-[-0.025em] leading-[1.05] text-gray-950 dark:text-white">
                {t('services.titleLine1')}
                <br className="hidden sm:block" />
                <span className="text-gray-400 dark:text-gray-600">
                  {' '}{t('services.titleLine2')}
                </span>
              </h2>
            </div>

            <div className="lg:self-end">
              <p className="max-w-md text-sm md:text-base leading-7 font-light text-gray-500 dark:text-gray-400 lg:ml-auto">
                {t('services.description')}
              </p>
            </div>
          </motion.div>

          {/* ───────────────── LISTA DE SERVICIOS ───────────────── */}
          <div className="border-t border-gray-200 dark:border-gray-800">
            {Array.isArray(servicesList) && servicesList.map((service, index) => (
              <motion.article
                key={index}
                variants={revealVariants}
                // ✅ CORRECCIÓN: Se eliminó el hover:bg-gray-50/50. Ahora la fila entera no cambia de color ni crea "cajas".
                className="group grid grid-cols-[28px_1fr] sm:grid-cols-[38px_1fr] md:grid-cols-[60px_56px_220px_1fr] gap-x-4 gap-y-1.5 md:gap-7 items-start py-7 md:py-8 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
              >
                {/* Número */}
                <div className="pt-0.5 md:pt-2 text-[11px] font-medium tracking-wider text-gray-400 dark:text-gray-600 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icono ✅ CORRECCIÓN: El sombreado (shadow-md) solo se aplica a la burbuja del icono al hacer hover */}
                <div className="hidden md:flex w-11 h-11 rounded-full border border-gray-200 dark:border-gray-700 items-center justify-center text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-950 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-500 group-hover:text-gray-950 dark:group-hover:text-white group-hover:scale-110 group-hover:shadow-md dark:group-hover:shadow-none shadow-sm">
                  {icons[index % icons.length]}
                </div>

                {/* Título */}
                <h3 className="text-base md:text-lg font-serif leading-snug text-gray-950 dark:text-white md:pt-2 group-hover:text-black dark:group-hover:text-gray-200 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Descripción */}
                <p className="col-start-2 md:col-auto max-w-xl text-sm md:text-[15px] leading-relaxed md:leading-7 font-light text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
              </motion.article>
            ))}
          </div>

          {/* ───────────────── CTA FINAL (Hablemos) ───────────────── */}
          <motion.div variants={revealVariants} className="mt-16 md:mt-20 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-sm text-center sm:text-left text-gray-500 dark:text-gray-400">
              {t('services.cta')}
            </p>

            <button
              type="button"
              onClick={scrollToContact}
              className="group mx-auto sm:mx-0 inline-flex items-center gap-2 text-sm font-medium text-gray-950 dark:text-white transition-opacity duration-300 hover:opacity-60"
            >
              <span>{t('services.button')}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}