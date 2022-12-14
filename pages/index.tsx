import { Stack, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ImportModal } from "../components/import/ImportModal";

export default function Home(): JSX.Element {
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
      <ImportModal />
    </Stack>
  );
}
