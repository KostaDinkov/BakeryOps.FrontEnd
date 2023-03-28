import styles from "./OrderCardCompact.module.css";
import OrderItem from "./OrderItemCompact";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import OrderDTO from "../../Types/OrderDTO";
import { format } from "date-fns";
import PrintIcon from "@mui/icons-material/Print";

const OrderCard = ({ order }: { order: OrderDTO }) => {
  const containerStyles = () => {
    for (const item of order.orderItems) {
      if (!item.isComplete) {
        return [
          styles.orderCardContainer,
          styles.orderCardContainerNotComplete,
        ].join(" ");
      }
    }

    return [styles.orderCardContainer, styles.orderCardContainerComplete].join(
      " "
    );
  };

  return (
    <div className={containerStyles()}>
      <div className={styles.cardHeader}>
        <span className={styles.pickupTime}>
          {format(new Date(order.pickupDate), "HH:mm")}
        </span>{" "}
        <span>{order.clientName}</span>
        <div className={styles.editIcon}>
          <Link
            data-test="OrderCard-PrintLink"
            to={`/orders/print/${order.id}`}
          >
            <PrintIcon
              fontSize="small"
              cursor="pointer"
              sx={{ color: "white" }}
            />
          </Link>
          <Link data-test="OrderCard-EditLink" to={`/orders/put/${order.id}`}>
            <EditIcon
              fontSize="small"
              cursor="pointer"
              sx={{ color: "white" }}
            />
          </Link>
        </div>
      </div>
      {order.orderItems.map((item) => (
        <OrderItem key={item.id as number} item={item} />
      ))}
    </div>
  );
};

export default OrderCard;
