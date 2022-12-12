import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Modal,
  IconButton
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import modalStyle from "../../styles/modalStyle";
import { Employee } from "../../entities";
import { ScheduleAction, Dispatch } from "../../services/scheduleState";

interface ConfirmationModalProps {
  employee: Employee;
  dispatch: Dispatch<ScheduleAction>;
}
export function ConfirmationModal(props: ConfirmationModalProps): JSX.Element {
  // Props
  const { employee, dispatch } = props;

  // Modal State
  const [open, setOpen] = useState(false);

  // Form Event Handlers
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleSubmit = (): void => dispatch({ remove: employee });

  return (
    <>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          handleOpen();
        }}
        sx={{ ml: "auto !important" }}
        color="error"
      >
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={(event: Event) => {
          handleClose();
          event.stopPropagation();
        }}
      >
        <Card sx={modalStyle}>
          <CardContent sx={{ p: 0, "&:last-child": { p: 0.25 } }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete {employee.name}?
            </Typography>
            <CardActions>
              <Button
                color={"error"}
                sx={{ ml: "auto" }}
                onClick={(event) => {
                  handleClose();
                  event.stopPropagation();
                }}
              >
                Close
              </Button>
              <Button
                onClick={(event) => {
                  handleSubmit();
                  event.stopPropagation();
                }}
                color={"primary"}
                variant={"contained"}
              >
                Delete
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
