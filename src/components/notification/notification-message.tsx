import * as React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

import { Notification } from "../../models/Notification";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function NotificationMessageComponent({
  notific,
}: {
  notific: Notification;
}) {
  const [open, setOpen] = React.useState<boolean>();

  const [state, setState] = React.useState<SnackbarOrigin>({
    vertical: "top",
    horizontal: "center",
  });

  React.useEffect(() => {
    setOpen(true);
  }, [notific]);

  const { vertical, horizontal } = state;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "22vw", maxWidth: 900 }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleClose}
          severity={notific.type}
          sx={{ width: "22vw", maxWidth: 900 }}
        >
          {notific.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
