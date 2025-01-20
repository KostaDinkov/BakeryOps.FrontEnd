import { Link } from "react-router-dom";
import CakeIcon from '@mui/icons-material/Cake';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CategoryIcon from '@mui/icons-material/Category';
import { Button } from "@mui/material";
//import styles from "./Home.module.css";

export default function Home() {
    return (
        < >
            <nav className="grid grid-cols-2 gap-2">
                <Button startIcon={<CakeIcon />} variant="contained" color="primary">
                    <Link to="/orders">Поръчки</Link>
                </Button>
                <Button startIcon={<ManageAccountsIcon />} variant="contained" color="primary">
                    <Link to="/admin">Администрация</Link>
                </Button>
                <Button startIcon={<PlaylistAddIcon/>} variant="contained" color="primary">
                    <Link to="/nomenclature">Номенклатура</Link>
                </Button>
                <Button startIcon ={<LocalShippingIcon/>} variant="contained" color="primary">
                    <Link to="/deliveries">Доставки</Link>
                </Button>
                <Button startIcon = {<CategoryIcon/>} variant="contained" color="primary">
                    <Link to="/recipes">Рецепти</Link>
                </Button>
            </nav>
        </>
    )
}