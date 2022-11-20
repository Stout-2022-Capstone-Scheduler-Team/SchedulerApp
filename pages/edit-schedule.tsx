import { useRef, useState } from "react";
import {
  Calendar,
  ExportModal,
  AddEmployeeModal,
  AddShiftModal
} from "../components";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { DayOftheWeek, Shift, Time } from "../entities";
import { ScheduleAction, updateSchedule, useAsyncReducer } from "../services";

export default function EditSchedule(): JSX.Element {
  const [buildingSchedule, setBuildingSchedule] = useState<boolean>(false);
  const [schedule, dispatch] = useAsyncReducer(async (a, b: ScheduleAction) => {
    setBuildingSchedule(true);
    const ret = await updateSchedule(a, b);
    setBuildingSchedule(false);
    return ret;
  }, new Schedule([], [new Shift("testShift1", new Time(10, DayOftheWeek.Monday), new Time(15, DayOftheWeek.Monday)), new Shift("testShift2", new Time(15, DayOftheWeek.Monday), new Time(16, DayOftheWeek.Monday)), new Shift("testShift3", new Time(10, DayOftheWeek.Wednesday), new Time(18, DayOftheWeek.Wednesday)), new Shift("testShift4", new Time(12, DayOftheWeek.Tuesday), new Time(16, DayOftheWeek.Tuesday))]));

  // Reference to the calendar which enables exporting it
  const exportRef = useRef(null);

  return (
    <>
      <Calendar
        shifts={schedule.shifts}
        employees={schedule.employees}
        exportRef={exportRef}
        loading={buildingSchedule}
      />
      <Stack spacing={2} direction={"row"}>
        <ExportModal componentToExport={exportRef} />
        <AddShiftModal />
        <AddEmployeeModal schedule={schedule} dispatch={dispatch} />
      </Stack>
    </>
  );
}
