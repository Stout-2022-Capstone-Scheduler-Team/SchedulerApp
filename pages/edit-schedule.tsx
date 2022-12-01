import { useRef, useState } from "react";
import {
  Calendar,
  ExportModal,
  AddEmployeeModal,
  AddShiftModal,
  EmployeeSummary
} from "../components";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { ScheduleAction, updateSchedule, useAsyncReducer } from "../services";

export default function EditSchedule(): JSX.Element {
  const [buildingSchedule, setBuildingSchedule] = useState<boolean>(false);
  const [schedule, dispatch] = useAsyncReducer(async (a, b: ScheduleAction) => {
    setBuildingSchedule(true);
    return await updateSchedule(a, b).finally(() => setBuildingSchedule(false));
  }, new Schedule([], []));

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
      <EmployeeSummary employees={schedule.employees} dispatch={dispatch}/>
      <Stack spacing={2} direction={"row"}>
        <ExportModal componentToExport={exportRef} />
        <AddShiftModal existingShifts={schedule.shifts} dispatch={dispatch} />
        <AddEmployeeModal
          existingEmployees={schedule.employees}
          dispatch={dispatch}
        />
      </Stack>
    </>
  );
}
