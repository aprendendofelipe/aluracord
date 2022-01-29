import { Head_app } from '../components/Head'
import GlobalStyle from '../styles/globals_in'

export default function App({ Component, pageProps }) {

  return (<>
    <Head_app />
    <GlobalStyle />
    <Component {...pageProps} />
  </>)
}
