import { dayName, DayOftheWeek } from "../../entities/types";
import { Schedule, Shift, Time } from "../../entities";
import { DailyShifts } from "./DailyShifts";
import { WeeklyDate } from "./WeeklyDate";

import { Grid } from "@mui/material";
import { RefObject } from "react";

interface CalendarProps {
  schedule: Schedule;
  exportRef?: RefObject<any>;
  openShiftModal: (shift: Shift) => void;
  loading: boolean;
}

export function Calendar({
  schedule,
  exportRef,
  openShiftModal,
  loading
}: CalendarProps): JSX.Element {
  const dayOfWeekNumber = Time.getWeekDayNumbers();
  const weekDate = schedule.weekDate.startOf("week");

  function getDayShifts(day: DayOftheWeek): Shift[] {
    return schedule.shifts
      .filter((shift) => shift.start.day === day)
      .sort((a, b) => (a.start.dayHours > b.start.dayHours ? 1 : -1));
  }
  return (
    <>
      <Grid
        container
        columns={7}
        spacing={3}
        sx={{ pt: 3 }}
        ref={exportRef}
        className="printed"
      >
        {dayOfWeekNumber.map((day: number) => (
          <Grid item xs={1} key={day}>
            <WeeklyDate
              dayOfWeek={dayName(day).substring(0, 3)}
              date={format(weekDate, day)}
            />
            <DailyShifts
              allShifts={getDayShifts(day)}
              employees={schedule.employees}
              openShiftModal={openShiftModal}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
