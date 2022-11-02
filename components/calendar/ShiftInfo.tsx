import { Paper, Grid } from "@mui/material";
import { Shift, Time } from "../../entities/types";

interface ShiftInfo {
  shift: Shift;
}

export function ShiftInfo(props: ShiftInfo): JSX.Element {
  return (
    <Paper sx={{ mt: 1 }}>
      <Grid container columns={1}>
        <Grid item xs={1}>
          {Time.toString(props.shift.start)} - {Time.toString(props.shift.end)}
        </Grid>
        <Grid item xs={1}>
          {props.shift.owner}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ShiftInfo;