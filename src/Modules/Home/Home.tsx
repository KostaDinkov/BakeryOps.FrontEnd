import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export default function Home() {
    return (
        < >
            <h1>Начална страница</h1>
            <Link to="/orders">Поръчки</Link>
            <Link to="/admin">Администрация</Link>
            <Link to="/nomenclature">Номенклатура</Link>
        </>
    )
}