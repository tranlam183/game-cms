import { Cluster } from "cluster";

export const API_URL = process.env.API_URL as string;
export const SENTRY_DSN = process.env.SENTRY_DSN as string;
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID as string;
export const SOCKET_URL = process.env.SOCKET_URL as string;
export const OG_IMAGE = process.env.OG_IMAGE as string;

export const THEME_KEY = "theme";
export const DARK_THEME_MEDIA_SYSTEM = "(prefers-color-scheme: dark)";

// Config app
export const MAX_WIDTH_APP = 1920;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const DEBOUNCE_SCROLL = 250; //ms

export const FORMAT_DATE_TIME = "hh:mm yyyy/MM/dd";
export const FORMAT_TIME = "hh:mm";

export const HOME_PATH = "/";
export const SIGNIN_PATH = "/signin";

// Config multiple language
export const ENGLISH_LANGUAGE = "en";
export const VIETNAMESE_LANGUAGE = "vi";
export const DEFAULT_LANGUAGE = ENGLISH_LANGUAGE;
export const DEFAULT_NAMESPACE = "common";
export const NS_HOME = "home";
export const SOLANA_NETWORK = process.env.SOLANA_NETWORK as unknown as Cluster;
//export const SOLANA_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);
export const SOLANA_ENDPOINT = "http://103.23.44.47:8899";