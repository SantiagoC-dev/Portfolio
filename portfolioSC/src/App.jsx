import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudyPage from './components/CaseStudyPage';
import { useReveal } from './hooks/useReveal';
function Home() {
  return <><Hero /><Projects /><Services /><Profile /><Contact /></>;
}
function Shell() {
  const {
    pathname,
    hash,
    key
  } = useLocation();
  const {
    i18n
  } = useTranslation();
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('sc-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('sc-theme', theme);
    } catch {/* storage unavailable */}
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'es';
  }, [i18n.resolvedLanguage]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
          });
          return;
        }
      }
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  useEffect(() => {
    document.title = pathname.includes('case-study') ? `${/labstock|\/1$/.test(pathname) ? 'LabStock' : /tourcraft|\/2$/.test(pathname) ? 'TourCraft' : 'Case study'} · Santiago Calderón` : 'Santiago Calderón · Software Developer';
  }, [pathname]);
  useReveal(pathname);
  return <><Navbar theme={theme} toggleTheme={() => setTheme(v => v === 'light' ? 'dark' : 'light')} /><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/case-study/:id" element={<CaseStudyPage />} /><Route path="/portfolio" element={<Navigate to="/#work" replace />} /><Route path="/about" element={<Navigate to="/#about" replace />} />{['hobbies', 'playlist', 'inspirations'].map(p => <Route key={p} path={`/${p}`} element={<Navigate to="/#about" replace />} />)}<Route path="*" element={<Navigate to="/" replace />} /></Routes></main><Footer /></>;
}
export default function App() {
  return <BrowserRouter><Shell /></BrowserRouter>;
}
