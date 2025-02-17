import styles from './DeleteButton.module.css'
import { IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export default function DeleteButton({onClick}:{onClick:()=>void}) {
  return (
    <div className={styles.delete}>
        <IconButton
          size="large"
          className={styles.iconBtnStyle}
          type="button"
          onClick={onClick}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
  )
}
