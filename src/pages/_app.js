import '../styles/globals.css'
import Background from '../components/Background'
import { Head_app } from '../components/Head'
import GlobalStyleJS from '../styles/globals_in'

export default function App({ Component, pageProps }) {

  return (<>
    <Head_app />
    <GlobalStyleJS />
    <Background>
      <Component {...pageProps} />
    </Background>
  </>)
}
