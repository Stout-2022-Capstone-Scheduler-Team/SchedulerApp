import { Button, Stack } from "@mui/material";

export default function Home(): JSX.Element {
  return (
    <Stack sx={{ mx: "7%" }} alignItems="center">
      <h1>Welcome to the Scheduler Builder</h1>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Stack direction="column" spacing={2}>
          <Button variant="contained" color="secondary" sx={{ typography: "h5", padding: 2 }} href = "/create">
            Create Schedule
          </Button>
        </Stack>
        <Stack direction="column" spacing={2} alignItems="center">
          <Button variant="contained" color="primary">
            Advanced Options
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
