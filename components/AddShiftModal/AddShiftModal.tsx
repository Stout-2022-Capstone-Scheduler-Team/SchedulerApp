/* import { Button, Modal, Typography } from "@mui/material";
import Box from "@mui/system/Box/Box";
import { style } from "@mui/system/style";
import React from "react";

const Modal = props => {
    return(
        <div className ="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Add Shift Modal</h4>
                </div>
                <div className="Modal-body">
                    This is The Add Shift
                </div>
            </div>
        </div>
    )
}
*/
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function BasicModal(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            This is the Add Shift Modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
