import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import { useState } from "react";
import { AvailabilityCard } from "..";
import { Shift, DayOftheWeek, Employee } from "../../entities";
import { AddAvailabilityModal } from "./AddAvailabilityModal";

interface TabPanelProps {
  day: DayOftheWeek;
  employee?: Employee;
  currentAvailability: Shift[];
  addAvailability: (newAvailability: Shift) => void;
  removeAvailability: (oldAvailability: Shift) => void;
}

const availabilityStyle: SxProps<Theme> = {
  border: "lightgray 1px solid",
  borderRadius: "8px",
  minHeight: "100%",
  px: "1rem",
  pb: "1rem",
  pt: ".5rem"
};

export function AvailabilityEditor(props: TabPanelProps): JSX.Element {
  const { day, currentAvailability, addAvailability, removeAvailability } =
    props;

  const [allDay, setAllDay] = useState(false);

  return (
    <Grid container sx={{ minHeight: "300px" }}>
      <Grid item xs={6} sx={availabilityStyle}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {DayOftheWeek[day]} Availability
        </Typography>
        <Stack direction="column" spacing={1} data-testid="AvailabilityStack">
          {currentAvailability.map((shift: Shift) => (
            <AvailabilityCard
              key={
                shift.name +
                shift.start.toString() +
                shift.end.toString() +
                shift.owner
              }
              shift={shift}
              killMe={() => removeAvailability(shift)}
            />
          ))}
        </Stack>
      </Grid>
      <Grid item sx={{ px: "1rem" }}>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={
              <Checkbox
                checked={allDay}
                onChange={(event) => setAllDay(event.target.checked)}
              />
            }
            label="All Day"
          />
        </FormGroup>
        <AddAvailabilityModal
          day={day}
          addAvailability={addAvailability}
          disabled={allDay}
        />
      </Grid>
    </Grid>
  );
}
