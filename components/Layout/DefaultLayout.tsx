import Head from "next/head";
import NavBar from "./NavBar";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

export default function DefaultLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Scheduler App</title>
        <meta name="description" content="This is the scheduler app"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
