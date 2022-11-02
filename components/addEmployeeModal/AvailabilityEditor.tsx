import { Box, Typography } from "@mui/material";
import { DayOftheWeek } from "../../entities/time";

interface TabPanelProps {
  day: DayOftheWeek;
}

export function AvailabilityEditor(props: TabPanelProps) {
  const { day } = props;

  return (
    <Box sx={{ p: 3 }}>
      <Typography>{`now editing availability for ${DayOftheWeek[day]}`}</Typography>
    </Box>
  );
}
