import { AddEmployeeModal, Calendar, ExportModal } from "../components";
import React from "react";
import { Color } from "../entities/color";
import { Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { DayOftheWeek, Employee, Shift, Time } from "../entities";

export default function EditSchedule(): JSX.Element {
  const schedulerDummyData = new Schedule();

  console.log(schedulerDummyData);
  schedulerDummyData.addEmployee(new Employee("Drew", 2, 14, new Color()));
  schedulerDummyData.addShift(new Shift("name", new Time(5), new Time(10), DayOftheWeek.Monday, "drew"));

  console.log(schedulerDummyData);



  // Reference to the calendar which enables exporting it
  const exportRef = React.useRef(null);

  return (
    <>
      <Calendar scheduler={schedulerDummyData} exportRef={exportRef} />
      <Stack spacing={2} direction={"row"}>
        <ExportModal componentToExport={exportRef} />
        <AddEmployeeModal />
      </Stack>
    </>
  );
}
