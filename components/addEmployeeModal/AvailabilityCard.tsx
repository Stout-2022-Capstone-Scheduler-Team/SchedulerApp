import {
  Box,
  Chip,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import { DayOftheWeek, Shift } from "../../entities";
import DeleteIcon from "@mui/icons-material/Delete";

interface AvailabilityCardProps {
  shift: Shift;
  killMe: () => void;
}

const boxStyle: SxProps<Theme> = {
  border: "lightgray solid 1px",
  borderRadius: 2,
  boxShadow: 1,
  p: 2
};

export function AvailabilityCard(props: AvailabilityCardProps): JSX.Element {
  const { shift, killMe } = props;
  return (
    <Box sx={boxStyle}>
      <Stack alignItems="center" direction="row" spacing={1}>
        <Chip label={DayOftheWeek[shift.start.day]} color="secondary" />
        <Typography>{shift.start.toString()}</Typography>
        <Typography>-</Typography>
        <Typography>{shift.end.toString()}</Typography>
        <IconButton
          sx={{ ml: "auto !important" }}
          color="error"
          onClick={killMe}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
