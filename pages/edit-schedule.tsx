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
      [
        new Shift(
          "testShift1",
          new Time(10, DayOftheWeek.Monday),
          new Time(15, DayOftheWeek.Monday)
        ),
        new Shift(
          "testShift2",
          new Time(9, DayOftheWeek.Monday),
          new Time(15, DayOftheWeek.Monday)
        ),
        new Shift(
          "testShift3",
          new Time(10, DayOftheWeek.Wednesday),
          new Time(18, DayOftheWeek.Wednesday)
        ),
        new Shift(
          "testShift4",
          new Time(12, DayOftheWeek.Tuesday),
          new Time(16, DayOftheWeek.Tuesday)
        )
      ]
    )
  );

  const updateSchedule = (newSchedule: Schedule | undefined): void => {
    // Create a deep copy so we can mutate the schedule in the generate function
    const scheduleCopyBase: Schedule = JSON.parse(
      JSON.stringify(newSchedule ?? schedule)
    );
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
      setSchedule(
        new Schedule(
          scheduleCopy.employees,
          schedule.shifts,
          schedule.minHoursWorked,
          schedule.maxHoursWorked
        )
      );
    } else {
      // If the scheduler failed, error out
      console.error(
        "Unable to build schedule completely, schedule was not updated"
      );
    }
  };

  const addEmployee = (newEmployee: Employee): void => {
    const newSchedule: Schedule = new Schedule(
      [...schedule.employees, newEmployee],
      schedule.shifts,
      schedule.minHoursWorked,
      schedule.maxHoursWorked
    );
    updateSchedule(newSchedule);
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
