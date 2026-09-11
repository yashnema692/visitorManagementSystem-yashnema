import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  loading = false
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={
        loading
          ? undefined
          : onCancel
      }
    >
      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? "Deleting..."
            : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;