import { Outlet } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NavigationPanel from "../../Components/NavigationPanel";
//import styles from "./AdminHomePage.module.scss";

export default function AdminHomePage() {
  const links = [
    { to: "users", text: "Потребители", icon: <PeopleAltIcon /> },
    { to: "reports", text: "Справки", icon: <TrendingUpIcon /> },
  ];
  return (
    <NavigationPanel title="Администрация" hasBackButton={true} links={links}>
      <Outlet />
    </NavigationPanel>
  );
}
