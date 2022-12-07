import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IosShareIcon from "@mui/icons-material/IosShare";

import { Card, CardActions, CardContent, SxProps, Theme } from "@mui/material";
import { FormatSelect } from "./FormatSelect";

export enum ExportType {
  png = "png",
  pdf = "pdf",
  jpeg = "jpeg"
}

interface ExportModalProps {
  sx?: SxProps<Theme>;
  componentToExport: React.RefObject<React.ReactInstance>;
}

export function ExportModal({
  sx,
  componentToExport
}: ExportModalProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  // Default value
  const [type, setType] = React.useState<ExportType>(ExportType.pdf);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handletype = (): void => {
    // Inline import to force import on the client side
    const exporter = import("react-component-export-image");

    if (type === ExportType.png) {
      void exporter.then((result) => {
        result
          .exportComponentAsPNG(componentToExport)
          .catch(() => console.log("Export Failed"));
      });
    } else if (type === ExportType.pdf) {
      // Since all of the logic for this is wrapped up in before & after print event
      // listeners, we don't need to redirect ^p, and we can just call window.print here.
      window.print();
    } else if (type === ExportType.jpeg) {
      void exporter.then((result) => {
        result
          .exportComponentAsJPEG(componentToExport)
          .catch(() => console.log("Export Failed"));
      });
    }
  };

  // Adjust page for printing. Components with the `printed` class, along with their
  // parents & children are the only elements that remain visible.
  //
  // Notes - This relies on elements NOT using inline styles
  React.useEffect(() => {
    window.addEventListener("beforeprint", () => {
      function hide(el: Element): void {
        if (!el.matches(".printed")) {
          if (el.querySelector(".printed") !== null) {
            for (let i = 0; i < el.children.length; i++) {
              hide(el.children[i]);
            }
          } else {
            if (el instanceof HTMLElement) {
              el.setAttribute("data-screen-display", el.style.display);
              el.style.display = "none";
            }
          }
        }
      }
      hide(document.body);
    });
    window.addEventListener("afterprint", () => {
      document.querySelectorAll("*").forEach((el) => {
        if (el instanceof HTMLElement) {
          const display = el.getAttribute("data-screen-display");
          if (display !== null) {
            el.style.display = "";
          }
        }
      });
    });
  }, []);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant={"contained"}
        color={"secondary"}
        sx={sx}
      >
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
              data-testid="export_button"
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
