import { Card, CardContent, Typography } from "@mui/material";
import { Shift, Time } from "../../entities/types";

interface ShiftCardProps {
  shift: Shift;
}

export function ShiftCard({ shift }: ShiftCardProps): JSX.Element {
  return (
    <Card sx={{ mt: ".50rem" }}>
      <CardContent>
        <Typography>
          {shift.start.toString()} - {shift.end.toString()}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }}>{shift.owner}</Typography>
      </CardContent>
    </Card>
  );
}

export default ShiftCard;
