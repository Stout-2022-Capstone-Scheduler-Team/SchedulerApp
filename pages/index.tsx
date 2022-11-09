// import { Schedule } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Schedule } from "../entities";
import { LocalStorage } from "../services/storageService";

export default function Home(): JSX.Element {
  const storage = new LocalStorage();
  // const exportRef = React.useRef(null);
  // const sched = new Schedule();

  function handletype(): void {
    storage.returnAll().then((schedules) => {
      // TODO
      console.log(schedules);
    }).catch((error) => console.log(error));
  }

  return (
    <Stack sx={{ mx: "7%" }} alignItems="center" spacing={2}>
      <h1>Welcome to the Scheduler Builder</h1>
      <Link href="/edit-schedule">
        <Button
          variant="contained"
          color="secondary"
          sx={{ typography: "h5", padding: 2, width: 300 }}
        >
          Create Schedule
        </Button>
      </Link>
      <Button
        variant="contained"
        color="primary"
      >
        Advanced Options
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handletype}
      >
        Get Schedules
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {storage.update("name", new Schedule()).catch(console.log);} }
      >
        Save Schedule
      </Button>
    </Stack>
  );
}
