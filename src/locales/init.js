import i18next from 'i18next';
import ru from './ru';
import en from './en';

const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
    en,
  },
});

export default i18n;
