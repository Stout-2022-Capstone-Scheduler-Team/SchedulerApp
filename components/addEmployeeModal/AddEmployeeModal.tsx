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

export function AddEmployeeModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [DayVal, setDay] = React.useState("");
  const [valueStartTime, setValueStartTime] = React.useState<Dayjs | null>(
    null
  );
  const [valueEndTime, setValueEndTime] = React.useState<Dayjs | null>(null);
  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
  };
  return (
    <>
      <Button onClick={handleOpen}>Add Shift</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyle}>
          <CardContent>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            ></Typography>
            <Typography id="modal-SelectDay" sx={{ mt: 2 }}>
              Select Day
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={DayVal}
                  label="Day"
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
            <Typography id="modal-StartTime" sx={{ mt: 2 }}></Typography>
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
            <Button variant="contained">Submit</Button>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
