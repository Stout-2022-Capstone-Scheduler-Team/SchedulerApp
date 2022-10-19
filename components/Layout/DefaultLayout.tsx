import Head from 'next/head'
import NavBar from './NavBar'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import defaultTheme from '../../styles/defaultTheme'

interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}

export default function DefaultLayout({ children }: LayoutProps): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Scheduler App</title>
        <meta name="description" content="This is the scheduler app"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>
    </ThemeProvider>
  )
}
