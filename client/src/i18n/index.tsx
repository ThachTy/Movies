import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources, ns } from './resource'



i18next.use(initReactI18next).init({
    resources,
    ns,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },

})

export default i18next;