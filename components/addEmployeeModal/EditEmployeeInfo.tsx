import { Box, Typography } from "@mui/material";
import { Time, DayOftheWeek } from "../../entities/time";

interface EmployeePanelProps {}

export function EditEmployeeInfo(props: EmployeePanelProps) {
  const { ...other } = props;

  return (
    <Box sx={{ p: 3 }}>
      <Typography>{`now editing employee information`}</Typography>
    </Box>
  );
}
