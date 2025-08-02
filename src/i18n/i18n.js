import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import tr from './locales/tr.json';
import de from './locales/de.json';
import ar from './locales/ar.json';
import es from './locales/es.json';
import fa from './locales/fa.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import ru from './locales/ru.json';
import el from './locales/el.json';
import hi from './locales/hi.json';
import id from './locales/id.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ptBR from './locales/pt-BR.json';
import pt from './locales/pt.json';
import uk from './locales/uk.json';
import ur from './locales/ur.json';
import zh from './locales/zh.json';


const LANGUAGE_KEY = 'user-language';

const resources = {
  en: { translation: en },
  tr: { translation: tr },
  de: { translation: de },
  ar: { translation: ar },
  es: { translation: es },
  fa: { translation: fa },
  fr: { translation: fr },
  it: { translation: it },
  ru: { translation: ru },
  ar: { translation: ar },
  el: { translation: el },
  hi: { translation: hi },
  id: { translation: id },
  ja: { translation: ja },
  ko: { translation: ko },
  ptBR: { translation: ptBR },
  pt: { translation: pt },
  uk: { translation: uk },
  ur: { translation: ur },
  zh: { translation: zh },







  

};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    compatibilityJSON: 'v3',
    interpolation: { escapeValue: false },
    lng: 'tr', // varsayılan
  });

export const setLanguage = async (lng) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  i18n.changeLanguage(lng);
};

export const loadLanguage = async () => {
  const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (storedLang) {
    await i18n.changeLanguage(storedLang);
  }
};

export default i18n;
