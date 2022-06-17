import i18next from "i18next";
import enLang from "assets/locales/en";
import viLang from "assets/locales/vi";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, DEFAULT_NAMESPACE } from "constant";
import { getOSLanguage } from "utils";

i18next.use(initReactI18next).init(
  {
    interpolation: {
      escapeValue: false,
    },
    lng: getOSLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    resources: {
      en: enLang,
      vi: viLang,
    },
    defaultNS: DEFAULT_NAMESPACE,
    fallbackNS: DEFAULT_NAMESPACE,
    contextSeparator: "__",
  },
  (err: unknown) => {
    if (err) {
      return console.error(err);
    }
  },
);

export default i18next;
