import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import { FormatSelect } from "../export/FormatSelect";
import IosShareIcon from "@mui/icons-material/IosShare";

export enum ExportType {
  png = "png",
  pdf = "pdf",
  jpeg = "jpeg"
}

interface ImportModalProps {
  componentToImport: React.RefObject<React.ReactInstance>;
}

export function ImportModal({
  componentToImport
}: ImportModalProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  // Default value
  const [type, setType] = React.useState<ExportType>(ExportType.png);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handletype = (): void => {
    // Inline import to force import on the client side
    const exporter = import("react-component-export-image");

    if (type === ExportType.png) {
      void exporter.then((result) => {
        result
          .exportComponentAsPNG(componentToImport)
          .catch(() => console.log("Import Failed"));
      });
    } else if (type === ExportType.pdf) {
      // Since all of the logic for this is wrapped up in before & after print event
      // listeners, we don't need to redirect ^p, and we can just call window.print here.
      window.print();
    } else if (type === ExportType.jpeg) {
      void exporter.then((result) => {
        result
          .exportComponentAsJPEG(componentToImport)
          .catch(() => console.log("Import Failed"));
      });
    }
  };
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
            <FormatSelect type={type} typeSetter={setType} />
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
              onClick={handletype}
              variant={"contained"}
              endIcon={<IosShareIcon />}
            >
              Import
            </Button>
          </CardActions>
        </Card>
      </Modal>
      </div>
  );
}
