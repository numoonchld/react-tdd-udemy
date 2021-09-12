import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import notificationService from "../services/notificationService";

function Notification() {
  const [notification, setNotification] = useState({
    open: false,
    message: null,
  });

  useEffect(() => {
    const subscription = notificationService.events$.subscribe(
      (newNotification) => setNotification(newNotification)
    );
    return () => {
      subscription.unsubscribe();
    };
  });

  return (
    <>
      <Snackbar
        open={notification.open}
        onClose={() => {
          notificationService.close();
        }}
        message={notification.message}
        autoHideDuration={3000}
      />
    </>
  );
}

export default Notification;
