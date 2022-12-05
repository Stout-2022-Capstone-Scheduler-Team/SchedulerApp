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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";
import { DayOftheWeek, Shift, Time } from "../../entities";

interface MetaModalProps {
  dispatch: Dispatch<ScheduleAction>;
}

export function MetaModal(props: MetaModalProps): JSX.Element {
  // Props
  const { dispatch } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // Event Handler
  // const handleSubmit = (): void => {};
  // console.log(Dayjs);
  const [weekDate, setWeekDate] = React.useState<Dayjs | null>(
    new Dayjs().startOf("week")
  );

  /**
   * Clear the modal's inputs (resets the state)
   */
  const clearInputs = (): void => {};
  return (
    <>
      <Card sx={modalStyle}>
        <CardContent>
          <Typography id="metaTitle" variant="h6" component="h2"></Typography>
          <Typography id="Select Start Day" sx={{ mt: 2 }}></Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Start Time"
              value={weekDate}
              onChange={setWeekDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </CardContent>
      </Card>
    </>
  );
}
