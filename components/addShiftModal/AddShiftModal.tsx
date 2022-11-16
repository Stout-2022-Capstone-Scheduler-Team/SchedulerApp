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

export function AddShiftModal(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleOpen = () => setOpen(true);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClose = () => setOpen(false);
  const [DayVal, setDay] = React.useState("");
  const [valueStartTime, setValueStartTime] = React.useState<Dayjs | null>(
    null
  ); // start time variables
  const [valueEndTime, setValueEndTime] = React.useState<Dayjs | null>(null); // end time variables
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
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
            <Typography id="selectDay" sx={{ mt: 2 }}></Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="selectDayLabel">Select Day</InputLabel>
                <Select
                  labelId="selectDayLabel"
                  id="demo-simple-select"
                  value={DayVal}
                  label="Select Day"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Sunday</MenuItem>
                  <MenuItem value={20}>Monday</MenuItem>
                  <MenuItem value={30}>Tuesday</MenuItem>
                  <MenuItem value={40}>Wednesday</MenuItem>
                  <MenuItem value={50}>Thursday</MenuItem>
                  <MenuItem value={60}>Friday</MenuItem>
                  <MenuItem value={70}>Saturday</MenuItem>
                </Select>
              </FormControl>
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
            <Button variant="contained" onClick={handleClose}>Submit</Button>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
