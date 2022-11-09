import { Button, Grid, Stack, SxProps, Theme, Typography } from "@mui/material";
import { useState } from "react";
import { AvailabilityCard } from "..";
import { Shift, DayOftheWeek, Time, Employee } from "../../entities";

interface TabPanelProps {
  day: DayOftheWeek;
  employee?: Employee;
}

const availabilityStyle: SxProps<Theme> = {
  border: "lightgray 1px solid",
  borderRadius: "8px",
  minHeight: "100%",
  px: "1rem",
  pb: "1rem",
  pt: ".5rem"
};

export function AvailabilityEditor(props: TabPanelProps) {
  const { day, employee } = props;
  const [availabilityArray, setAvailabilityArray] = useState<Shift[]>([
    new Shift("emp1", new Time(10), new Time(16), day, employee?.name),
    new Shift("emp1", new Time(10), new Time(17), day, employee?.name)
  ]);

  return (
    <Grid container sx={{ minHeight: "300px" }}>
      <Grid item xs={6}>
        <Stack direction="column" spacing={1} sx={availabilityStyle}>
          <Typography variant="h6">{DayOftheWeek[day]} Availability</Typography>
          {availabilityArray.map((shift: Shift) => (
            <AvailabilityCard
              shift={shift}
              key={
                shift.name + shift.start.toString() + shift.end + shift.owner
              }
            />
          ))}
        </Stack>
      </Grid>
      <Grid item sx={{ px: "1rem" }}>
        <Button variant="contained" sx={{ m: 0 }}>
          Add Availability
        </Button>
      </Grid>
    </Grid>
  );
}
