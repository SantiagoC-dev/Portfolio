import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-[#fafafa] text-gray-900 dark:bg-gray-950 dark:text-gray-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Router>
        <main className="flex flex-col min-h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hobbies" element={<HobbiesPage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/inspirations" element={<InspirationsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutMePage />} />
            <Route path="/case-study/:id" element={<CaseStudyPage />} />
          </Routes>
          
          <Footer />
        </main>
      </Router>
    </div>
  );
}

export default App;