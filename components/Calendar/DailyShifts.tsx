import { Grid } from "@mui/material";

import { Shift } from "../../entities/types";

import ShiftCard from "./ShiftCard";

interface Props {
  allShifts: Shift[];
}

export function DailyShifts(props: Props): JSX.Element {
  const shifts = props.allShifts.map((shift) => <ShiftCard shift={shift} />);

  return (
    <Grid container spacing={2} columns={1}>
      <Grid item xs={1}>
        {shifts}
      </Grid>
    </Grid>
  );
}
