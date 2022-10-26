import { Shift, Time, DayOftheWeek } from "../entities/types";
import { Calendar, ExportModal } from "../components";
import React from "react";

export default function EditSchedule(): JSX.Element {
  // remove hard coded data once we add functionality to add shifts
  const dummyData = [
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Sunday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Sunday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Sunday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Sunday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Monday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Monday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Monday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Monday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Tuesday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Tuesday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Tuesday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Tuesday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Wednesday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Wednesday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Wednesday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Wednesday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Thursday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Thursday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Thursday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Thursday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Friday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Friday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Friday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Friday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Saturday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Saturday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Saturday,
      "Drew Accola"
    ),
    new Shift(
      "Programmer",
      new Time(9.5),
      new Time(10.5),
      DayOftheWeek.Saturday,
      "Drew Accola"
    )
  ];

  // Reference to the calendar which enables exporting it
  const exportRef = React.useRef(null);

  return (
    <>
      <Calendar allShifts={dummyData} exportRef={exportRef} />
      <ExportModal componentToExport={exportRef} />
    </>
  );
}
