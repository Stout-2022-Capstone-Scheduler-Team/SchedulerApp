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
  py: ".5rem"
};

export function AvailabilityEditor(props: TabPanelProps) {
  const { day, employee } = props;
  const [availabilityArray, setAvailabilityArray] = useState<Shift[]>([
    new Shift("emp1", new Time(10), new Time(16), day, employee?.name)
  ]);

  return (
    <Grid container sx={{ minHeight: "300px" }}>
      <Grid xs={8}>
        <Stack direction="column" sx={availabilityStyle}>
          <Typography variant="h6">{DayOftheWeek[day]} Availability</Typography>
          {availabilityArray.map((shift: Shift) => (
            <AvailabilityCard
              shift={shift}
              key={shift.name + shift.start.toString()}
            />
          ))}
        </Stack>
      </Grid>
      <Grid xs={4} sx={{ px: "1rem" }}>
        <Button variant="contained" sx={{ m: 0 }}>
          Add Availability
        </Button>
      </Grid>
    </Grid>
  );
}
