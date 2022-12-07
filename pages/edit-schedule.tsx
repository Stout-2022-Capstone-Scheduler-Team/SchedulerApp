import React, { useRef, useState } from "react";
import {
  Calendar,
  ExportModal,
  AddEmployeeModal,
  AddShiftModal
} from "../components";
import { Box, Grid, Stack } from "@mui/material";
import { Schedule } from "../entities/schedule";
import {
  LocalStorage,
  ScheduleAction,
  updateSchedule,
  useAsyncReducer
} from "../services";
import Typography from "@mui/material/Typography";

export default function EditSchedule(): JSX.Element {
  const [buildingSchedule, setBuildingSchedule] = useState<boolean>(false);
  const [schedule, dispatch] = useAsyncReducer(async (a, b: ScheduleAction) => {
    setBuildingSchedule(true);
    return await updateSchedule(a, b).finally(() => setBuildingSchedule(false));
  }, new Schedule([], []));

  const [scheduleLoaded, setScheduleLoaded] = useState<boolean>(false);
  React.useEffect(() => {
    if (!scheduleLoaded) {
      const name = decodeURIComponent(window.location.hash.slice(1));
      if (name !== "") {
        const storage = new LocalStorage();
        void storage.read(name).then((schedule) => {
          console.log(schedule);
          if (schedule !== null) {
            dispatch({ set: schedule });
          }
        });
      } else {
        const newUrl = window.location;
        newUrl.hash = `#${schedule.name}`;
        window.location.replace(newUrl.href);
      }
      setScheduleLoaded(true);
    }
  });

  // Reference to the calendar which enables exporting it
  const exportRef = useRef(null);

  return (
    <Grid container spacing={3}>
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
            borderRadius: "7px",
            boxShadow: 1
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace", // setting the font of the nav bar
              fontWeight: 600, // weight of the font
              letterSpacing: ".2rem", // letter spacing
              px: 2,
              py: 0.2,
              background: "#4f7cac",
              borderTopLeftRadius: "7px",
              borderTopRightRadius: "8px"
            }}
          >
            Tools
          </Typography>
          <Stack
            sx={{ p: 1.25 }}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <AddShiftModal
              existingShifts={schedule.shifts}
              dispatch={dispatch}
            />
            <ExportModal componentToExport={exportRef} />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={3}>
        <div>Metadata Component Goes Here</div>
      </Grid>
    </Grid>
  );
}
