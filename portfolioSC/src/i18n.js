import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationES from './locales/es.json';
import translationEN from './locales/en.json';

// Los recursos son los diccionarios que creamos
const resources = {
  es: { translation: translationES },
  en: { translation: translationEN }
};

i18n
  .use(initReactI18next) // Pasa i18n a react-i18next
  .init({
    resources,
    lng: 'es', // Idioma por defecto
    fallbackLng: 'en', // Si falta una traducción en español, usa inglés
    interpolation: {
      escapeValue: false // React ya es seguro contra XSS
    }
  });

export default i18n;