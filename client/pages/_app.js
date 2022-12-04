import '../styles/globals.css'
import { createContext, useEffect, useState } from 'react'
import AuthProvider from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   const getSession = async () => {
  //     // TODO GET REQUEST TO API AND VERIFY IF ACTIVE JWT IF SO SET VALUE
  //   }
  //   getSession()
  // }, [])
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
