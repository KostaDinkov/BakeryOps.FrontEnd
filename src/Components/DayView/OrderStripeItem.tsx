import { useState, useEffect } from "react";
import { OrdersService } from "../../API/ordersApi";
import OrderDTO from "../../Types/OrderDTO";
import OrderItemDTO from "../../Types/OrderItemDTO";
import styles from "./OrderStripeItem.module.scss";

export default function OrderStripe({ order,item }: {order:OrderDTO, item: OrderItemDTO }) {
    const [isComplete,setIsComplete] = useState(item.isComplete);
    const [isInProgress,setIsInProgress] = useState(item.isInProgress);
    const [shouldUpdate,setShouldUpdate] = useState(false);

    const handleClick = () => {
        if(isInProgress){
            setIsInProgress(false);
            setIsComplete(true);
        }else if(isComplete){
            setIsInProgress(false);
            setIsComplete(false);
        }else{
            setIsInProgress(true);
            setIsComplete(false);
        }
        setShouldUpdate(true);      
    };

    useEffect(()=>{
        if(shouldUpdate){
        (async ()=>{
            
            await updateOrder();
        })();}
        
    },[shouldUpdate])

    useEffect(()=>{
        setIsComplete(item.isComplete);
        setIsInProgress(item.isInProgress);
    },[order])

    async function updateOrder() {
        item.isComplete = isComplete;
        item.isInProgress = isInProgress;
        await OrdersService.PutOrderAsync(order.id as number, order);
        PubSub.publish("SendUpdateOrders");
        setShouldUpdate(false);
    }

  
    const getItemStyles = () => {
        let stylesArr = [styles.stripeItemContainer];
        if (isComplete) {
            stylesArr.push(styles.itemComplete);
        } else if (isInProgress) {
            stylesArr.push(styles.itemInProgress);
        }
        return stylesArr.join(" ");
    }
    return (
    <div className={getItemStyles()} onClick={handleClick}>
      <div>
        <span className={styles.itemAmount}>
          <strong>{item.productAmount}</strong> {item.product.unit}
        </span>

        <span className={styles.productName}>{item.product.name}</span>
      </div>
      <div>
        {item.cakeFoto && (
          <span>
            <strong> Фото:</strong> {item.cakeFoto}
          </span>
        )}
        {item.cakeTitle && (
          <span>
            <strong> Надпис:</strong> {item.cakeTitle}
          </span>
        )}
        {item.description && (
          <span>
            <strong> Бележка:</strong> {item.description}
          </span>
        )}
      </div>
    </div>
  );
}
