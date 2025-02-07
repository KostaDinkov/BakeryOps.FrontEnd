import { Outlet } from "react-router";
import NavigationPanel from "../../Components/NavigationPanel";

import WarehouseIcon from "@mui/icons-material/Warehouse";
import CakeIcon from "@mui/icons-material/Cake";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import SegmentIcon from "@mui/icons-material/Segment";

export default function AdminHomePage() {
  const links = [
    { to: "categories", text: "Категории Стоки", icon: <SegmentIcon /> },
    { to: "materials", text: "Стоки", icon: <WarehouseIcon /> },
    { to: "products", text: "Продукти", icon: <CakeIcon /> },
    { to: "vendors", text: "Доставчици", icon: <ContactPhoneIcon /> },
    { to: "clients", text: "Клиенти", icon: <PeopleAlt /> },
  ];
  return (
    <NavigationPanel title="Номенклатура" hasBackButton={true} links={links}>
      <Outlet />
    </NavigationPanel>
  );
}
