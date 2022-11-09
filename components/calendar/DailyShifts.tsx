import { Grid } from "@mui/material";
import { Schedule } from "../../entities/schedule";

import { Shift } from "../../entities/types";

import ShiftCard from "./ShiftCard";

interface Props {
  allShifts: Shift[];
  scheduler: Schedule;
}

export function DailyShifts({ allShifts, scheduler }: Props): JSX.Element {
  const shifts = allShifts.map((shift) => (
    <ShiftCard shift={shift} scheduler={scheduler} key={shift.owner + shift.start.toString()} />
  ));

  return (
    <Grid container spacing={2} columns={1}>
      <Grid item xs={1}>
        {shifts}
      </Grid>
    </Grid>
  );
}
