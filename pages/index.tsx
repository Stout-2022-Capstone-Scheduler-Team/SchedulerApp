import { Button, Box, Stack } from "@mui/material";

export default function Home(): JSX.Element {
  return (
    <Box sx={{ mx: "7%" }}>
      <h1>Welcome to the Scheduler Builder</h1>
      <Stack spacing={2}>
        <Stack direction="column" spacing={2}>
          <Button variant="contained" color="primary" a href="google.com" >
            Create Schedule
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="secondary">
            Advanced Options
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
