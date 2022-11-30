import * as React from "react";
import { Button, Modal, Typography, Card, CardContent } from "@mui/material";
import modalStyle from "../../styles/modalStyle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";
import { DayOftheWeek, Shift, Time } from "../../entities";

function daySelector(
  handleChange: (e: SelectChangeEvent<DayOftheWeek>) => void,
  label: string
): JSX.Element {
  const labelId = label.replaceAll(" ", "");
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} label={label} onChange={handleChange} value="">
        <MenuItem value={DayOftheWeek.Sunday}>Sunday</MenuItem>
        <MenuItem value={DayOftheWeek.Monday}>Monday</MenuItem>
        <MenuItem value={DayOftheWeek.Tuesday}>Tuesday</MenuItem>
        <MenuItem value={DayOftheWeek.Wednesday}>Wednesday</MenuItem>
        <MenuItem value={DayOftheWeek.Thursday}>Thursday</MenuItem>
        <MenuItem value={DayOftheWeek.Friday}>Friday</MenuItem>
        <MenuItem value={DayOftheWeek.Saturday}>Saturday</MenuItem>
      </Select>
    </FormControl>
  );
}

interface ShiftModalProps {
  existingShifts: Shift[];
  dispatch: Dispatch<ScheduleAction>;
}

export function AddShiftModal(props: ShiftModalProps): JSX.Element {
  // Props
  const { dispatch } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const [StartDayVal, setStartDay] = React.useState<DayOftheWeek | undefined>(
    undefined
  );
  const [EndDayVal, setEndDay] = React.useState<DayOftheWeek | undefined>(
    undefined
  );
  // start time variables
  const [valueStartTime, setValueStartTime] = React.useState<Dayjs | null>(
    null
  );

  // end time variables
  const [valueEndTime, setValueEndTime] = React.useState<Dayjs | null>(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleStartChange = (event: SelectChangeEvent<DayOftheWeek>) => {
    if (typeof event.target.value !== "string") {
      setStartDay(event.target.value);
    } else {
      setStartDay(Time.getWeekDays().indexOf(event.target.value));
    }
  };
  const handleEndChange = (event: SelectChangeEvent<DayOftheWeek>): void => {
    if (typeof event.target.value !== "string") {
      setEndDay(event.target.value);
    } else {
      setEndDay(Time.getWeekDays().indexOf(event.target.value));
    }
  };

  // Event Handler
  const handleSubmit = (): void => {
    if (
      StartDayVal !== undefined &&
      EndDayVal !== undefined &&
      valueStartTime !== null &&
      valueEndTime !== null
    ) {
      const newShift = new Shift(
        "",
        Time.fromDayjs(valueStartTime, StartDayVal),
        Time.fromDayjs(valueEndTime, EndDayVal)
      );
      void dispatch({ add: newShift });
      setOpen(false);
      clearInputs();
    }
  };

  /**
   * Clear the modal's inputs (resets the state)
   */
  const clearInputs = (): void => {
    setStartDay(undefined);
    setEndDay(undefined);
    setValueStartTime(null);
    setValueEndTime(null);
  };
  return (
    <>
      <Button onClick={handleOpen} variant={"contained"} color={"secondary"}>
        Add Shift
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="addShiftTitle"
        aria-describedby="addShiftDescription"
      >
        <Card sx={modalStyle}>
          <CardContent>
            <Typography
              id="addShiftTitle"
              variant="h6"
              component="h2"
            ></Typography>
            <Typography id="Select Start Day" sx={{ mt: 2 }}></Typography>
            <Box sx={{ minWidth: 120 }}>
              {daySelector(handleStartChange, "Select Start Day")}
            </Box>
            <Typography id="modal-StartTime" sx={{ mt: 2 }}>
              {" "}
            </Typography>
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
            <Typography id="Select End Day" sx={{ mt: 2 }}></Typography>
            <Box sx={{ minWidth: 120 }}>
              {daySelector(handleEndChange, "Select End Day")}
            </Box>
            <Typography id="modal-EndTime" sx={{ mt: 2 }}></Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Select End Time"
                value={valueEndTime}
                onChange={(newValueET) => {
                  setValueEndTime(newValueET);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Typography id="modal-submit" sx={{ mt: 2 }}></Typography>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
