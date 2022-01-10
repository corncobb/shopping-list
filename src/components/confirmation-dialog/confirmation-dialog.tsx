import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import React from "react";

// Taken from https://codesandbox.io/s/github/metamodal/blog/tree/master/control-a-dialog-box-asynchronously-using-react-hooks/example/final?file=/src/App.js:121-187

interface IConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

interface IOpenDialogProps {
  title: string;
  message: string;
  actionCallback: (value: boolean) => void;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onDismiss,
}) => {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onDismiss}>
      <DialogTitle sx={{ fontSize: theme.typography.h5.fontSize }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss}>Cancel</Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={onConfirm}
          sx={{ ml: 3 }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ConfirmationDialogContext = React.createContext({});

const ConfirmationDialogProvider = ({ children }: { children: any }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogConfig, setDialogConfig] = React.useState<any>({});

  const openDialog = ({ title, message, actionCallback }: IOpenDialogProps) => {
    setDialogOpen(true);
    setDialogConfig({ title, message, actionCallback });
  };

  const resetDialog = () => {
    setDialogOpen(false);

    // This is to prevent the unsettling glitchy look when closing the dialog
    setTimeout(() => setDialogConfig({}), 500);
  };

  const onConfirm = () => {
    resetDialog();
    dialogConfig.actionCallback(true);
  };

  const onDismiss = () => {
    resetDialog();
    dialogConfig.actionCallback(false);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <ConfirmationDialog
        open={dialogOpen}
        title={dialogConfig?.title}
        message={dialogConfig?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

const useConfirmationDialog = () => {
  const { openDialog } = React.useContext<any>(ConfirmationDialogContext);

  const getConfirmation = ({ ...options }) =>
    new Promise((res) => {
      openDialog({ actionCallback: res, ...options });
    });

  return { getConfirmation };
};

export {
  ConfirmationDialogProvider,
  useConfirmationDialog,
  ConfirmationDialog,
};
