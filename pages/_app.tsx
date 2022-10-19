import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Calendar from "../components/Calendar/Calendar";
import { Container } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
    <Calendar />
    </>
  );
}

export default MyApp;
