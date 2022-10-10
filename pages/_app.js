import { CssVarsProvider } from '@mui/joy'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return <CssVarsProvider>
    <title>lrcdb</title>
    <Component {...pageProps} />
  </CssVarsProvider>
}

export default App
