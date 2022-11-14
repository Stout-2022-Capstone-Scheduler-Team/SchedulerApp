import { dayName, DayOftheWeek, Employee } from "../../entities/types";
import { Shift, Time } from "../../entities";
import { DailyShifts } from "./DailyShifts";
import { WeeklyDate } from "./WeeklyDate";

import { Grid } from "@mui/material";
import { RefObject } from "react";

interface CalendarProps {
  shifts: Shift[];
  employees: Employee[];
  exportRef?: RefObject<any>;
}

export function Calendar({
  shifts,
  employees,
  exportRef
}: CalendarProps): JSX.Element {
  const dayOfWeekNumber = Time.getWeekDayNumbers();

  function getDayShifts(day: DayOftheWeek): Shift[] {
    return shifts
      .filter((shift) => shift.day === day)
      .sort((a, b) => (a.start.hours > b.start.hours ? 1 : -1));
  }

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
          <WeeklyDate
            dayOfWeek={dayName(day).substring(0, 3)}
            date="10.23(TODO)"
          />
        </Grid>
      ))}
      {dayOfWeekNumber.map((day: number) => (
        <Grid item xs={1} sx={{ px: 1.5 }} key={day}>
          <DailyShifts allShifts={getDayShifts(day)} employees={employees} />
        </Grid>
      ))}
    </Grid>
  );
}
