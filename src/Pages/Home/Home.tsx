import { Outlet } from "react-router";
import CakeIcon from "@mui/icons-material/Cake";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import NavigationPanel from "../../Components/NavigationPanel";
//import styles from "./Home.module.css";

export default function Home() {
  const links = [
    { to: "orders", text: "Поръчки", icon: <CakeIcon /> },
    { to: "admin", text: "Администрация", icon: <ManageAccountsIcon /> },
    { to: "nomenclature", text: "Номенклатура", icon: <PlaylistAddIcon /> },
    { to: "deliveries", text: "Доставки", icon: <LocalShippingIcon /> },
    { to: "recipes", text: "Рецепти", icon: <CategoryIcon /> },
  ];
  return (
    <NavigationPanel
      title="Начало"
      hasBackButton={false}
      links={links}
    >
        <Outlet />
    </NavigationPanel>
  );
}
