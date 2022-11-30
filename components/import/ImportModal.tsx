import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ScheduleSelect } from "./ScheduleSelect";
import { LocalStorage } from "../../services";
import { Schedule } from "../../entities";
import Link from "next/link";

export function ImportModal(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  // Default value
  const [name, setName] = React.useState("");
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [hasSchedules, setHasSchedules] = React.useState(true);
  const [schedules, setSchedules] = React.useState<{ [key: string]: Schedule }>(
    {}
  );

  React.useEffect(() => {
    void (async () => {
      const localStorage = new LocalStorage();
      const schedules = await localStorage.returnAll();
      if (Object.keys(schedules).length > 0) {
        setHasSchedules(false);
        setSchedules(schedules);
      }
    })();
  });

  const handleImport = (): void => {};

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant={"contained"}
        disabled={hasSchedules}
      >
        Import Schedules
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ mx: "auto", mt: "3rem", width: "40%" }}>
          <CardContent>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Import Schedule
            </Typography>
            <Typography id="modal-modal-description" sx={{ my: 2 }}>
              Select a schedule to import from the drop down list.
            </Typography>
            <ScheduleSelect
              type={name}
              typeSetter={setName}
              schedules={schedules}
            />
          </CardContent>
          <CardActions>
            <Button
              sx={{ ml: "auto", minWidth: 20 }}
              onClick={handleClose}
              color={"secondary"}
            >
              Cancel
            </Button>
            <Link href={`/edit-schedule#${name}`}>
              <Button
                data-testid="export_button"
                sx={{ minWidth: 20 }}
                onClick={handleImport}
                variant={"contained"}
                endIcon={<FileDownloadIcon />}
              >
                Import
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}
