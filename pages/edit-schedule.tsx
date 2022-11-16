import { AddEmployeeModal, Calendar, ExportModal } from "../components";
import { useRef, useState } from "react";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { DayOftheWeek, Employee, Shift, Time } from "../entities";
import { generate } from "../services/waveform_collapse";

export default function EditSchedule(): JSX.Element {
  const [buildingSchedule, setBuildingSchedule] = useState<boolean>(false);
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
          new Time(15, DayOftheWeek.Monday),
          new Time(16, DayOftheWeek.Monday)
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

  const updateSchedule = async (newSchedule: Schedule): Promise<void> => {
    // Create a deep copy so the generate schedule is allowed to mutate it
    const scheduleCopy = Schedule.createDeepCopy(newSchedule);

    // Generate the schedule
    setBuildingSchedule(true);
    const schedulePromise = generate(
      scheduleCopy.shifts,
      scheduleCopy.employees
    );
    if (await schedulePromise) {
      console.log(scheduleCopy);
      // If the scheduler finished successfully, update the schedule object
      setSchedule(
        new Schedule(
          scheduleCopy.employees,
          scheduleCopy.shifts,
          scheduleCopy.minHoursWorked,
          scheduleCopy.maxHoursWorked
        )
      );
    } else {
      // If the scheduler failed, error out
      console.error(
        "Unable to build schedule completely, schedule was not updated"
      );
    }
    setBuildingSchedule(false);
  };

  const addEmployee = (newEmployee: Employee): void => {
    const newSchedule: Schedule = new Schedule(
      [...schedule.employees, newEmployee],
      schedule.shifts,
      schedule.minHoursWorked,
      schedule.maxHoursWorked
    );

    void updateSchedule(newSchedule);
  };

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
        <AddEmployeeModal
          existingEmployees={schedule.employees}
          addEmployee={addEmployee}
        />
      </Stack>
    </>
  );
}
