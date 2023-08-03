import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import {DefaultSeo} from 'next-seo';
export default function App({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider>
    <Component {...pageProps} />
    </SessionProvider>)
}
