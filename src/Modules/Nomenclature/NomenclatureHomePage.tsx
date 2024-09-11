import { Link, Outlet } from "react-router-dom";


export default function AdminHomePage() {
    return (
        <div className="verticalMenu">
            <h1>Номенклатура</h1>
            <Link to="materials">Стоки</Link>
            <Link to="products">Продукти</Link>
            <Link to="vendors">Доставчици</Link>
            <Link to="clients">Клиенти</Link>
            <Outlet />
        </div>
    )
}