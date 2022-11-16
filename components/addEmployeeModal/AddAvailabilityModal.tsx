import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  getListItemSecondaryActionClassesUtilityClass,
  Grid,
  Modal,
  SelectChangeEvent,
  Stack,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import modalStyle from "../../styles/modalStyle";
import { DayOftheWeek, Employee, Shift, Time } from "../../entities";

interface AddAvailabilityModalProps {
  addAvailability: (shift: Shift) => void;
  day: DayOftheWeek;
  employee?: Employee;
}
export function AddAvailabilityModal(props: AddAvailabilityModalProps): JSXElement {

  const [open, setOpen] = useState(false);
  const [valueStartTime, setValueStartTime] = useState<Dayjs | null>(null);
  const [valueEndTime, setValueEndTime] = useState<Dayjs | null>(null);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void =>{ 
    setOpen(false) 
  };

  const handleSubmit = (): void => {
    setOpen(false)
    props.addAvailability(new Shift("", new Time(3), new Time(4), props.day, props.employee?.name));
  };
  const [DayVal, setDay] = useState("");



  
  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" sx={{ m: 0 }}>
        Add Availability
      </Button>
      <Modal open={open}>
        <Card sx={{ ...modalStyle }}>
          <CardContent sx={{ p: 0 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Availability
            </Typography>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={<Checkbox />}
                label="Available all day"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Shift runs into the next day"
              />
            </FormGroup>
            <FormControl sx={{ mr: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Select Start Time"
                  value={valueStartTime}
                  onChange={(newValueST) => {
                    setValueStartTime(newValueST);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                ></TimePicker>
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 2 }}>
                <TimePicker
                  label="Select End Time"
                  value={valueEndTime}
                  onChange={(newValueET) => {
                    setValueEndTime(newValueET);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                ></TimePicker>
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
