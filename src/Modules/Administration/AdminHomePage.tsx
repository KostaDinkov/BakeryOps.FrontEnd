import { Link, Outlet } from "react-router-dom";
import styles from './AdminHomePage.module.scss'

export default function AdminHomePage() {
    return (
        <div className = {styles.container}>
            <h1>Администрация</h1>
            <Link to="/admin/users">Потребители</Link>
            <Link to="/admin/reports">Справки</Link>
            <Outlet />
        </div>
    )
}