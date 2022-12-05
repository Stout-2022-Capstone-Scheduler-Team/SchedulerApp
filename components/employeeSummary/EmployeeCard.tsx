import {
  Card,
  CardContent,
  Typography,
  Stack,
  CardActionArea
} from "@mui/material";
import { Employee } from "../../entities";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";
import { ConfirmationModal } from "./ConfirmationModal";

interface EmployeeCardProps {
  employee: Employee;
  dispatch: Dispatch<ScheduleAction>;
  currentEmployee: Employee | null;
  setCurrentEmployee: (employee: Employee | null) => void;
  addEmployeeModalOpen: boolean;
  setAddEmployeeModalOpen: (addEmployeeModalOpen: boolean) => void;
}
export function EmployeeCard(props: EmployeeCardProps): JSX.Element {
  // Props
  const {
    employee,
    dispatch,
    currentEmployee,
    setCurrentEmployee,
    addEmployeeModalOpen,
    setAddEmployeeModalOpen
  } = props;

  return (
    <>
      <Card
        sx={{ mt: 1, borderLeft: 6, borderColor: employee.color.colorHex }}
        onClick={(event) => {
          setAddEmployeeModalOpen(true);
          setCurrentEmployee(employee);
          console.log("CardActionArea clicked");
        }}
      >
        {/* Causes error for where button cannot be nested by other button */}
        {/* printed to console */}
        <CardActionArea>
          <CardContent sx={{ p: 0.25, "&:last-child": { p: 0.25 } }}>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Typography sx={{ fontWeight: "bold", ml: 2 }}>
                {employee.name}
              </Typography>
              <ConfirmationModal employee={employee} dispatch={dispatch} />
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
