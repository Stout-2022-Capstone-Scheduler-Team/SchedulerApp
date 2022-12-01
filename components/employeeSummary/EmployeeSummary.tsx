import { Employee } from "../../entities";
import { Grid, Paper, Stack } from "@mui/material";
import { EmployeeCard } from "./EmployeeCard";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";

interface EmployeeSummaryProps {
  employees: Employee[];
  dispatch: Dispatch<ScheduleAction>;
}

export function EmployeeSummary(props: EmployeeSummaryProps): JSX.Element {
  const { employees, dispatch } = props;
  return (
    <>
      <Paper sx={{ bgcolor: "#eeeeee" }}>
        <Stack>
          {employees.map((employee: Employee) => (
            <EmployeeCard key={employee.name} employee={employee} dispatch={dispatch}/>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
