import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';
let lang = 'es';
try {
  if (localStorage.getItem('sc-language') === 'en') lang = 'en';
} catch {/* storage unavailable */}
i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: es
    },
    en: {
      translation: en
    }
  },
  lng: lang,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false
  }
});
export default i18n;
