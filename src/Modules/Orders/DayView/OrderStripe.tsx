import OrderDTO from "../../../Types/OrderDTO";
import styles from "./OrderStripe.module.scss";
import format from "date-fns/format";
import OrderStripeItem from "./OrderStripeItem";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import PrintIcon from "@mui/icons-material/Print";
export default function OrderStripe({ order }: { order: OrderDTO }) {
  const getTimeStyle = () => {
    let stylesArr = [styles.itemTime];
    if (order.isPaid) {
      stylesArr.push(styles.itemPaid);
    } else if (order.advancePaiment > 0) {
      stylesArr.push(styles.itemKaparo);
    } else {
      stylesArr.push(styles.itemNotPaid);
    }
    return stylesArr.join(" ");
  };

  return (
    <div className={styles.stripeContainer}>
      <div className={styles.stripeHeader}>
        <div className={getTimeStyle()}>
          <span>{format(new Date(order.pickupDate), "HH:mm")}</span>
          <span className={styles.iconLinks}>
            <Link to={`/orders/print/${order.id}`}>
              <PrintIcon
                fontSize="medium"
                cursor="pointer"
                sx={{ color: "white" }}
              />
            </Link>
            <Link
              data-test="Order-EditLink"
              to={`/orders/put/${order.id}`}
            >
              <EditIcon
                fontSize="medium"
                cursor="pointer"
                sx={{ color: "white" }}
              />
            </Link>
          </span>
        </div>
        <div className={styles.clientName}>{order.clientName}</div>
        {order.clientPhone && <div className={styles.clientPhone}>{order.clientPhone}</div>}
      </div>
      <div className={styles.itemsContainer}>
        {order.orderItems.map((item) => {
          return (
            <OrderStripeItem order={order} item={item} key={item.productId} />
          );
        })}
      </div>
    </div>
  );
}
