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
  disabled?: boolean;
  killMe: () => void;
}

const boxStyle: SxProps<Theme> = {
  border: "lightgray solid 1px",
  borderRadius: 2,
  boxShadow: 2,
  p: 2,
  mb: 0.5
};

export function AvailabilityCard(props: AvailabilityCardProps): JSX.Element {
  const { shift, disabled, killMe } = props;
  return (
    <Box sx={boxStyle}>
      <Stack alignItems="center" direction="row" spacing={1}>
        <Chip label={DayOftheWeek[shift.start.day]} color="secondary" />
        <Typography>{shift.start.toString()}</Typography>
        <Typography>-</Typography>
        <Typography>{shift.end.toString()}</Typography>
        <IconButton
          disabled={disabled}
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
