import { useNavigate, useParams } from "react-router-dom";
import RHFOrderForm from "../../../Components/RHFOrderForm/RHFOrderForm";
import {
  useClientsQuery,
  useOrderQuery,
  useProductsQuery,
} from "../../../API/Queries/queryHooks";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../API/apiClient";
import { OrderDTO } from "../../../Types/types";

export default function CreateUpdateOrder() {
  const navigate = useNavigate();
  const productsQuery = useProductsQuery();
  const clientsQuery = useClientsQuery();

  const newOrderMutation = useMutation({
    mutationFn: (data: OrderDTO) =>
      apiClient.POST("/api/Orders/CreateOrder", { body: data }),
    onSuccess: (data) => {
      navigate("/orders");
      PubSub.publish("SendUpdateOrders");
    },
  });
  const updateOrderMutation = useMutation({
    mutationFn: (data: OrderDTO) =>
      apiClient.PUT("/api/Orders/UpdateOrder", { body: data }),
    onSuccess: (data) => {
      navigate("/orders");
      PubSub.publish("SendUpdateOrders");
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
    <RHFOrderForm
      products={productsQuery.data}
      clients={clientsQuery.data}
      submitOrder={submitOrder}
      order={orderQuery?.data}
    />
  );
}
