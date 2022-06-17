import { DARK_THEME_MEDIA_SYSTEM, DEFAULT_LANGUAGE } from "constant";
import { AppearanceType } from "constant/enum";
import { LanguageType } from "constant/types";
import { clientStorage } from "utils/storage";

export const getTheme = (
  key: string,
  fallback: AppearanceType,
): AppearanceType => {
  if (typeof window === "undefined") return fallback;
  try {
    const theme =
      (clientStorage.get(key) as AppearanceType) || getThemeSystem();
    return theme || fallback;
  } catch (error) {
    // Unsupported
    console.error(error);
  }
  return fallback;
};

export const getThemeSystem = (e?: MediaQueryList): AppearanceType => {
  if (!e) {
    e = window.matchMedia(DARK_THEME_MEDIA_SYSTEM);
  }

  const isDark = e.matches;

  const themeSystem = isDark ? AppearanceType.Dark : AppearanceType.Light;
  return themeSystem;
};

export const getOSLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE as LanguageType;

  const language =
    window.navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;

  return (language ? language.slice(0, 2) : DEFAULT_LANGUAGE) as LanguageType;
};

export const parseJSON = (data: string, defaultData: unknown): unknown => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return defaultData;
  }
};
