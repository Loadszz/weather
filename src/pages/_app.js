import '@/styles/style.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Weather</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
