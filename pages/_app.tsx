import React from 'react';

// Types
import { AppProps } from 'next/app';

// Styles
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
