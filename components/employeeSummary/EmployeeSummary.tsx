import { Employee } from "../../entities";
import { Stack, Box, Typography } from "@mui/material";
import { EmployeeCard } from "./EmployeeCard";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";
import { AddEmployeeModal } from "../addEmployeeModal";

interface EmployeeSummaryProps {
  employees: Employee[];
  dispatch: Dispatch<ScheduleAction>;
}

export function EmployeeSummary(props: EmployeeSummaryProps): JSX.Element {
  const { employees, dispatch } = props;
  return (
    <>
      <Box
        sx={{
          border: "1px solid lightgray",
          borderRadius: "7px",
          boxShadow: 1,
          px: 2,
          py: 1

        }}
      >
        <Stack spacing={2} direction={"row"}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "monospace", fontWeight: 600, letterSpacing: ".2rem" }}
          >
            Employees
          </Typography>
          <AddEmployeeModal
            existingEmployees={employees}
            dispatch={dispatch}
          />
        </Stack>
        <Stack>
          {employees.map((employee: Employee) => (
            <EmployeeCard key={employee.name} employee={employee} dispatch={dispatch}/>
          ))}
        </Stack>
      </Box>
    </>
  );
}
