import { Card, CardContent, Typography } from "@mui/material";
import { Shift } from "../../entities/types";
import { WaveformCollapseAlgorithm } from "../../services/waveform_collapse";

interface ShiftCardProps {
  shift: Shift;
  scheduler: WaveformCollapseAlgorithm;
}

export default function ShiftCard({ shift, scheduler }: ShiftCardProps): JSX.Element {
  return (
    <Card
      sx={{ mt: 1, borderLeft: 6, borderColor: scheduler.getEmployee(shift.owner)?.color.colorHex }}
    >
      <CardContent sx={{ p: 0.25, "&:last-child": { p: 0.25 } }}>
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          {shift.start.toString()} - {shift.end.toString()}
        </Typography>
        <Typography
          sx={{ fontWeight: "bold", display: "flex", justifyContent: "center" }}
        >
          {shift.owner}
        </Typography>
      </CardContent>
    </Card>
  );
}
