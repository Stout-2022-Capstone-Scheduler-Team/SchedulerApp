import { Card, CardContent, Typography } from "@mui/material";
import { Employee, Shift } from "../../entities/types";

interface ShiftCardProps {
  shift: Shift;
  employee: Employee;
}

export default function ShiftCard({
  shift,
  employee
}: ShiftCardProps): JSX.Element {
  return (
    <Card sx={{ mt: 1, borderLeft: 6, borderColor: employee.color.colorHex }}>
      <CardContent sx={{ p: 0.25, "&:last-child": { p: 0.25 } }}>
        <Typography
          sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}
        >
          {shift.name}
        </Typography>
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
