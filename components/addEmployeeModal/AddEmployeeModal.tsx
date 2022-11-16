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
import { Color, Employee, Shift } from "../../entities";
import { useState } from "react";

interface EmployeeModalProps {
  existingEmployees: Employee[];
  addEmployee: (employee: Employee) => void;
}

export function AddEmployeeModal(props: EmployeeModalProps): JSX.Element {
  const { addEmployee } = props;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [minHours, setMinHours] = useState(0);
  const [maxHours, setMaxHours] = useState(40);
  const [color, setColor] = useState<Color>(new Color());
  const [availability, setAvailability] = useState<Shift[]>([]);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleSubmit = (): void => {
    const newEmployee = new Employee(name, minHours, maxHours, color);
    availability.forEach((avail) =>
      newEmployee.addAvailability(new Shift(avail.name, avail.start, avail.end))
    );
    addEmployee(newEmployee);
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
