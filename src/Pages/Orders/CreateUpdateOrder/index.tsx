import { useNavigate, useParams } from "react-router";
import RHFOrderForm from "../../../Components/RHFOrderForm/RHFOrderForm";
import {
  useClientsQuery,
  useOrderQuery,
  useProductsQuery,
} from "../../../API/Queries/queryHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../API/apiClient";
import { OrderDTO } from "../../../Types/types";
import OrdersNavBar from "../OrdersNavBar/OrdersNavBar";

export default function CreateUpdateOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const productsQuery = useProductsQuery();
  const clientsQuery = useClientsQuery();

  const newOrderMutation = useMutation({
    mutationFn: (data: OrderDTO) =>
      apiClient.POST("/api/Orders/CreateOrder", { body: data }),
    onSuccess: (data) => {
      navigate("/orders");
      PubSub.publish("SendUpdateOrders");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  const updateOrderMutation = useMutation({
    mutationFn: (data: OrderDTO) =>
      apiClient.PUT("/api/Orders/UpdateOrder", { body: data }),
    onSuccess: (data) => {
      navigate("/orders");
      PubSub.publish("SendUpdateOrders");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });


  let isEdit = false;
  let orderQuery = null;
  const { id } = useParams();
  if (id) {
    orderQuery = useOrderQuery({ id });
    isEdit = true;
  }

  if (
    productsQuery.isLoading ||
    clientsQuery.isLoading ||
    (id && orderQuery?.isLoading)
  ) {
    return <p>Loading...</p>;
  }
  const submitOrder = async (data: OrderDTO) => {
    if (isEdit) {
      await updateOrderMutation.mutateAsync(data);
      return;
    }
    await newOrderMutation.mutateAsync(data);
  };


  return (
    
    <>
      <OrdersNavBar />
      <RHFOrderForm
        products={productsQuery.data}
        clients={clientsQuery.data}
        submitOrder={submitOrder}
        order={orderQuery?.data}
      />
    </>
  );
}
