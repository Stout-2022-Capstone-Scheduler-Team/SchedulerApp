import { useRef, useState } from "react";
import {
  Calendar,
  ExportModal,
  AddEmployeeModal,
  AddShiftModal
} from "../components";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { ScheduleAction, updateSchedule, useAsyncReducer } from "../services";
import { Shift } from "../entities";

export default function EditSchedule(): JSX.Element {
  const [buildingSchedule, setBuildingSchedule] = useState<boolean>(false);
  const [schedule, dispatch] = useAsyncReducer(async (a, b: ScheduleAction) => {
    setBuildingSchedule(true);
    return await updateSchedule(a, b).finally(() => setBuildingSchedule(false));
  }, new Schedule([], []));

  // Reference to the calendar which enables exporting it
  const exportRef = useRef(null);
  const [addShiftModalOpen, setShiftModalOpen] = useState<boolean>(false);

  function editShift(shift: Shift): void {
    setShiftModalOpen(true);
  }

  return (
    <>
      <Calendar
        shifts={schedule.shifts}
        employees={schedule.employees}
        exportRef={exportRef}
        loading={buildingSchedule}
        openShiftModal={editShift}
      />
      <Stack spacing={2} direction={"row"}>
        <ExportModal componentToExport={exportRef} />
        <AddShiftModal
          existingShifts={schedule.shifts}
          dispatch={dispatch}
          setShiftModalOpen={setShiftModalOpen}
          addShiftModalOpen={addShiftModalOpen}
        />
        <AddEmployeeModal
          existingEmployees={schedule.employees}
          dispatch={dispatch}
        />
      </Stack>
    </>
  );
}
