
import { useRouteError } from "react-router-dom";
import Typography from "@mui/material/Typography";

import styles from "./Error.module.css";

export default function Error() {
  let error:any = useRouteError();

  return (
    <div className={styles.layout}>
      <Typography variant="h5" data-test="Error-error-message"color="error"> {error.message} </Typography>
    </div>
  );
}
