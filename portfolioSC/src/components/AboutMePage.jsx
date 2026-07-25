import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import certItep from '../assets/iTEPC.png';
import CV from '../assets/CV.pdf';
import Yo2 from '../assets/Yo2.png';
import Yo3 from '../assets/Yo3.png';
import Yo4 from '../assets/Yo4.png';

export default function AboutMePage() {
  const [selectedCert, setSelectedCert] = useState(null);
  
  // ─── ESTADO PARA EL SWIPE DECK (FOTOS) ───
  const [deck, setDeck] = useState([
    { id: 'img1', src: Yo2, alt: "Santiago Principal" },
    { id: 'img2', src: Yo3, alt: "Santiago 2" },
    { id: 'img3', src: Yo4, alt: "Santiago 3" },
  ]);

  const { t } = useTranslation();

  // Bloquear el scroll de la página cuando el modal está abierto
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedCert]);

  // Ciclar fotos del Swipe Deck
  const handleCycleDeck = () => {
    setDeck((prevDeck) => {
      const newDeck = [...prevDeck];
      newDeck.push(newDeck.shift());
      return newDeck;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const blurReveal = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] } 
    }
  };

  const maskReveal = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] } }
  };

  // ─── DATOS DE HABILIDADES ORDENADOS LÓGICAMENTE ───
  const skillsData = [
    // Frontend
    { name: 'React', color: '#61DAFB', fill: 'currentColor', stroke: false, icon: <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" /> },
    { name: 'React Native', color: '#61DAFB', fill: 'currentColor', stroke: false, icon: <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" /> },
    { name: 'Vue.js', color: '#4FC08D', fill: 'currentColor', stroke: false, icon: <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z" /> },
    // Lenguajes y Estilos
    { name: 'JavaScript', color: '#F7DF1E', fill: 'currentColor', stroke: false, icon: <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" /> },
    { name: 'TypeScript', color: '#3178C6', fill: 'currentColor', stroke: false, icon: <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" /> },
    { name: 'Tailwind', color: '#06B6D4', fill: 'currentColor', stroke: false, icon: <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /> },
    // Backend
    { name: 'Node.js', color: '#339933', fill: 'currentColor', stroke: false, icon: <path d="M12.004 0L1.75 5.922v12.156L12.004 24l10.246-5.922V5.922zM10.875 18.59l-.004-.002a2.383 2.383 0 01-1.077-.282A5.626 5.626 0 016.9 16.48l1.325-1.464a4.42 4.42 0 002.394 1.5c1.084.28 2.21-.186 2.456-.732.18-.396-.065-.898-1.07-1.19l-1.396-.397c-1.928-.548-2.656-1.942-2.308-3.21.36-1.314 1.76-2.193 3.498-2.193a5.535 5.535 0 013.25 1.053l-1.158 1.543a4.015 4.015 0 00-2.18-1.002c-.933-.147-1.803.18-1.968.614-.15.397.106.812.99 1.066l1.373.39c2.148.608 2.8 2.052 2.382 3.454-.42 1.408-1.968 2.316-3.615 2.316-.002.002-.002.002 0 .002zm6.27-.478V8.92h2.003v10.514c0 .066-.022.12-.06.155a.2.2 0 01-.15.056h-1.637a.2.2 0 01-.144-.055.205.205 0 01-.06-.153z"/> },
    { name: 'Python', color: '#3776AB', fill: 'currentColor', stroke: false, icon: <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" /> },
    { name: 'C++', color: '#00599C', fill: 'currentColor', stroke: false, icon: <path d="M22.25 0H1.75C.784 0 0 .784 0 1.75v20.5C0 23.216.784 24 1.75 24h20.5c.966 0 1.75-.784 1.75-1.75V1.75C24 .784 23.216 0 22.25 0zM10.68 14.512c-.52 1.52-1.996 2.508-3.664 2.508-2.192 0-3.952-1.756-3.952-3.948 0-2.192 1.756-3.948 3.952-3.948 1.668 0 3.144.988 3.664 2.508l-1.696.632c-.288-.844-1.072-1.42-1.968-1.42-1.24 0-2.232.992-2.232 2.228 0 1.24.992 2.228 2.232 2.228.896 0 1.68-.576 1.968-1.42l1.696.632zM15.42 15.34h-1.376v-2.02h-2.016v-1.376h2.016V9.924h1.376v2.02h2.016v1.376h-2.016v2.02zm5.78 0h-1.376v-2.02h-2.016v-1.376h2.016V9.924h1.376v2.02h2.016v1.376H21.2v2.02z" /> },
    // Bases de datos
    { name: 'MySQL', color: '#4479A1', fill: 'none', stroke: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /> },
    { name: 'MongoDB', color: '#47A248', fill: 'currentColor', stroke: false, icon: <path d="M17.193 9.555c-1.393-3.037-3.21-6.195-5.184-8.877-.042-.058-.178-.069-.228 0-1.976 2.682-3.791 5.84-5.184 8.877-1.117 2.44-1.636 5.564-1.284 8.169.314 2.335 1.768 4.295 3.905 5.25.321.143.66.24 1.008.288 1.5.21 2.898-.553 3.652-1.782.754 1.229 2.152 1.992 3.652 1.782.348-.048.687-.145 1.008-.288 2.137-.955 3.59-2.915 3.905-5.25.352-2.605-.167-5.729-1.284-8.169zm-5.08 9.539c-.58.336-1.332.336-1.912 0-.547-.318-.87-1.246-.948-2.642.668.214 1.385.325 2.124.325s1.456-.111 2.124-.325c-.078 1.396-.401 2.324-.948 2.642zm.968-3.323c-.636.177-1.306.27-1.984.27s-1.348-.093-1.984-.27c-.234-2.883.69-7.07 1.83-10.02.05-.129.258-.129.308 0 1.14 2.95 2.064 7.137 1.83 10.02z" /> },
    // Herramientas y Diseño
    { name: 'Figma', color: '#F24E1E', fill: 'currentColor', stroke: false, icon: <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" /> },
    { name: 'Git', color: '#F05032', fill: 'currentColor', stroke: false, icon: <path d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z" /> }
  ];

  const educationList = t('aboutMe.education', { returnObjects: true });

  const certImages = {
    1: { image: certItep, icon: "I" }
  };
  const certificatesData = t('aboutMe.certificates', { returnObjects: true }).map(cert => ({
    ...cert,
    image: certImages[cert.id].image,
    icon: certImages[cert.id].icon
  }));

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 pt-34 pb-32 overflow-hidden transition-colors duration-300">
      
      {/* ─── MODAL PREMIUM CON PORTAL: Asegurarse que AnimatePresence envuelva la condición y le damos key al hijo directo de AnimatePresence ─── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              key="cert-modal-backdrop" // ¡LA CLAVE MÁGICA QUE FALTABA!
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-black/80 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                key="cert-modal-content"
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-2xl cursor-default flex flex-col border border-gray-200 dark:border-gray-800"
                onClick={(e) => e.stopPropagation()} 
              >
                <div className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm" onClick={() => setSelectedCert(null)}>
                  <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </div>
                
                <div className="w-full bg-gray-50/50 dark:bg-gray-950/50 p-6 md:p-10 flex items-center justify-center rounded-t-2xl md:rounded-t-3xl">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="w-auto h-auto max-h-[65vh] object-contain rounded-md shadow-md"
                  />
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-5 px-6 md:px-10 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center shrink-0 rounded-b-2xl md:rounded-b-3xl">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-gray-900 dark:text-white">{selectedCert.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-1">{selectedCert.issuer} · {selectedCert.year}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <motion.section className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 mb-24 md:mb-40">
          
          <div className="w-full md:w-1/2 flex flex-col items-start z-10">
            <span className="overflow-hidden block mb-4">
              <motion.span variants={maskReveal} className="text-xs font-semibold tracking-widest text-gray-400 uppercase block">
                {t('aboutMe.subtitle')}
              </motion.span>
            </span>
            
            <motion.h1 variants={blurReveal} className="text-5xl sm:text-6xl md:text-8xl font-serif text-gray-900 dark:text-white mb-6 tracking-tight leading-none">
              {t('aboutMe.name')}
            </motion.h1>
            
            <motion.p variants={blurReveal} className="text-gray-500 dark:text-gray-400 font-light text-lg md:text-xl leading-relaxed max-w-lg mb-10">
              {t('aboutMe.description')}
            </motion.p>
            
            <motion.a 
              variants={blurReveal} 
              href={CV} 
              download="CV_Santiago_Calderon.pdf"
              className="bg-[#111827] text-white dark:bg-white dark:text-gray-900 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-black dark:hover:bg-gray-100 hover:scale-105 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl w-max"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              {t('aboutMe.downloadCV')}
            </motion.a>
          </div>

          <div className="w-full md:w-1/2 h-[400px] md:h-[550px] mt-12 md:mt-0 relative flex justify-center items-center">
            {deck.map((card, index) => {
              const isFront = index === 0;

              return (
                <motion.div
                  key={card.id}
                  layout
                  drag={isFront ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (Math.abs(info.offset.x) > 50) {
                      handleCycleDeck();
                    }
                  }}
                  onClick={handleCycleDeck}
                  animate={{
                    y: index === 0 ? 0 : index === 1 ? -30 : -15,
                    x: index === 0 ? 0 : index === 1 ? 40 : -40,
                    rotate: index === 0 ? -2 : index === 1 ? 6 : -6,
                    scale: index === 0 ? 1 : index === 1 ? 0.9 : 0.85,
                    zIndex: 30 - index,
                    opacity: index === 2 ? 0.6 : 1,
                    filter: index === 0 ? "grayscale(0%)" : "grayscale(40%)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`absolute w-52 md:w-72 h-[18rem] md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border-[6px] border-white dark:border-gray-800 ${isFront ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                  style={{ touchAction: "none" }}
                >
                  <img 
                    src={card.src} 
                    alt={card.alt} 
                    className="w-full h-full object-cover pointer-events-none select-none" 
                  />
                  {isFront && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="absolute bottom-4 left-0 w-full flex justify-center pointer-events-none"
                    >
                      <div className="bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded-full font-medium flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          
          <div>
            <motion.section variants={blurReveal} className="mb-20">
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8 block">
                {t('aboutMe.skillsTitle')}
              </span>
              <div className="flex flex-wrap gap-3">
                {skillsData.map((skill) => (
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    key={skill.name} 
                    className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 font-medium shadow-sm flex items-center gap-2.5 cursor-default hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  >
                    <svg 
                      className="w-5 h-5 shrink-0" 
                      viewBox="0 0 24 24" 
                      fill={skill.fill === 'none' ? 'none' : skill.color}
                      stroke={skill.stroke ? skill.color : 'none'}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {skill.icon}
                    </svg>
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            <motion.section variants={blurReveal}>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8 block">
                {t('aboutMe.languagesTitle')}
              </span>
              <div className="space-y-8 max-w-sm">
                
                <div className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-base font-medium text-gray-900 dark:text-white">{t('aboutMe.languages.spanish.name')}</span>
                    <span className="text-xs text-gray-400 font-light">{t('aboutMe.languages.spanish.level')}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '100%' }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }} 
                      className="absolute left-0 top-0 h-full bg-gray-900 dark:bg-white rounded-full" 
                    />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-base font-medium text-gray-900 dark:text-white">{t('aboutMe.languages.english.name')}</span>
                    <span className="text-xs text-gray-400 font-light">{t('aboutMe.languages.english.level')}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '60%' }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 2.5, ease: "easeInOut", delay: 0.6 }} 
                      className="absolute left-0 top-0 h-full bg-[#3178C6] rounded-full"
                    />
                  </div>
                </div>

              </div>
            </motion.section>
          </div>

          <div>
            <motion.section variants={blurReveal} className="mb-20">
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-10 block">
                {t('aboutMe.educationTitle')}
              </span>
              
              <div className="relative pl-8 space-y-12">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-[3px] top-2 w-[2px] bg-gray-200 dark:bg-gray-800 -z-10"
                />

                {educationList.map((item, index) => {
                  const isLast = index === educationList.length - 1;
                  const animationDelay = 0.2 + (index * 0.2);

                  return (
                    <motion.div key={index} whileHover={{ x: 5 }} className="relative transition-transform cursor-default group">
                      
                      {!isLast ? (
                        <motion.div 
                          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: animationDelay }}
                          className="absolute -left-[35px] top-1.5 w-3 h-3 bg-white dark:bg-gray-900 border-[3px] border-gray-300 dark:border-gray-700 rounded-full group-hover:border-gray-500 transition-colors"
                        />
                      ) : (
                        <>
                          <motion.div 
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: animationDelay }}
                            className="absolute -left-[34px] top-1.5 w-3 h-3 bg-gray-900 dark:bg-white border-[3px] border-gray-900 dark:border-white rounded-full z-10"
                          />
                          <motion.div 
                            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            className="absolute -left-[34px] top-1.5 w-3 h-3 bg-gray-900 dark:bg-white rounded-full z-0"
                          />
                        </>
                      )}

                      <p className="text-xs text-gray-400 mb-1 tracking-widest font-medium">{item.date}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light mb-1">{item.school}</p>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-300 transition-colors">{item.degree}</h4>
                    </motion.div>
                  );
                })}

              </div>
            </motion.section>

            <motion.section variants={blurReveal}>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8 block">
                {t('aboutMe.certificatesTitle')}
              </span>
              <div className="flex flex-col gap-4">
                
                {certificatesData.map((cert) => (
                  <motion.div 
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex items-center justify-between gap-5 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
                        <span className="text-gray-900 dark:text-white font-serif font-bold text-xl">{cert.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-0.5">{cert.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-light">{cert.issuer} · {cert.year}</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </motion.div>
                ))}

              </div>
            </motion.section>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}