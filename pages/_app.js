import '../styles/globals.css'
import { Provider } from "react-redux";
import store from '../redux/store'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>On The Fly Drones</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
