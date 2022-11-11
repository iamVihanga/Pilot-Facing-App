import React, { useEffect } from 'react'
import '../styles/globals.css'
import { Provider } from "react-redux";
import store from '../redux/store'
import Head from 'next/head'
// import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import supabaseClient from '../config/supabaseClient'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >

      <Provider store={store}>
        <Head>
          <title>On The Fly Drones</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </SessionContextProvider>
  )
}

export default MyApp
