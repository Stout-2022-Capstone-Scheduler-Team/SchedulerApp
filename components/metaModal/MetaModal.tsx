import * as React from "react";
import { Stack, Paper } from "@mui/material";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";
import { Schedule } from "../../entities";

interface MetaModalProps {
  schedule: Schedule;
  dispatch: Dispatch<ScheduleAction>;
}

export function MetaModal(props: MetaModalProps): JSX.Element {
  // Props
  const { dispatch, schedule } = props;
  const [name, setName] = React.useState("");
  const [updated, setUpdated] = React.useState(false);
  const [totalHours, setTotalHours] = React.useState(0);
  // Force update name to make sure reloads work properly
  React.useEffect(() => {
    if (!updated) {
      setName(schedule.name);
    }
    setTotalHours(
      schedule.shifts.reduce((sum, shift) => sum + shift.duration, 0)
    );
  }, [schedule]);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Schedule Name"
          value={name}
          onChange={(update) => {
            setName(update.target.value);
            // Disallow empty name
            if (update.target.value !== "") {
              dispatch({ update: "default", name: update.target.value });
            }
            setUpdated(true);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Week"
            value={schedule.weekDate}
            onChange={(date: Dayjs | null) => {
              if (date !== null) {
                dispatch({ update: "default", weekDate: date });
              }
              setUpdated(true);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Paper variant="outlined" sx={{ p: 2 }}>
          Total hours: {totalHours.toFixed(2)}
        </Paper>
      </Stack>
    </>
  );
}
