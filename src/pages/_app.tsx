import React, { useEffect } from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import "utils/i18n";
import "../../public/styles/index.scss";
import { createEmotionCache } from "../../public/material";
import { AppearanceProvider } from "contexts";
import { store } from "store/configureStore";
import { Provider } from "react-redux";
import { GOOGLE_ANALYTICS_ID } from "constant";
import Script from "next/script";
import SolanaProvider from "contexts/SolanaProvider";
import { AuthData, updateAuth, AUTH_WALLET_COOKIE, fieldChange } from "store/app";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any;
  authWalletCookies: AuthData | null;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    err,
    authWalletCookies,

  } = props;

  useEffect(() => {
    if (authWalletCookies) {
      store.dispatch(updateAuth(authWalletCookies));
    }
    store.dispatch(fieldChange({ key: "appReady", value: true }));
  }, [authWalletCookies]);
  
  return (
    // <CacheProvider value={emotionCache}>
    <AppearanceProvider>
      <Provider store={store}>
        <SolanaProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
                `}
          </Script>
          <CssBaseline />
          <Component {...pageProps} err={err} />
        </SolanaProvider>
      </Provider>
    </AppearanceProvider>
    // </CacheProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  const appProps = await App.getInitialProps(appContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authWalletCookies = (appContext.ctx.req as any)?.cookies[
    AUTH_WALLET_COOKIE
  ] as string;

  return {
    ...appProps,
    authWalletCookies: authWalletCookies ? JSON.parse(authWalletCookies) : null,
  };
};

