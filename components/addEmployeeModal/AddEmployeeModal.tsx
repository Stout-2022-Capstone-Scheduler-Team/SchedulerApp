import {
  Button,
  Modal,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip
} from "@mui/material";
import modalStyle from "../../styles/modalStyle";
import { AvailabilityEditor, AvailabilityTabs, EditEmployeeInfo } from "../";
import { Color, Employee, Shift, Time } from "../../entities";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";
import { useState } from "react";

interface EmployeeModalProps {
  existingEmployees: Employee[];
  dispatch: Dispatch<ScheduleAction>;
}

export function AddEmployeeModal(props: EmployeeModalProps): JSX.Element {
  // Props
  const { existingEmployees, dispatch } = props;

  // Employee State
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [minHours, setMinHours] = useState(0);
  const [maxHours, setMaxHours] = useState(40);
  const [color, setColor] = useState<Color>(new Color());
  const [availability, setAvailability] = useState<Shift[]>([]);

  // Validation State
  const [validName, setValidName] = useState(true);
  const [validHours, setValidHours] = useState(true);
  const [validAvail, setValidAvail] = useState(true);

  // Form Event Handlers
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleSubmit = (): void => {
    if (validateInputs()) {
      const newEmployee = new Employee(name, minHours, maxHours, color);
      availability.forEach((avail) =>
        newEmployee.addAvailability(
          new Shift(avail.name, avail.start, avail.end)
        )
      );
      void dispatch({ add: newEmployee });
      setOpen(false);
      clearInputs();
    } else {
      alert("This employee is not done being created");
    }
  };

  const validateInputs = (): boolean => {
    // Check employee name is unique and not empty
    setValidName(
      name.length > 1 &&
        existingEmployees.findIndex((emp) => emp.name === name) === -1
    );

    // Check valid min/max hours
    setValidHours(minHours <= maxHours);

    // Employee has at least one availability block
    setValidAvail(availability.length > 0);

    return validName && validHours && validAvail;
  };

  const clearInputs = (): void => {
    setName("");
    setMinHours(0);
    setMaxHours(40);
    setColor(new Color());
    setAvailability([]);
  };

  const getAvailableColors = (): Color[] => {
    const allColors = Object.keys(Color.colorsMap);
    const existingColorNames = existingEmployees.map(
      (emp) => emp.color.colorName
    );
    const freeColorNames = allColors.filter(
      (colorName) => !existingColorNames.includes(colorName)
    );

    return freeColorNames.map((name) => new Color(name));
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
          <CardContent sx={{ p: 0, height: "25rem" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add an Employee
              <Chip
                label={name}
                sx={{
                  backgroundColor: color.colorHex,
                  ml: 2,
                  display: name === "" ? "none" : ""
                }}
                color="primary"
              />
            </Typography>
            <AvailabilityTabs
              tabHeaders={["Edit Employee Info", ...Time.getWeekDays()]}
              tabContent={[
                <EditEmployeeInfo
                  name={name}
                  color={color}
                  maxHours={maxHours}
                  minHours={minHours}
                  availableColors={getAvailableColors()}
                  setEmployeeName={setName}
                  setEmployeeColor={setColor}
                  setEmployeeMaxHours={setMaxHours}
                  setEmployeeMinHours={setMinHours}
                  validName={true}
                  validHours={true}
                />,
                ...Time.getWeekDayNumbers().map((day) => (
                  <AvailabilityEditor day={day} key={day} />
                ))
              ]}
            />
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
