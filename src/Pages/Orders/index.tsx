import { Outlet } from "react-router";
import OrdersNavBar from "./OrdersNavBar/OrdersNavBar";


export default function OrdersHome() {
  return (
    <>
      <OrdersNavBar/>
      <Outlet/>
    </>
  )
}
