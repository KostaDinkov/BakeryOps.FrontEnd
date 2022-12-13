import React from "react";
import { useRouteError } from "react-router-dom";
import Typography from "@mui/material/Typography";

import styles from "./Error.module.css";

export default function Error() {
  let error = useRouteError();

  return (
    <div className={styles.layout}>
      <Typography variant="h5" color="error">{error.message}</Typography>
    </div>
  );
}
