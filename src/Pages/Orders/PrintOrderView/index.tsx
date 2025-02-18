import { useParams } from "react-router";
import { useOrderQuery } from "../../../API/Queries/queryHooks";
import PrintOrderView from "../../../Components/PrintOrder/PrintOrderView";
import { Alert } from "@mui/material";
import OrdersNavBar from "../OrdersNavBar/OrdersNavBar";

export default function index() {
  const { id } = useParams();
  if (!id) {
    return (
      <Alert severity="error">Order ID not found in route parameters</Alert>
    );
  }
  const orderQuery = useOrderQuery({ id: id });

  if (orderQuery.isLoading) {
    return <Alert severity="info">Loading...</Alert>;
  }
  if (orderQuery.isError) {
    return <Alert severity="error">{orderQuery.error.message}</Alert>;
  }
  if (!orderQuery.data || !Object.hasOwn(orderQuery.data, "id")) {
    return <Alert severity="error">Order not found</Alert>;
  }
  return (
    <>
      <OrdersNavBar />
      <PrintOrderView order={orderQuery.data} />
    </>
  );
}
