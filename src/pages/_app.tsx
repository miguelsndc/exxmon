import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/globals'

import { LeftSidebar } from '../components/LeftSidebar'
import { RightSidebar } from '../components/RightSidebar'

import { DarkTheme } from '../styles/themes/dark'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={DarkTheme}>
      <GlobalStyles />
      <main style={{ display: 'flex' }}>
        <LeftSidebar />
        <Component {...pageProps} />
        {/* <RightSidebar /> */}
      </main>
    </ThemeProvider>
  )
}

export default MyApp
