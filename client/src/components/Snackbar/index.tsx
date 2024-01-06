import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface SnackbarCustomProps {
  isOpen: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  handleClose?: () => void;
}

const SnackbarCustom = (props: SnackbarCustomProps) => {
  return (
    <div>
      <Snackbar
        open={props.isOpen}
        autoHideDuration={3000}
        onClose={props.handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={props.severity}
          onClose={props.handleClose}
          sx={{
            width: "100%",
          }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarCustom;
