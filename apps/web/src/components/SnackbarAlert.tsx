import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useState } from 'react';
import { StringBoolean } from '../../node_modulesOLD/@expo/config-plugins/build/android/Manifest';

export enum AlertType {
    success = "success",
    warning = "warning",
    info = "info",
    error = "error"
}

export interface AlertReport {
    type: AlertType
    msg: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackBarAlertProps {
    input: AlertReport
    clearingCb: (report: AlertReport | undefined) => void // Enables multiple displays of the same alert
}

export default function SnackbarAlert( { input, clearingCb }: SnackBarAlertProps) {
  const [show, setShow] = useState(true)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    clearingCb(undefined)
    setShow(false)
  };

  return (
      <Snackbar open={show} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={input.type as AlertColor} sx={{ width: '100%' }}>
          {input.msg}
        </Alert>
      </Snackbar>
  );
}
