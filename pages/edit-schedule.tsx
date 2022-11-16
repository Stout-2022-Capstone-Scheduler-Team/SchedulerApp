import { Shift, Time, DayOftheWeek } from "../entities/types";
import { Calendar, ExportModal, AddEmployeeModal, AddShiftModal } from "../components";
import React from "react";
import { Stack } from "@mui/material";

export default function EditSchedule(): JSX.Element {
  // remove hard coded data once we add functionality to add shifts
  const dummyData = [
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Sunday),
      new Time(10.5, DayOftheWeek.Sunday),
      "Drew"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Sunday),
      new Time(10.5, DayOftheWeek.Sunday),
      "Fred"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Sunday),
      new Time(10.5, DayOftheWeek.Sunday),
      "John"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Sunday),
      new Time(10.5, DayOftheWeek.Sunday),
      "Spencer"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Monday),
      new Time(10.5, DayOftheWeek.Monday),
      "Mike"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Monday),
      new Time(10.5, DayOftheWeek.Monday),
      "Drew"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Monday),
      new Time(10.5, DayOftheWeek.Monday),
      "Fred"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Monday),
      new Time(10.5, DayOftheWeek.Monday),
      "John"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Tuesday),
      new Time(10.5, DayOftheWeek.Tuesday),
      "Spencer"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Tuesday),
      new Time(10.5, DayOftheWeek.Tuesday),
      "Mike"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Tuesday),
      new Time(10.5, DayOftheWeek.Tuesday),
      "Drew"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Tuesday),
      new Time(10.5, DayOftheWeek.Tuesday),
      "Fred"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Wednesday),
      new Time(10.5, DayOftheWeek.Wednesday),
      "John"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Wednesday),
      new Time(10.5, DayOftheWeek.Wednesday),
      "Spencer"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Wednesday),
      new Time(10.5, DayOftheWeek.Wednesday),
      "Mike"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Wednesday),
      new Time(10.5, DayOftheWeek.Wednesday),
      "Drew"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Thursday),
      new Time(10.5, DayOftheWeek.Thursday),
      "Fred"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Thursday),
      new Time(10.5, DayOftheWeek.Thursday),
      "John"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Thursday),
      new Time(10.5, DayOftheWeek.Thursday),
      "Spencer"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Thursday),
      new Time(10.5, DayOftheWeek.Thursday),
      "Mike"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Friday),
      new Time(10.5, DayOftheWeek.Friday),
      "Drew"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Friday),
      new Time(10.5, DayOftheWeek.Friday),
      "Fred"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Friday),
      new Time(10.5, DayOftheWeek.Friday),
      "John"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Friday),
      new Time(10.5, DayOftheWeek.Friday),
      "Spencer"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Saturday),
      new Time(10.5, DayOftheWeek.Saturday),
      "Mike"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Saturday),
      new Time(10.5, DayOftheWeek.Saturday),
      "Drew"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Saturday),
      new Time(10.5, DayOftheWeek.Saturday),
      "Fred"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Saturday),
      new Time(10.5, DayOftheWeek.Saturday),
      "John"
    ),
    new Shift(
      "Programmer",
      new Time(9.5, DayOftheWeek.Saturday),
      new Time(10.5, DayOftheWeek.Saturday),
      "Drew Accola"
    )
  ];

  // Reference to the calendar which enables exporting it
  const exportRef = React.useRef(null);

  return (
    <>
      <Calendar allShifts={dummyData} exportRef={exportRef} />
      <Stack spacing={2} direction={"row"}>
        <ExportModal componentToExport={exportRef} />
        <AddEmployeeModal />
        <AddShiftModal />
      </Stack>
    </>
  );
}
