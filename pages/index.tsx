// import { Schedule } from "@mui/icons-material";
import { Stack, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ImportModal } from "../components/import/ImportModal";
import { Schedule } from "../entities";
import { LocalStorage } from "../services";

const testList = ["One", "Two", "Three"];

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
      <Button variant="contained" color="primary">
        Advanced Options
      </Button>
      <ImportModal />
      <div> Testing buttons </div>
      <Button
        onClick={() => {
          const storage = new LocalStorage();
          testList.forEach((name) => {
            void storage.update(name, new Schedule());
          });
        }}
      >
        Add set
      </Button>
      <Button
        onClick={() => {
          const storage = new LocalStorage();
          void storage.returnAll().then((schedules) => {
            Object.keys(schedules).forEach((name) => {
              void storage.delete(name);
            });
          });
        }}
      >
        clear
      </Button>
    </Stack>
  );
}
