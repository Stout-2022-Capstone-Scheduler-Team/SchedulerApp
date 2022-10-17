import { Button, Box, Stack } from "@mui/material";

export default function Home(): JSX.Element {
  return (
    <Box sx={{ mx: "7%" }}>
      <h1>This is the home</h1>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Primary</Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Primary Dark</Button>
          <Button variant="contained" color="secondary">
            Secondary Dark
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
