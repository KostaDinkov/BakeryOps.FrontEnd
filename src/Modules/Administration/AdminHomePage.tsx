import { Link, Outlet } from "react-router-dom";

export default function AdminHomePage() {
    return (
        <div>
            <h1>Администрация</h1>
            <Link to="/admin/users">Потребители</Link>
            <Outlet />
        </div>
    )
}