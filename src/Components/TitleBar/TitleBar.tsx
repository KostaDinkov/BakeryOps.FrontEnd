import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from './TitleBar.module.css';

export default function TitleBar({ title, children }: { title:string, children?: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className={styles.titleBar}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => {
          navigate("..",{relative:"route"});
        }}
      />
      <Typography variant="h5">{title}</Typography>
      <div className={styles.children}>
        {children}
      </div>
      
    </div>
  );
}
