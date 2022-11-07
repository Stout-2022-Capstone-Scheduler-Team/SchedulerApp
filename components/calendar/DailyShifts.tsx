import { Grid } from "@mui/material";

import { Shift } from "../../entities/types";

import ShiftCard from "./ShiftCard";

interface Props {
  allShifts: Shift[];
  colorsMap: { [key: string]: string };
}

export function DailyShifts({ allShifts, colorsMap }: Props): JSX.Element {
  const shifts = allShifts.map((shift) => (
    <ShiftCard shift={shift} colorsMap={colorsMap} key={shift.owner + shift.start.toString()} />
  ));

  return (
    <Grid container spacing={2} columns={1}>
      <Grid item xs={1}>
        {shifts}
      </Grid>
    </Grid>
  );
}
