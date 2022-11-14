import { AddEmployeeModal, Calendar, ExportModal } from "../components";
import { useRef, useState } from "react";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { DayOftheWeek, Employee, Shift, Time } from "../entities";
import { generate } from "../services/waveform_collapse";

export default function EditSchedule(): JSX.Element {
  const [schedule, setSchedule] = useState<Schedule>(
    new Schedule(
      [],
      [new Shift("testShift", new Time(10), new Time(15), DayOftheWeek.Monday)]
    )
  );

  const onScheduleUpdate = (): void => {
    // Create a deep copy so we can mutate the schedule in the generate function
    const scheduleCopyBase: Schedule = JSON.parse(JSON.stringify(schedule));
    const scheduleCopy = new Schedule(
      scheduleCopyBase.employees,
      scheduleCopyBase.shifts,
      scheduleCopyBase.minHoursWorked,
      scheduleCopyBase.maxHoursWorked
    );

    console.log(scheduleCopy);

    // Generate the schedule
    if (generate(scheduleCopy.shifts, scheduleCopy.employees)) {
      // If the scheduler finished successfully, update the schedule object
      const newSchedule: Schedule = new Schedule(
        scheduleCopy.employees,
        schedule.shifts,
        schedule.minHoursWorked,
        schedule.maxHoursWorked
      );

      setSchedule(newSchedule);
    } else {
      // If the scheduler failed, error out
      console.error("Unable to build schedule completely");
    }
  };

  const addEmployee = (newEmployee: Employee): void => {
    const newSchedule: Schedule = new Schedule(
      [...schedule.employees, newEmployee],
      schedule.shifts,
      schedule.minHoursWorked,
      schedule.maxHoursWorked
    );
    setSchedule(newSchedule);
    onScheduleUpdate();
  };

  // Reference to the calendar which enables exporting it
  const exportRef = useRef(null);

  return (
    <>
      <Calendar
        shifts={schedule.shifts}
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
