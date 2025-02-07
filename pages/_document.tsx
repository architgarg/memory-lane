import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='bg-kabul-light'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
