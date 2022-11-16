import * as React from "react";
import {
  Button,
  Modal,
  Typography,
  Card,
  CardContent,
  CardActions
} from "@mui/material";
import modalStyle from "../../styles/modalStyle";
import { AvailabilityTabs } from "../";
import {
  Color,
  DayOftheWeek,
  Employee,
  Shift,
  Time,
  Schedule
} from "../../entities";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";

interface EmployeeModalProps {
  existingEmployees: Schedule;
  addEmployee: Dispatch<ScheduleAction>;
}

export function AddEmployeeModal(props: EmployeeModalProps): JSX.Element {
  const { addEmployee } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleSubmit = (): void => {
    const newEmployee = new Employee("Test", 0, 40, new Color("Blue"));
    newEmployee.addAvailability(
      new Shift(
        "all week",
        new Time(0, DayOftheWeek.Monday),
        new Time(23, DayOftheWeek.Friday)
      )
    );
    void addEmployee({ add: newEmployee });
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant={"contained"} color={"secondary"}>
        Add Employee
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Card sx={{ ...modalStyle, width: "70%" }}>
          <CardContent sx={{ p: 0 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add an Employee
            </Typography>
            <AvailabilityTabs />
          </CardContent>
          <CardActions>
            <Button onClick={handleClose} color={"error"} sx={{ ml: "auto" }}>
              Close
            </Button>
            <Button
              onClick={handleSubmit}
              color={"primary"}
              variant={"contained"}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}
