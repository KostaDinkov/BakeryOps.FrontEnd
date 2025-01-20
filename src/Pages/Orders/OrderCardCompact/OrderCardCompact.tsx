import styles from "./OrderCardCompact.module.scss";
import OrderItem from "./OrderItemCompact";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import OrderDTO from "../../../Types/OrderDTO";
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
  const getChipStyle = ()=>{
    const nameStyles = [styles.textBadge];
    if(order.isPaid){
      nameStyles.push(styles.textBadgeRed);
    }
    else if(order.advancePaiment>0){
      nameStyles.push(styles.textBadgeYellow);
    }

    return nameStyles.join(" ");
    
  }

  return (
    <div className={containerStyles()}>
      <div className={styles.cardHeader}>
        <span className={styles.pickupTime}>
          {format(new Date(order.pickupDate), "HH:mm")}
        </span>{" "}
        <span >{order.clientName}</span>
        {order.isPaid && <span className={getChipStyle()}>платена</span>}
        {order.advancePaiment>0 && <span className={getChipStyle()}>капаро</span>}
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
