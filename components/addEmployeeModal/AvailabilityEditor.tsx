import { Button, Grid, Stack, SxProps, Theme, Typography } from "@mui/material";
import { AvailabilityCard } from "..";
import { Shift, DayOftheWeek, Time, Employee } from "../../entities";

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
  const {
    day,
    employee,
    currentAvailability,
    addAvailability,
    removeAvailability
  } = props;

  return (
    <Grid container sx={{ minHeight: "300px" }}>
      <Grid item xs={6}>
        <Stack direction="column" spacing={1} sx={availabilityStyle}>
          <Typography variant="h6">{DayOftheWeek[day]} Availability</Typography>
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
        <Button
          variant="contained"
          sx={{ m: 0 }}
          onClick={() =>
            addAvailability(
              new Shift(
                "emp1",
                new Time(10, day),
                new Time(16, day),
                employee?.name
              )
            )
          }
        >
          Add Availability
        </Button>
      </Grid>
    </Grid>
  );
}
