import { AddEmployeeModal, Calendar, ExportModal } from "../components";
import React from "react";
import { Color } from "../entities/color";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { DayOftheWeek, Employee, Shift, Time } from "../entities";

export default function EditSchedule(): JSX.Element {
  const [schedule, setSchedule] = useState<Schedule>(new Schedule());

  const addEmployee = (newEmployee: Employee): void => {
    const newSchedule: Schedule = new Schedule(
      [...schedule.employees, newEmployee],
      schedule.shifts,
      schedule.minHoursWorked,
      schedule.maxHoursWorked
    );
    setSchedule(newSchedule);
  };

  // Reference to the calendar which enables exporting it
  const exportRef = useRef(null);

  return (
    <>
      <Calendar scheduler={schedulerDummyData} exportRef={exportRef} />
      <Stack spacing={2} direction={"row"}>
        <ExportModal componentToExport={exportRef} />
        <AddEmployeeModal
          existingEmployees={schedule.employees}
          addEmployee={addEmployee}
        />
      </Stack>
    </>
  );
}
