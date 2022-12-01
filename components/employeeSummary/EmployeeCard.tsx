import { Card, CardContent, Typography, Stack } from "@mui/material";
import { Employee } from "../../entities";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";
import { ConfirmationModal } from "./ConfirmationModal";

interface EmployeeCardProps {
  employee: Employee;
  dispatch: Dispatch<ScheduleAction>;
}
export function EmployeeCard(props: EmployeeCardProps): JSX.Element {
  // Props
  const { employee, dispatch } = props;

  return (
    <>
      <Card sx={{ mt: 1, borderLeft: 6, borderColor: employee.color.colorHex }}>
        <CardContent sx={{ p: 0.25, "&:last-child": { p: 0.25 } }}>
          <Stack alignItems="center" direction="row" spacing={1} >
            <Typography sx={{ fontWeight: "bold", ml: 2 }}>
              {employee.name}
            </Typography>
            <ConfirmationModal employee={employee} dispatch={dispatch} />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
