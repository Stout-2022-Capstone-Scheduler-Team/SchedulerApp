import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ScheduleSelect } from "./ScheduleSelect";

interface ImportModalProps {
  componentToImport: React.RefObject<React.ReactInstance>;
}

export function ImportModal({
  componentToImport
}: ImportModalProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  // Default value
  const [type, setType] = React.useState("");
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleImport = (): void => {};

  return (
    <div>
      <Button onClick={handleOpen} variant={"contained"}>
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
            <ScheduleSelect type={type} typeSetter={setType} />
          </CardContent>
          <CardActions>
            <Button
              sx={{ ml: "auto", minWidth: 20 }}
              onClick={handleClose}
              color={"secondary"}
            >
              Cancel
            </Button>
            <Button
              data-testid="export_button"
              sx={{ minWidth: 20 }}
              onClick={handleImport}
              variant={"contained"}
              endIcon={<FileDownloadIcon />}
            >
              Import
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}
