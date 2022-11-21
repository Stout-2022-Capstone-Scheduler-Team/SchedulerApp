import {
  Button,
  Modal,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Tooltip
} from "@mui/material";
import modalStyle from "../../styles/modalStyle";
import { AvailabilityEditor, AvailabilityTabs, EditEmployeeInfo } from "../";
import { Color, DayOftheWeek, Employee, Shift, Time } from "../../entities";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";
import { useEffect, useState } from "react";

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
  const [canSubmit, setCanSubmit] = useState(false);
  const [nameUpdateCount, setNameUpdateCount] = useState(0);
  const [validName, setValidName] = useState(true);
  const [validHours, setValidHours] = useState(true);
  const [validErrors, setValidErrors] = useState<string[]>([]);

  // Form Event Handlers
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleSubmit = (): void => {
    if (canSubmit) {
      const newEmployee = new Employee(name, minHours, maxHours, color);
      availability.forEach((avail) =>
        newEmployee.addAvailability(
          new Shift(avail.name, avail.start, avail.end)
        )
      );
      void dispatch({ add: newEmployee });
      setOpen(false);
      clearInputs();
    }
  };

  // Logic
  useEffect(() => {
    setCanSubmit(validateInputs());
  }, [name, minHours, maxHours, availability]);

  useEffect(() => {
    setNameUpdateCount(nameUpdateCount + 1);
  }, [name]);

  /**
   * Add a block of availability to this employee's array
   * @param newAvailability New Availability to add to the Employee's availability array
   */
  const addAvailability = (newAvailability: Shift): void => {
    if (
      !availability.some(
        (shift) =>
          shift.start.totalHours >= newAvailability.start.totalHours &&
          shift.end.totalHours <= newAvailability.end.totalHours
      )
    ) {
      setAvailability([...availability, newAvailability]);
    }
  };

  /**
   * Remove any availability blocks that are contained (inclusive) in the shift object given
   * @param oldAvailabilty Block of time to remove
   */
  const removeAvailability = (oldAvailabilty: Shift): void => {
    setAvailability(
      availability.filter(
        (shift) =>
          !(
            shift.start.totalHours >= oldAvailabilty.start.totalHours &&
            shift.end.totalHours <= oldAvailabilty.end.totalHours
          )
      )
    );
  };

  /**
   * Get a list of availabilities for this employee for a given day
   * @param day Day to get the availability for
   * @returns a list of availabilities that either start during this day
   */
  const getAvailabilityFor = (day: DayOftheWeek): Shift[] => {
    return availability.filter((avail) => avail.start.day === day);
  };

  /**
   * Validate all the employee's values and update the error states
   * @returns whether the validation process succeeded
   */
  const validateInputs = (): boolean => {
    const validationErrors: string[] = [];

    // Check employee name is unique and not empty
    if (name.length === 0) {
      setValidName(false);
      validationErrors.push("Employee name must be given");
    } else if (existingEmployees.some((emp) => emp.name === name)) {
      setValidName(false);
      validationErrors.push("Employee name must be unique");
    } else {
      setValidName(true);
    }

    // Check valid min/max hours
    if (minHours < 0) {
      setValidHours(false);
      validationErrors.push("Minimum Hours must be 0 or greater");
    } else if (minHours > maxHours) {
      setValidHours(false);
      validationErrors.push("Minimum Hours cannot be greater than Max Hours");
    } else {
      setValidHours(true);
    }

    // Employee has at least one availability block
    if (availability.length === 0) {
      validationErrors.push("Must add at least one availability for employee");
    }

    // Update the error validation state
    setValidErrors(validationErrors);

    return validationErrors.length === 0;
  };

  /**
   * Clear the modal's inputs (resets the state)
   */
  const clearInputs = (): void => {
    setCanSubmit(false);
    setNameUpdateCount(0);
    setName("");
    setMinHours(0);
    setMaxHours(40);
    setColor(new Color());
    setAvailability([]);
  };

  /**
   * Get an array of colors that are not taken by other employees
   * @returns Array of available colors
   */
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
                  validName={nameUpdateCount < 2 || validName}
                  validHours={validHours}
                />,
                ...Time.getWeekDayNumbers().map((day) => (
                  <AvailabilityEditor
                    key={day}
                    day={day}
                    currentAvailability={getAvailabilityFor(day)}
                    addAvailability={addAvailability}
                    removeAvailability={removeAvailability}
                  />
                ))
              ]}
            />
          </CardContent>
          <CardActions>
            <Button onClick={handleClose} color={"error"} sx={{ ml: "auto" }}>
              Close
            </Button>
            <Tooltip title={validErrors.join(", ")} placement="top-end">
              {/* The span is required for when the button is disabled */}
              <span>
                <Button
                  onClick={handleSubmit}
                  color={"primary"}
                  variant={"contained"}
                  disabled={!canSubmit}
                >
                  Submit
                </Button>
              </span>
            </Tooltip>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}
