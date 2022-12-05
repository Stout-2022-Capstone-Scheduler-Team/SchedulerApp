import Head from "next/head";
import NavBar from "./NavBar";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import defaultTheme from "../../styles/defaultTheme";
import { CSSProperties } from "react";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const bodyStyle: CSSProperties = {
  paddingLeft: 20,
  paddingRight: 20
};

export default function DefaultLayout({ children }: LayoutProps): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Scheduler App</title>
        <meta name="description" content="This is the scheduler app"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <NavBar />
        <main style={bodyStyle}>{children}</main>
      </body>
    </ThemeProvider>
  );
}
