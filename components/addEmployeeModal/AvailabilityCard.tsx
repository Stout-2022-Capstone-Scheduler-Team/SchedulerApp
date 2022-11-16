import { Box, Chip, Stack, SxProps, Theme, Typography } from "@mui/material";
import { DayOftheWeek, Shift } from "../../entities";

interface AvailabilityCardProps {
  shift: Shift;
}

const boxStyle: SxProps<Theme> = {
  border: "lightgray solid 1px",
  borderRadius: "8px",
  boxShadow: 1,
  p: 2
};

export function AvailabilityCard(props: AvailabilityCardProps): JSX.Element {
  const { shift } = props;
  return (
    <Box sx={boxStyle}>
      <Stack alignItems="center" direction="row" spacing={1}>
        <Chip label={DayOftheWeek[shift.start.day]} color="secondary" />
        <Typography>{shift.start.toString()}</Typography>
        <Typography>-</Typography>
        <Typography>{shift.end.toString()}</Typography>
      </Stack>
    </Box>
  );
}
