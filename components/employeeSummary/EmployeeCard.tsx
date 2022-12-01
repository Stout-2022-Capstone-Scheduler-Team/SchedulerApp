import { Card, CardContent, IconButton, Typography, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Employee } from "../../entities";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";

interface EmployeeCardProps {
  employee: Employee;
  dispatch: Dispatch<ScheduleAction>;
}

export function EmployeeCard(props: EmployeeCardProps): JSX.Element {
  const { employee, dispatch } = props;

  const handleSubmit = (): void => {
    void dispatch({ remove: employee });
  };

  return (
    <>
      <Card sx={{ mt: 1, borderLeft: 6, borderColor: employee.color.colorHex }}>
        <CardContent sx={{ p: 0.25, "&:last-child": { p: 0.25 } }}>
          <Stack alignItems="center" direction="row" spacing={1} >
            <Typography sx={{ fontWeight: "bold", ml: 2 }}>
              {employee.name}
            </Typography>
            <IconButton
              sx={{ ml: "auto !important" }}
              color="error"
              onClick={handleSubmit}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
