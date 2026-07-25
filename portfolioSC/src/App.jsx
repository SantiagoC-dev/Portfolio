import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Interests from './components/Interests';
import MyJourney from './components/MyJourney';
import LovedOnes from './components/LovedOnes';
import Footer from './components/Footer';
import HobbiesPage from './components/HobbiesPage';
import PlaylistPage from './components/PlaylistPage';
import InspirationsPage from './components/InspirationsPage';
import PortfolioPage from './components/PortfolioPage';
import AboutMePage from './components/AboutMePage';
import CaseStudyPage from './components/CaseStudyPage';

function Home() {
  return (
    <>
      <Hero />
      <Interests />
      <MyJourney />
      <LovedOnes />
    </>
  );
}

function App() {
  const { i18n } = useTranslation();
  const currentLang = i18n?.language || 'es';
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0.4, 1],
      filter: ["blur(3px)", "blur(0px)"],
      transition: { duration: 0.35, ease: "easeOut" }
    });
  }, [currentLang, controls]);

  return (
    <div className="relative min-h-screen font-sans transition-colors duration-300 bg-[#fafafa] text-gray-900 dark:bg-gray-950 dark:text-gray-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* ─── FONDO ANIMADO TIPO AURORA GLOBAL ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gray-300/80 dark:bg-gray-600/30 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-[30%] right-[-5%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-gray-400/60 dark:bg-gray-800/80 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -80, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[20%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gray-300/70 dark:bg-gray-700/40 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <Router>
        {/* Usamos relative y z-10 para que todo el contenido quede por encima del fondo */}
        <main className="relative z-10 flex flex-col min-h-screen">
          
          <Navbar />

          <motion.div 
            animate={controls}
            className="flex-grow flex flex-col"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hobbies" element={<HobbiesPage />} />
              <Route path="/playlist" element={<PlaylistPage />} />
              <Route path="/inspirations" element={<InspirationsPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutMePage />} />
              <Route path="/case-study/:id" element={<CaseStudyPage />} />
            </Routes>
          </motion.div>
          
          <Footer />
        </main>
      </Router>
    </div>
  );
}

export default App;