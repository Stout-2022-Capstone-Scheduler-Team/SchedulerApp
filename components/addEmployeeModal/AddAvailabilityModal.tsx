import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import modalStyle from "../../styles/modalStyle";
import { dayName, DayOftheWeek, Shift, Time } from "../../entities";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

interface AddAvailabilityModalProps {
  disabled?: boolean;
  day: DayOftheWeek;
  addAvailability: (shift: Shift) => void;
}

export function AddAvailabilityModal(
  props: AddAvailabilityModalProps
): JSX.Element {
  // Props
  const { disabled, day, addAvailability } = props;

  // Employee State
  const [open, setOpen] = useState(false);
  const [valueStartTime, setValueStartTime] = useState<Dayjs | null>(null);
  const [valueEndTime, setValueEndTime] = useState<Dayjs | null>(null);

  // Form Event Handlers
  /** Handle the submit button being pressed */
  function handleSubmit(): void {
    if (validateInputs()) {
      addAvailability(
        new Shift(
          "",
          Time.fromDayjs(valueStartTime ?? new Dayjs(), day),
          Time.fromDayjs(valueEndTime ?? new Dayjs(), day)
        )
      );
      setOpen(false);
      clearInputs();
    }
  }

  /**
   * Validate all the inputs and return a value representing their pass or fail
   * @returns A boolean representing a pass or fail of validation
   */
  const validateInputs = (): boolean => {
    const nonNull = valueStartTime !== null && valueEndTime !== null;
    return nonNull && valueStartTime.isBefore(valueEndTime);
  };

  /**
   * Clear all the form inputs
   */
  function clearInputs(): void {
    setValueStartTime(null);
    setValueEndTime(null);
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        disabled={disabled}
      >
        Add Availability
      </Button>
      <Modal open={open}>
        <Card sx={modalStyle}>
          <CardContent sx={{ p: 0, "&:last-child": { p: 0.25 } }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {dayName(day)} Availability
            </Typography>
            <FormControl sx={{ mr: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Select Start Time"
                  value={valueStartTime}
                  onChange={(newValueST) => {
                    setValueStartTime(newValueST);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 0 }}>
                <TimePicker
                  label="Select End Time"
                  value={valueEndTime}
                  onChange={(newValueET) => {
                    setValueEndTime(newValueET);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <CardActions>
              <Button
                onClick={() => setOpen(false)}
                color={"error"}
                sx={{ ml: "auto" }}
              >
                Close
              </Button>
              <Button
                onClick={handleSubmit}
                color={"primary"}
                variant={"contained"}
                disabled={!validateInputs()}
              >
                Add
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
