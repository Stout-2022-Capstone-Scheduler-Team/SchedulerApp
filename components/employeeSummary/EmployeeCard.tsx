import { Card, CardContent, Typography } from "@mui/material";
import { Employee } from "../../entities";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard(props: EmployeeCardProps): JSX.Element {
  const { employee } = props;
  return (
    <>
      <Card sx={{ mt: 1, borderLeft: 6, borderColor: employee.color.colorHex }}>
        <CardContent sx={{ p: 0.25, "&:last-child": { p: 0.25 } }}>
          <Typography
            sx={{ fontWeight: "bold", display: "flex", justifyContent: "center" }}
          >
            {employee.name}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
