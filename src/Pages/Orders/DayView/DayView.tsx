import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { bg } from "date-fns/locale";
import { useParams, useNavigation, useNavigate } from "react-router";
import OrderCard from "../OrderCard/OrderCard";
import styles from "./DayView.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import OrderStripe from "./OrderStripe";
import { OrderDTO } from "../../../Types/types";
import { useOrdersByDateQuery } from "../../../API/Queries/queryHooks";
import ConfirmationDialog from "../../../Components/ConfirmationDialog/ConfirmationDialog";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../API/apiClient";
import OrdersNavBar from "../OrdersNavBar/OrdersNavBar";

export default function DayView() {
  const { state } = useNavigation();
  const navigate = useNavigate();

  const [stripes, setStripes] = useState(true);
  let { date } = useParams();

  const ordersForDateQuery = useOrdersByDateQuery({ date: new Date(date) });
  
  const deleteOrderMutation = useMutation({
    mutationFn: (data: OrderDTO) =>
      apiClient.DELETE("/api/Orders/DeleteOrder/{id}", {
        params: { path: { id: data.id || "" } },
      }),
    onSuccess: (data) => {
      navigate(-1);
      PubSub.publish("SendUpdateOrders");
    },
  });

  useEffect(() => {
    PubSub.subscribe("DBOrdersUpdated", async (msg) => {});
  }, []);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [handleDeleteAgree, setHandleDeleteAgree] = useState<
    ((order: OrderDTO) => void) | null
  >(null);

  if (ordersForDateQuery.isLoading) {
    return <LinearProgress />;
  }
  if (ordersForDateQuery.isError) {
    return <div>Error loading orders</div>;
  }

  function isOrders(): boolean {
    if (ordersForDateQuery.data && ordersForDateQuery.data.length > 0) {
      return true;
    }
    return false;
  }

  return (
    <>
     <OrdersNavBar/>
      {isOrders() ? (
        <div className={styles.layoutContainer}>
          {state === "loading" && <LinearProgress />}
          <div className={styles.title}>
            <h1>{formatDate(ordersForDateQuery.data[0].pickupDate)}</h1>
          </div>
          {stripes ? (
            <div className={styles.ordersContainer}>
              {ordersForDateQuery.data.map((order: OrderDTO) => (
                <OrderStripe
                  key={order.id}
                  order={order}
                  handleDelete={() => {
                    setIsDeleteOpen(true);
                    setHandleDeleteAgree(() => {
                      return () => {
                        deleteOrderMutation.mutate(order);
                      };
                    });
                  }}
                />
              ))}
            </div>
          ) : (
            <div className={styles.ordersContainer}>
              {ordersForDateQuery.data.map((order: OrderDTO) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
          <ConfirmationDialog
            agreeBtnText="Да"
            disagreeBtnText="Не"
            title="Изтриване на поръчка"
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            handleAgree={handleDeleteAgree}
            promptText="Сигурни ли сте, че искате да изтриете поръчката?"
          />
        </div>
      ) : (
        <div data-test="DayView-noOrdersDiv" className={styles.noOrders}>
          Няма поръчки за{" "}
          {format(new Date(date), "do MMMM, yyyy г.", {
            locale: bg,
          })}
        </div>
      )}
    </>
  );
}

function formatDate(date: string) {
  return format(new Date(date), "EEEE, do MMMM yyyy г.", { locale: bg });
}
