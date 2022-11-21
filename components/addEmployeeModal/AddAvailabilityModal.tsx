import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import modalStyle from "../../styles/modalStyle";
import { DayOftheWeek, Shift, Time } from "../../entities";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

interface AddAvailabilityModalProps {
  day: DayOftheWeek;
  addAvailability: (shift: Shift) => void;
}
export function AddAvailabilityModal(props: AddAvailabilityModalProps): JSX.Element {
  // Props
  const { day, addAvailability } = props;

  // Employee State
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [valueStartTime, setValueStartTime] = useState<Dayjs | null>(null);
  const [valueEndTime, setValueEndTime] = useState<Dayjs | null>(null);

  // Form Event Handlers
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => clearInputs();
  const handleSubmit = (): void => {
    if (validateInputs()) {
      // Is there anything I have to name the shift as?
      addAvailability(new Shift("", Time.fromDayJs(valueStartTime, day), Time.fromDayJs(valueEndTime, day)));
      clearInputs();
    } else {
      alert("Please enter a valid time!");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      setValueStartTime(null);
      setValueEndTime(null);
    }

    setChecked(event.target.checked);
  };

  const validateInputs = (): boolean => {
    const nonNull = valueStartTime !== null && valueEndTime !== null;
    return checked || (nonNull && valueStartTime.isBefore(valueEndTime));
  };

  const clearInputs = (): void => {
    setOpen(false);
    setChecked(false);
    setValueStartTime(null);
    setValueEndTime(null);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" >
        Add Availability
      </Button>
      <Modal open={open}>
        <Card sx={modalStyle}>
          <CardContent sx={{ p: 0, "&:last-child": { p: 0.25 }}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Availability
            </Typography>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={<Checkbox
                  checked={checked}
                  onChange={handleChange}
                />}
                label="All day"
              />
            </FormGroup>
            <FormControl sx={{ mr: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Select Start Time"
                  value={valueStartTime}
                  disabled={checked}
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
                  disabled={checked}
                  onChange={(newValueET) => {
                    setValueEndTime(newValueET);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
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
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
