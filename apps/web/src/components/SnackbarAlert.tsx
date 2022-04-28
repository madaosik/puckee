import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useState } from 'react';
import { StringBoolean } from '../../node_modulesOLD/@expo/config-plugins/build/android/Manifest';
import { useNotifications, Notification, NOTIFICATION } from 'puckee-common/context/NotificationsContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackBarAlertProps {
    input: React.ReactNode
    duration?: number
    notif: Notification
    // clearingCb: (report: AlertReport | undefined) => void // Enables multiple displays of the same alert
}

export default function SnackbarAlert( { input, notif, duration }: SnackBarAlertProps) {
  const [show, setShow] = useState(true)
  const { clearNotification } = useNotifications();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
  //   // clearingCb(undefined)
    console.log(notif.id)
    clearNotification(notif.id)
    setShow(false)
  };
  // console.log(notifId)
  //autoHideDuration={duration ? duration : 3000} 
  const variants = {
    [NOTIFICATION.SUCCESS]: "success",
    [NOTIFICATION.ALERT]: "warning",
    [NOTIFICATION.ERROR]: "error",

  }
  return (
      <Snackbar open={show} onClose={handleClose}>
        <Alert onClose={handleClose} severity={variants[notif.variant] as AlertColor} sx={{ width: '100%' }}>
          {input}
        </Alert>
      </Snackbar>
  );
}
