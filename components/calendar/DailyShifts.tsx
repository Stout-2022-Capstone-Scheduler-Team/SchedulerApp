import { Grid } from "@mui/material";

import { Shift } from "../../entities/types";
import { WaveformCollapseAlgorithm } from "../../services/waveform_collapse";

import ShiftCard from "./ShiftCard";

interface Props {
  allShifts: Shift[];
  scheduler: WaveformCollapseAlgorithm;
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
