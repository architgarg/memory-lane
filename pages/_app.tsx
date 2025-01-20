import { AppProps } from 'next/app'
import '../styles/index.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default MyApp
