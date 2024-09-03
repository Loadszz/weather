import '@/styles/style.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
	<Head>
        	<title>Weather</title>
      	</Head>
	return <Component {...pageProps} />
}
