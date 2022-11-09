import { DayOftheWeek, dayName } from "../../entities/types";
import { Shift, Time } from "../../entities/types";
import { DailyShifts } from "./DailyShifts";
import { WeeklyDate } from "./WeeklyDate";

import { Grid } from "@mui/material";
import { RefObject } from "react";
import { Schedule } from "../../entities/schedule";

interface Props {
  scheduler: Schedule;
  exportRef?: RefObject<any>;
}

export function Calendar({ scheduler, exportRef }: Props): JSX.Element {
  const dayOfWeekNumber = Time.getWeekDayNumbers();

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
            // allShifts={scheduler.getSortedSchedule().filter((shift) => shift.day === day)}
            allShifts={scheduler.shifts}
            scheduler={scheduler}
          />
        </Grid>
      ))}
    </Grid>
  );
}
