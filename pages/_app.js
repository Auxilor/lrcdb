import { CssVarsProvider } from '@mui/joy'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <CssVarsProvider>
      <Component {...pageProps} />
    </CssVarsProvider>
  )
}

export default App
