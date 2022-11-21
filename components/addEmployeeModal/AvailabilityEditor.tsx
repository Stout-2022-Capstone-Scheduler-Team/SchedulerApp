import { Grid, Stack, SxProps, Theme, Typography } from "@mui/material";
import { AvailabilityCard } from "..";
import { Shift, DayOftheWeek } from "../../entities";
import { AddAvailabilityModal } from "./AddAvailabilityModal";

interface TabPanelProps {
  day: DayOftheWeek;
  dailyAvailability: Shift[];
  addAvailability: (shift: Shift) => void;
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
  const { day, dailyAvailability, addAvailability } = props;

  return (
    <Grid container sx={{ minHeight: "300px" }}>
      <Grid item xs={6}>
        <Stack direction="column" spacing={1} sx={availabilityStyle}>
          <Typography variant="h6">{DayOftheWeek[day]} Availability</Typography>
          {dailyAvailability.map((shift: Shift) => (
            <AvailabilityCard
              shift={shift}
              key={
                shift.name +
                shift.start.toString() +
                shift.end.toString() +
                shift.owner
              }
            />
          ))}
        </Stack>
      </Grid>
      <Grid item sx={{ px: "1rem" }}>
        <AddAvailabilityModal day={day} addAvailability={addAvailability} />
      </Grid>
    </Grid>
  );
}
