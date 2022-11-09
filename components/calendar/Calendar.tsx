import { DayOftheWeek, dayName } from "../../entities/types";
import { DailyShifts } from "./DailyShifts";
import { WeeklyDate } from "./WeeklyDate";

import { Grid } from "@mui/material";
import { RefObject } from "react";
import { WaveformCollapseAlgorithm } from "../../services/waveform_collapse";

interface Props {
  scheduler: WaveformCollapseAlgorithm;
  exportRef?: RefObject<any>;
}

export function Calendar({ scheduler, exportRef }: Props): JSX.Element {
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
            allShifts={scheduler.getSortedSchedule().filter((shift) => shift.day === day)}
            scheduler={scheduler}
          />
        </Grid>
      ))}
    </Grid>
  );
}
