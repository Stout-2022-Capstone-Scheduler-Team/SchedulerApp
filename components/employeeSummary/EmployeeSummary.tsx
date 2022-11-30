import { Employee } from "../../entities";
import { Grid, Paper, Stack } from "@mui/material";
import { EmployeeCard } from "./EmployeeCard";

interface EmployeeSummaryProps {
  employees: Employee[];
}

export function EmployeeSummary(props: EmployeeSummaryProps): JSX.Element {
  const { employees } = props;
  return (
    <>
      {/* Temporary Grid, we will delete when we merge in with Joel */}
      <Grid container columns={4}>
        <Grid item xs={1}>
          <Paper sx={{ bgcolor: "#eeeeee" }}>
            <Stack>
              {employees.map((employee: Employee) => (
                <EmployeeCard employee={employee}/>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
