import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { AvailabilityCard } from "..";
import { Shift, DayOftheWeek, Employee, Time } from "../../entities";
import { AddAvailabilityModal } from "./AddAvailabilityModal";

interface TabPanelProps {
  day: DayOftheWeek;
  employee?: Employee;
  currentAvailability: Shift[];
  addAvailability: (newAvailability: Shift) => void;
  removeAvailability: (oldAvailability: Shift) => void;
  setDayAvailability: (
    day: DayOftheWeek,
    newAvailabilityArray: Shift[]
  ) => void;
}

const availabilityStyle: SxProps<Theme> = {
  border: "lightgray 1px solid",
  borderRadius: "8px",
  minHeight: "100%",
  px: "1rem",
  pb: "1rem",
  pt: ".5rem"
};

/**
 * Availability Editor Component
 * @param props Component Props
 * @returns Availability Editor Component
 */
export function AvailabilityEditor(props: TabPanelProps): JSX.Element {
  const {
    day,
    currentAvailability,
    addAvailability,
    removeAvailability,
    setDayAvailability
  } = props;

  const [allDay, setAllDay] = useState(false);

  /** Add watcher for the allDay checkbox */
  useEffect(() => {
    if (allDay) {
      // If the allday box was just checked, remove all availabilities and set a single availability that spans the whole day
      setDayAvailability(day, [
        new Shift("", new Time(0, day), new Time(24, day))
      ]);
    } else {
      // If the allday box was just unchecked, remove the full day spanning availability (saves user a click)
      removeAvailability(currentAvailability[0]); // Remove first (and only) availability
    }
  }, [allDay]);

  return (
    <Grid container sx={{ minHeight: "300px" }}>
      <Grid item xs={6} sx={availabilityStyle}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {DayOftheWeek[day]} Availability
        </Typography>
        <Stack
          direction="column"
          spacing={1}
          sx={{ maxHeight: "290px", overflow: "auto" }}
          data-testid="AvailabilityStack"
        >
          {currentAvailability.map((shift: Shift) => (
            <AvailabilityCard
              key={
                shift.name +
                shift.start.toString() +
                shift.end.toString() +
                shift.owner
              }
              disabled={allDay}
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
