import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Начална страница</h1>
            <Link to="/orders">Поръчки</Link>
            <Link to="/admin">Администрация</Link>
        </div>
    )
}