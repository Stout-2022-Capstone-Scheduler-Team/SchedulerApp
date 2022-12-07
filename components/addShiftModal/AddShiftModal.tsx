import * as React from "react";
import {
  Button,
  Modal,
  Typography,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Chip
} from "@mui/material";
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

interface ShiftModalProps {
  existingShifts: Shift[];
  dispatch: Dispatch<ScheduleAction>;
}

export function AddShiftModal(props: ShiftModalProps): JSX.Element {
  // Props
  const { dispatch } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => {
    console.log("Open modal clicked");
    setOpen(true);
  };
  const handleClose = (): void => setOpen(false);

  const [canSubmit, setCanSubmit] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [startDay, setStartDay] = React.useState<DayOftheWeek | null>(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleStartChange = (event: SelectChangeEvent<DayOftheWeek>) => {
    if (typeof event.target.value !== "string") {
      setStartDay(event.target.value);
    } else {
      setStartDay(Time.getWeekDays().indexOf(event.target.value));
    }
  };
  const [startTime, setStartTime] = React.useState<Dayjs | null>(null);
  const [endTime, setEndTime] = React.useState<Dayjs | null>(null);

  const [overnight, setOvernight] = React.useState<boolean>(false);
  const [validErrors, setValidErrors] = React.useState<string[]>([]);

  // Event Handler
  const handleSubmit = (): void => {
    if (startDay !== null && startTime !== null && endTime !== null) {
      const newShift = new Shift(
        name,
        Time.fromDayjs(startTime, startDay),
        Time.fromDayjs(
          endTime,
          startTime.isBefore(endTime) ? startDay : (startDay + 1) % 7
        )
      );
      void dispatch({ add: newShift });
      setOpen(false);
      clearInputs();
    }
  };

  React.useEffect(() => {
    const errors = [];
    if (startDay === null) {
      errors.push("Start Day not set");
    }
    if (startTime === null) {
      errors.push("Start Time not set");
    }

    if (endTime === null) {
      errors.push("End Time not set");
    }

    if (errors.length === 0 && startTime === endTime) {
      errors.push("Start and End time cannot be equal");
    }

    if (errors.length === 0) {
      setOvernight((endTime as Dayjs).isBefore(startTime));
    }

    setCanSubmit(errors.length === 0);
    setValidErrors(errors);
  }, [startTime, endTime, startDay]);

  /**
   * Clear the modal's inputs (resets the state)
   */
  const clearInputs = (): void => {
    setStartDay(null);
    setStartTime(null);
    setEndTime(null);
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
            <Typography id="shift-modal-title" variant="h6" component="h2">
              Add a Shift
              {overnight && (
                <Chip
                  sx={{ ml: 2, color: "white", backgroundColor: "#191170" }}
                  label="Overnight"
                />
              )}
            </Typography>
            <Typography id="modal-StartTime" sx={{ mt: 2 }}>
              {" "}
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <TextField
                  label="Shift Name"
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </FormControl>
            </Box>
            <Typography id="modal-StartTime" sx={{ mt: 2 }}>
              {" "}
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="day-label">Select Start Day</InputLabel>
                <Select
                  labelId="day-label"
                  label="Select Start Day"
                  onChange={handleStartChange}
                >
                  <MenuItem value={DayOftheWeek.Sunday}>Sunday</MenuItem>
                  <MenuItem value={DayOftheWeek.Monday}>Monday</MenuItem>
                  <MenuItem value={DayOftheWeek.Tuesday}>Tuesday</MenuItem>
                  <MenuItem value={DayOftheWeek.Wednesday}>Wednesday</MenuItem>
                  <MenuItem value={DayOftheWeek.Thursday}>Thursday</MenuItem>
                  <MenuItem value={DayOftheWeek.Friday}>Friday</MenuItem>
                  <MenuItem value={DayOftheWeek.Saturday}>Saturday</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography id="modal-StartTime" sx={{ mt: 2 }}>
              {" "}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Select Start Time"
                value={startTime}
                onChange={(newValueST) => {
                  setStartTime(newValueST);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Typography id="modal-EndTime" sx={{ mt: 2 }}></Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Select End Time"
                value={endTime}
                onChange={(newValueET) => {
                  setEndTime(newValueET);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Typography id="modal-submit" sx={{ mt: 2 }}></Typography>
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
