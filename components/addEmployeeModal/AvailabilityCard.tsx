import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { DayOftheWeek, Shift } from "../../entities";

interface AvailabilityCardProps {
  shift: Shift;
}

const boxStyle: SxProps<Theme> = {
  border: "lightgray solid 1px",
  borderRadius: "8px",
  boxShadow: 1,
  p: 3
};

export function AvailabilityCard(props: AvailabilityCardProps): JSX.Element {
  const { shift } = props;
  return (
    <Box sx={boxStyle}>
      <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
        <Typography>{DayOftheWeek[shift.day]}</Typography>
        <Typography>{shift.start.toString()}</Typography>
        <Typography>-</Typography>
        <Typography>{shift.end.toString()}</Typography>
      </Stack>
    </Box>
  );
}
