import Head from 'next/head'

import { ThemeProvider } from 'styled-components'

import { Menu } from '../components/Menu'

import { GlobalStyles } from '../styles/globals'
import { DarkTheme } from '../styles/themes/dark'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Exxmon</title>
      </Head>
      <ThemeProvider theme={DarkTheme}>
        <GlobalStyles />
        <main>
          <Menu />
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  )
}

export default MyApp
