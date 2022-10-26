import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Calendar from "../components/Calendar/Calendar";
import { Container } from "@mui/material";

import { Shift, Time, DayOftheWeek } from '../entities/types'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </>
  );
}

export default MyApp;
