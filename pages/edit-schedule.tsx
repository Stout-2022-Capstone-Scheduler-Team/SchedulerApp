import { Button, Box, Stack } from "@mui/material";

import type { AppProps } from "next/app";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Calendar from "../components/Calendar/Calendar";
import { Container } from "@mui/material";

import { Shift, Time, DayOftheWeek } from '../entities/types'
export default function EditSchedule(): JSX.Element {

	const dummyData  = [
		new Shift(
      'line cook',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Sunday,
      'alice',
    ),
		new Shift(
      'line cook',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Friday,
      'alice',
    ),
		new Shift(
      'line cook',
      new Time(9.50),
      new Time(10.50),
      DayOftheWeek.Monday,
      'alice',
    ),
    new Shift(
      'line cook',
      new Time(9.50),
      new Time(10.50),
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
    ),
    new Shift(
      '',
      new Time(8.0),
      new Time(16.0),
      DayOftheWeek.Friday,
      'Edge Case 2',
    ),
    new Shift(
      '',
      new Time(0.25),
      new Time(23.75),
      DayOftheWeek.Friday,
      'Edge Case 3',
    ),
    new Shift(
      '',
      new Time(8.85),
      new Time(23.10),
      DayOftheWeek.Thursday,
      'Edge Case 1',
    ),
    new Shift(
      '',
      new Time(10.0),
      new Time(23.0),
      DayOftheWeek.Wednesday,
      'Edge Case 4',
    )
  ]  
    return (
        <>
					<Calendar allShifts={dummyData}/>
					{/* Add additional components to this page */}
        </>
    )
}