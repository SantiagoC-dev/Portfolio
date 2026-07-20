import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

// ─── BASE DE DATOS LOCAL DE CASOS DE ESTUDIO ───
const caseStudiesData = {
  "1": {
    title: "LabStock",
    subtitle: "Sistema móvil de gestión y optimización de inventarios para el área de calidad.",
    role: "Ingeniero de Software Principal",
    client: "Aguakan (Área de Calidad)",
    timeline: "T3 2024",
    stack: "React Native, Node.js, MySQL",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2000&q=90",
    problemText: "Antes de LabStock, el control de reactivos, materiales y equipos se realizaba enteramente mediante hojas de cálculo y registros en papel. Esto ocasionaba una pérdida de tiempo operativa masiva y una preocupante falta de trazabilidad.",
    problemPoints: [
      { title: "Tiempo Muerto", desc: "Pérdida de 1.5 horas diarias por usuario transcribiendo anotaciones de papel a una PC fija." },
      { title: "Discrepancia", desc: "1 de cada 5 datos en Excel no coincidía con el stock físico real debido a errores de captura." },
      { title: "Merma", desc: "15% del presupuesto desperdiciado anualmente en reactivos caducados en estantería." }
    ],
    architectureSubtitle: "Infraestructura local con alta disponibilidad y acceso móvil.",
    architectureText1: "Para solucionar la dependencia de conexiones inestables a internet y reducir costos operativos, estructuré una arquitectura Cliente-Servidor desplegada en una red local independiente (Intranet).",
    architectureText2: "Utilicé un enrutador configurado como Access Point exclusivo para los dispositivos de operación, conectándose a un servidor local que aloja la base de datos MySQL y el Backend en Node.js.",
    features: [
      { title: "Auto-Recuperación", desc: "Configuración de servicios de auto-arranque. Si el servidor se reinicia, el sistema se restablece sin intervención humana." },
      { title: "Seguridad Dinámica", desc: "Implementación de Reglas de Firewall específicas y gestión de roles (Administradores vs Laboratoristas)." }
    ],
    metrics: [
      { value: "90%", label: "Más Rápidos", desc: "El tiempo de registro manual bajó de 10 minutos a 45 segundos en el móvil." },
      { value: "<1%", label: "Merma Anual", desc: "Gracias al sistema de alertas preventivas de caducidad automatizadas." },
      { value: "$0", label: "En Licencias", desc: "Desarrollado 100% con tecnologías Open Source a nivel empresarial." }
    ]
  },
  "2": {
    title: "TourCraft",
    subtitle: "Marketplace turístico digital enfocado en la Riviera Maya para democratizar el turismo local.",
    role: "Desarrollador Full Stack",
    client: "Proyecto Independiente B2C",
    timeline: "T3 2026",
    stack: "React, Vite, Node.js, MongoDB",
    heroImage: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=2000&q=90",
    problemText: "Los guías independientes y pequeños negocios locales de la Riviera Maya enfrentan una severa falta de visibilidad frente a los grandes operadores turísticos. Esto monopoliza el mercado y dificulta la conexión con turistas que buscan experiencias auténticas.",
    problemPoints: [
      { title: "Invisibilidad Digital", desc: "Los guías locales no cuentan con plataformas accesibles y modernas para ofrecer sus servicios de manera directa." },
      { title: "Monopolio Turístico", desc: "Las grandes agencias acaparan la atención, dejando sin oportunidades de crecimiento económico a los residentes." },
      { title: "Falta de Confianza", desc: "Inexistencia de un sistema de reseñas centralizado que valide la calidad del servicio de guías independientes." }
    ],
    architectureSubtitle: "Arquitectura Cliente-Servidor bajo el patrón MVC.",
    architectureText1: "Desarrollé la plataforma utilizando el stack MERN, implementando una separación clara de responsabilidades mediante el patrón Modelo-Vista-Controlador. Todo el proceso fue gestionado bajo la metodología ágil SCRUM.",
    architectureText2: "El ecosistema integra exploración de destinos con un enfoque hiperlocal, perfiles de usuario verificados, espacios publicitarios para negocios locales y un flujo completo de simulación de reservas.",
    features: [
      { title: "Ecosistema B2C", desc: "Conexión directa y sin intermediarios entre el consumidor final (turista) y el proveedor de servicios (guía o negocio)." },
      { title: "Turismo Sostenible", desc: "Fomento de la economía local distribuyendo los ingresos turísticos directamente a la comunidad." }
    ],
    metrics: [
      { value: "MERN", label: "Stack Tecnológico", desc: "Base de datos en MongoDB con backend en Node.js/Express y frontend en React." },
      { value: "MVC", label: "Arquitectura", desc: "Código modular, escalable y mantenible con estricta separación de capas lógicas." },
      { value: "Agile", label: "Metodología", desc: "Desarrollo basado en entregas iterativas e incrementales utilizando SCRUM." }
    ]
  }
};

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Si no se encuentra el ID, por defecto muestra LabStock ("1")
  const data = caseStudiesData[id] || caseStudiesData["1"];

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
    <div className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-black selection:text-white pb-32">
      
      {/* ─── NAVEGACIÓN INTERNA Y HERO DEL CASE STUDY ─── */}
      <section className="pt-40 md:pt-48 pb-20 px-6 max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          
          {/* Botón Volver Integrado de forma orgánica */}
          <motion.button 
            variants={fadeInUp}
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-3 text-sm font-medium tracking-widest uppercase hover:text-black transition-colors text-gray-400 mb-20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Volver al Portafolio
          </motion.button>

          <motion.span variants={fadeInUp} className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6 block">
            Caso de Estudio
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-serif mb-8 tracking-tighter text-gray-900 leading-none">
            {data.title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-3xl font-light text-gray-500 leading-relaxed max-w-3xl mb-16">
            {data.subtitle}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gray-200">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Rol</p>
              <p className="text-sm font-medium text-gray-900">{data.role}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Cliente</p>
              <p className="text-sm font-medium text-gray-900">{data.client}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Período</p>
              <p className="text-sm font-medium text-gray-900">{data.timeline}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Tecnologías Principales</p>
              <p className="text-sm font-medium text-gray-900">{data.stack}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── IMAGEN HERO (AJUSTADA A MAX-W-5XL) ─── */}
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.215, 0.610, 0.355, 1.000] }}
        className="px-6 max-w-5xl mx-auto mb-32"
      >
        <div className="w-full aspect-[16/8] md:aspect-[21/9] bg-gray-100 rounded-[2rem] overflow-hidden shadow-xl">
          <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover grayscale-[10%]" />
        </div>
      </motion.section>

      {/* ─── 01. EL RETO ─── */}
      <section className="py-32 bg-gray-100 px-6 border-y border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          
          <div className="md:col-span-4 relative">
            <div className="sticky top-12">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 tracking-tight">
                01. El Reto
              </h2>
              <div className="w-12 h-1 bg-gray-300 mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="md:col-span-8">
            <p className="text-gray-600 font-light text-xl md:text-2xl leading-relaxed mb-12">
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
                  className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-l-2 border-gray-300 pl-6 hover:border-gray-800 transition-colors duration-500"
                >
                  <span className="text-gray-900 font-medium min-w-[140px] text-lg">{point.title}:</span>
                  <span className="text-gray-500 font-light text-base leading-relaxed">{point.desc}</span>
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
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 tracking-tight">
                02. Arquitectura
              </h2>
              <div className="w-12 h-1 bg-gray-300 mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="md:col-span-8">
            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 leading-tight">
              {data.architectureSubtitle}
            </h3>
            <div className="space-y-6 text-gray-500 font-light text-lg leading-relaxed mb-16">
              <p>{data.architectureText1}</p>
              <p>{data.architectureText2}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data.features.map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <h4 className="text-lg font-serif text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03. EL IMPACTO ─── */}
      <section className="py-24 bg-gray-50 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-16 block">
            03. El Impacto Operativo
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
                <p className="text-6xl md:text-7xl font-serif text-gray-900 mb-4">{metric.value}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">{metric.label}</p>
                <p className="text-sm text-gray-500 font-light mx-auto max-w-[250px] leading-relaxed">
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