// import { Schedule } from "@mui/icons-material";
import { Stack, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ImportModal } from "../components";
// import { LocalStorage } from "../services/storageService";

export default function Home(): JSX.Element {
  // const storage = new LocalStorage();
  const importRef = React.useRef(null);
  // const sched = new Schedule();

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
      <ImportModal componentToImport={importRef} />
    </Stack>
  );
}
