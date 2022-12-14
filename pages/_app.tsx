import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { FirebaseAppProvider, FirestoreProvider } from 'reactfire';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { theme } from '../theme';
import { createEmotionCache } from '../utils/createEmotionCache';
import { firebaseConfig } from '../config/firebase';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <FirestoreProvider sdk={firestore}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  );
}
