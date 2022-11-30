import React, { useRef, useState } from "react";
import {
  Calendar,
  ExportModal,
  AddEmployeeModal,
  AddShiftModal
} from "../components";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import {
  LocalStorage,
  ScheduleAction,
  updateSchedule,
  useAsyncReducer
} from "../services";

export default function EditSchedule(): JSX.Element {
  const [buildingSchedule, setBuildingSchedule] = useState<boolean>(false);
  const [schedule, dispatch] = useAsyncReducer(async (a, b: ScheduleAction) => {
    setBuildingSchedule(true);
    return await updateSchedule(a, b).finally(() => setBuildingSchedule(false));
  }, new Schedule([], []));

  const [scheduleLoaded, setScheduleLoaded] = useState<boolean>(false);
  React.useEffect(() => {
    if (!scheduleLoaded) {
      const name = decodeURIComponent(window.location.hash.slice(1));
      if (name !== "") {
        const storage = new LocalStorage();
        void storage.read(name).then((schedule) => {
          if (schedule !== null) {
            dispatch({ set: schedule });
          }
        });
      }
      setScheduleLoaded(true);
    }
  });

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
        <AddShiftModal existingShifts={schedule.shifts} dispatch={dispatch} />
        <AddEmployeeModal
          existingEmployees={schedule.employees}
          dispatch={dispatch}
        />
      </Stack>
    </>
  );
}
