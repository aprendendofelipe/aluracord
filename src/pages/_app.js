import { Head_app } from '../components/Head'
import GlobalStyle from '../styles/globals_in'

export default function App({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps)

  return (<>
    {/* <ApolloProvider client={apolloClient}> */}
      <Head_app />
      <GlobalStyle />
      <Component {...pageProps} />
    {/* </ApolloProvider> */}
    </>)
}
