import { VIETNAMESE_LANGUAGE, ENGLISH_LANGUAGE } from "constant";

export type SearchParamsType = {
  page: number;
  limit: number;

  search?: string;
};

export type LanguageType = typeof VIETNAMESE_LANGUAGE | typeof ENGLISH_LANGUAGE;

export interface Option {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}
