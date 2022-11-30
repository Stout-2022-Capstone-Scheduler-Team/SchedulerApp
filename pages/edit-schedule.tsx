import { useRef, useState } from "react";
import {
  Calendar,
  ExportModal,
  AddEmployeeModal,
  AddShiftModal
} from "../components";
import { Box, Grid, Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import { ScheduleAction, updateSchedule, useAsyncReducer } from "../services";
import Typography from "@mui/material/Typography";

export default function EditSchedule(): JSX.Element {
  const [buildingSchedule, setBuildingSchedule] = useState<boolean>(false);
  const [schedule, dispatch] = useAsyncReducer(async (a, b: ScheduleAction) => {
    setBuildingSchedule(true);
    return await updateSchedule(a, b).finally(() => setBuildingSchedule(false));
  }, new Schedule([], []));

  // Reference to the calendar which enables exporting it
  const exportRef = useRef(null);

  return (
    <Grid container spacing={3} sx={{ mx: 3 }}>
      <Grid item xs={12}>
        <Calendar
          shifts={schedule.shifts}
          employees={schedule.employees}
          exportRef={exportRef}
          loading={buildingSchedule}
        />
      </Grid>
      <Grid item xs={3}>
        <div>Employee Summary goes here</div>

        <AddEmployeeModal
          existingEmployees={schedule.employees}
          dispatch={dispatch}
        />
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            border: "1px solid lightgray",
            borderRadius: 2,
            boxShadow: 1,
            px: 2
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace", // setting the font of the nav bar
              fontWeight: 700, // weight of the font
              letterSpacing: ".3rem", // letter spacing
              mb: 1
            }}
          >
            Tools
          </Typography>
          <ExportModal componentToExport={exportRef} />
          <AddShiftModal existingShifts={schedule.shifts} dispatch={dispatch} />
        </Box>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={3}>
        <div>Metadata Component Goes Here</div>
      </Grid>
    </Grid>
  );
}
