import { Shift, DayOftheWeek, dayName } from "../../entities/types";
import { DailyShifts } from "./DailyShifts";
import { WeeklyDate } from "./WeeklyDate";

import { Grid } from "@mui/material";
import { RefObject } from "react";

interface Props {
  allShifts: Shift[];
  exportRef?: RefObject<any>;
}

export function Calendar({ allShifts, exportRef }: Props): JSX.Element {
  const dayOfWeekNumber = Object.keys(DayOftheWeek)
    .filter((v) => !isNaN(Number(v)))
    .map((day) => Number(day));

  return (
    <Grid
      container
      columns={7}
      sx={{ p: 5, pt: 3 }}
      ref={exportRef}
      className="printed"
    >
      {dayOfWeekNumber.map((day: number) => (
        <Grid item xs={1} sx={{ px: 1.5 }} key={day}>
          <WeeklyDate dayOfWeek={dayName(day).substring(0, 3)} date="10.23" />
        </Grid>
      ))}
      {dayOfWeekNumber.map((day: number) => (
        <Grid item xs={1} sx={{ px: 1.5 }} key={day}>
          <DailyShifts
            allShifts={allShifts.filter((shift) => shift.day === day)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
