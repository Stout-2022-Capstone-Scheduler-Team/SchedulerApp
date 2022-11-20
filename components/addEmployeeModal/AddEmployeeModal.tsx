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
  const { existingEmployees, dispatch } = props;
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
    void dispatch({ add: newEmployee });
    setOpen(false);
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
          <CardContent sx={{ p: 0 }}>
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
                />,
                ...Time.getWeekDayNumbers().map((day) => (
                  <AvailabilityEditor day={day} />
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
