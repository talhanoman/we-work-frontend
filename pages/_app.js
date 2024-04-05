import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'
import Head from 'next/head'
// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({ subsets: ['latin'] })
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>WeWork</title>
        <meta name="description" content="WeWork MicroServices" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
    
    <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>
    </>
  )
}
