import * as React from "react";
import { useTransition } from "react-spring";

import { useNotifications } from "puckee-common/context/NotificationsContext";
import SnackbarAlert from "./SnackbarAlert";

export default function Notifications() {
  const { notifications } = useNotifications();

  const transitions = useTransition(notifications, (n) => n.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <>
      {transitions.map(({ item, props, key }) => (
          <SnackbarAlert key={key} input={item.message} notif={item} /> ))}
    </>
  )
}

