import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en';
import my from './locales/my';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'my',
  resources: {
    en: {translation: en},
    my: {translation: my},
  },
  lng: 'my',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
