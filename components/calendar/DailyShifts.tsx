import { Grid } from "@mui/material";
import { Employee, Shift, Color } from "../../entities";

import ShiftCard from "./ShiftCard";

interface Props {
  allShifts: Shift[];
  employees: Employee[];
}

export function DailyShifts({ allShifts, employees }: Props): JSX.Element {
  const shifts = allShifts.map((shift) => (
    <ShiftCard
      shift={shift}
      employee={
        employees.find((emp) => emp.name === shift.owner) ??
        new Employee("DEFAULT", 0, 0, new Color("White"))
      }
      key={shift.owner + shift.start.toString()}
    />
  ));

  return (
    <Grid container spacing={2} columns={1}>
      <Grid item xs={1}>
        {shifts}
      </Grid>
    </Grid>
  );
}
