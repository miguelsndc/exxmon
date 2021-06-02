import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/globals'

import { LeftSidebar } from '../components/LeftSidebar'

import { DarkTheme } from '../styles/themes/dark'
import { MovieProvider } from '../contexts/MovieContext'

function MyApp({ Component, pageProps }) {
  return (
    <MovieProvider>
      <ThemeProvider theme={DarkTheme}>
        <GlobalStyles />
        <main style={{ display: 'flex' }}>
          <LeftSidebar />
          <Component {...pageProps} />
          {/* <RightSidebar /> */}
        </main>
      </ThemeProvider>
    </MovieProvider>
  )
}

export default MyApp
