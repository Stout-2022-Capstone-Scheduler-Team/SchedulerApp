import { AddEmployeeModal, Calendar, ExportModal } from "../components";
import { useRef, useState } from "react";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { Employee } from "../entities";

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
      <Calendar
        shifts={schedule.assignedShifts}
        employees={schedule.employees}
        exportRef={exportRef}
      />
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
