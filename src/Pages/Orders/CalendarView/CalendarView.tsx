import { useEffect, } from "react";
import DayColumn from "./DayColumn";
import styles from "./CalendarView.module.css";
import PubSub from "pubsub-js";
import { useOrdersQuery } from "../../../API/Queries/queryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { OrderDTO } from "../../../Types/types";

export default function CalendarView() {
  const queryClient = useQueryClient();
  const ordersQuery = useOrdersQuery();

  useEffect(() => {
    PubSub.subscribe("DBOrdersUpdated", reload);
  }, []);

  async function reload(msg: string) {
    await queryClient.invalidateQueries({queryKey:['orders']})
  }

  if (ordersQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if(ordersQuery.isError){
    return <div>Error loading orders</div>
  }
  if(!ordersQuery.data){
    return <div>Nor orders for the next 3 days</div>
  }
  return (
    <div className={styles.daysContainer}>
      {ordersQuery.data.map((group:OrderDTO[], index:number) => (
        <DayColumn key={index} data={group} />
      ))}
    </div>
  );
}


