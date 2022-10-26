import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormatSelect from "./FormatSelect";
import IosShareIcon from "@mui/icons-material/IosShare";

import { Backdrop, Card, CardActions, CardContent } from "@mui/material";

export enum ExportType {
  png = "png",
  pdf = "pdf",
  jpeg = "jpeg"
}

interface ExportModalProps {
  componentToExport: React.RefObject<React.ReactInstance>;
}

export default function ExportModal({
  componentToExport
}: ExportModalProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<ExportType>(ExportType.pdf);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handletype = (): void => {
    if (type === ExportType.png) {
      void import("react-component-export-image").then((result) => {
        console.log(componentToExport);
        result.exportComponentAsPNG(componentToExport);
      });
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant={"contained"}>
        Export
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
              Export Schedule
            </Typography>
            <Typography id="modal-modal-description" sx={{ my: 2 }}>
              Select an export type from the drop down list.
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
              sx={{ minWidth: 20 }}
              onClick={handletype}
              variant={"contained"}
              endIcon={<IosShareIcon />}
            >
              Export
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}
