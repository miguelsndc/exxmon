import Head from 'next/head'

import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/globals'
import { Container } from '../styles/globals'

import { Menu } from '../components/Menu'

import { DarkTheme } from '../styles/themes/dark'
import { MovieProvider } from '../contexts/MovieContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Exxmon</title>
      </Head>
      <MovieProvider>
        <ThemeProvider theme={DarkTheme}>
          <GlobalStyles />
          <main style={{ display: 'flex' }}>
            <Menu />
            <Container>
              <Component {...pageProps} />
            </Container>
          </main>
        </ThemeProvider>
      </MovieProvider>
    </>
  )
}

export default MyApp
