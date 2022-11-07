import { Card, CardContent, Typography } from "@mui/material";
import { Shift } from "../../entities/types";

interface ShiftCardProps {
  shift: Shift;
  colorsMap: { [key: string]: string };
}

export default function ShiftCard({ shift, colorsMap }: ShiftCardProps): JSX.Element {
  return (
    <Card
      sx={{ mt: 1, borderLeft: 6, borderColor: colorsMap[shift.owner] }}
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
