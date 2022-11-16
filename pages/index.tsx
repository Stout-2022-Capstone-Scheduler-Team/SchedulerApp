// import { Schedule } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Schedule } from "../entities";
import { LocalStorage } from "../services/storageService";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Home(): JSX.Element {
  const storage = new LocalStorage();
  // const exportRef = React.useRef(null);
  // const sched = new Schedule();

  // Added for menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handletype(): void {
    storage
      .returnAll()
      .then((schedules) => {
        // TODO
        console.log(schedules);
      })
      .catch((error) => console.log(error));
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
        id="storage-button"
        variant="contained"
        color="primary"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Advanced Options
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "storage-button"
        }}
      >
        <MenuItem onClick={handleClose}>Schedule 1</MenuItem>
        <MenuItem onClick={handleClose}>Schedule 2</MenuItem>
        <MenuItem onClick={handleClose}>Schedule 3</MenuItem>
      </Menu>
      <Button variant="contained" color="secondary" onClick={handletype}>
        Get Schedules
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          storage.update("name", new Schedule()).catch(console.log);
        }}
      >
        Save Schedule
      </Button>
    </Stack>
  );
}
