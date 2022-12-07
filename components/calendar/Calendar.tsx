import { dayName, DayOftheWeek, Employee } from "../../entities/types";
import { Shift, Time } from "../../entities";
import { DailyShifts } from "./DailyShifts";
import { WeeklyDate } from "./WeeklyDate";

import { CircularProgress, Fade, Grid } from "@mui/material";
import { RefObject } from "react";
// import { getDatePickerToolbarUtilityClass } from "@mui/x-date-pickers/DatePicker/datePickerToolbarClasses";

interface CalendarProps {
  shifts: Shift[];
  employees: Employee[];
  exportRef?: RefObject<any>;
  loading: boolean;
}

export function Calendar({
  shifts,
  employees,
  exportRef,
  loading
}: CalendarProps): JSX.Element {
  const dayOfWeekNumber = Time.getWeekDayNumbers();

  function getDayShifts(day: DayOftheWeek): Shift[] {
    return shifts
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
              date="10.23 TODO"
            />
            <DailyShifts allShifts={getDayShifts(day)} employees={employees} />
          </Grid>
        ))}
      </Grid>
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "800ms" : "0ms"
        }}
        unmountOnExit
      >
        <CircularProgress />
      </Fade>
    </>
  );
}
