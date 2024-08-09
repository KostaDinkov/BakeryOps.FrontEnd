import { Outlet } from "react-router-dom";
import OrdersNavBar from "../OrdersNavBar/OrdersNavBar";


export default function OrdersHome() {
  return (
    <>
      <OrdersNavBar/>
      <Outlet/>
    </>
  )
}
