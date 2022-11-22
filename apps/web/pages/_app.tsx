import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Welcome to web!</title>
    </Head>
    <main className="app">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </main>
  </>
);

export default CustomApp;
