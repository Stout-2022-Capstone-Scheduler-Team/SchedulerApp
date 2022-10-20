import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Calendar from "../components/Calendar/Calendar";
import { Container } from "@mui/material";

import { Shift, Time, DayOftheWeek } from '../entities/types'

function MyApp({ Component, pageProps }: AppProps) {

  const dummyData  = [
    new Shift(
      'line cook',
      new Time(9.85),
      new Time(10.85),
      DayOftheWeek.Monday,
      'alice',
    ),
    new Shift(
      'dishwasher',
      new Time(11.25),
      new Time(11.5),
      DayOftheWeek.Monday,
      'bob',
    ),
    new Shift(
      'job1',
      new Time(11.25),
      new Time(11.5),
      DayOftheWeek.Monday,
      'colin',
    ),
    new Shift(
      'job2',
      new Time(11.25),
      new Time(11.5),
      DayOftheWeek.Tuesday,
      'colin',
    ),
    new Shift(
      'job3',
      new Time(11.25),
      new Time(11.5),
      DayOftheWeek.Monday,
      'drew',
    ),
    new Shift(
      'job3',
      new Time(11.25),
      new Time(11.5),
      DayOftheWeek.Monday,
      'ron',
    )
  ]  
  
  return (
    <>
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
    <Calendar allShifts={dummyData}/>
    </>
  );

}

export default MyApp;
