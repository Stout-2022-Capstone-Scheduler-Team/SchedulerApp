import { Shift, DayOftheWeek, dayName } from "../../entities/types";
import { DailyShifts } from "./DailyShifts";
import { WeeklyDate } from "./WeeklyDate";

import { Grid } from "@mui/material";
import { RefObject } from "react";

function getColorMap(allShifts: Shift[]): { [key: string]: string } {
  const colorsMap: { [key: string]: string } = {};
  let nextAvailableIndex = 0;
  const colorsArray = ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231",
    "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe",
    "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000",
    "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080"];

  // randomly shuffles the array
  colorsArray.sort(() => Math.random() - 0.5);

  allShifts.forEach(shift => {
    if (!(shift.owner in colorsMap)) {
      colorsMap[shift.owner] = colorsArray[nextAvailableIndex++];
    }
  });

  return colorsMap;
}

interface Props {
  allShifts: Shift[];
  exportRef?: RefObject<any>;
}

export function Calendar({ allShifts, exportRef }: Props): JSX.Element {
  const colorsMap = getColorMap(allShifts);
  const dayOfWeekNumber = Object.keys(DayOftheWeek)
    .filter((v) => !isNaN(Number(v)))
    .map((day) => Number(day));

  return (
    <Grid container columns={7} sx={{ p: 5, pt: 3 }} ref={exportRef}>
      {dayOfWeekNumber.map((day: number) => (
        <Grid item xs={1} sx={{ px: 1.5 }} key={day}>
          <WeeklyDate dayOfWeek={dayName(day).substring(0, 3)} date="10.23" />
        </Grid>
      ))}
      {dayOfWeekNumber.map((day: number) => (
        <Grid item xs={1} sx={{ px: 1.5 }} key={day}>
          <DailyShifts
            allShifts={allShifts.filter((shift) => shift.day === day)}
            colorsMap={colorsMap}
          />
        </Grid>
      ))}
    </Grid>
  );
}
