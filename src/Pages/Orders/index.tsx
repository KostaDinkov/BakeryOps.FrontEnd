import { Outlet } from "react-router";
import OrdersNavBar from "./OrdersNavBar/OrdersNavBar";
import Container from "../../Components/Containers/Container";


export default function OrdersHome() {
  return (
    <Container fullWidth>
     
      <Outlet/>
    </Container>
  )
}
