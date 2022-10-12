/* istanbul ignore file */
// This file is not testable without spinning up an entire server,
// so it has been exluded from coverage results

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
