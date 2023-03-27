import { useState } from "react";
import OrderItemDTO from "../../Types/OrderItemDTO";
import styles from "./OrderStripeItem.module.scss";

export default function OrderStripe({ item }: { item: OrderItemDTO }) {
    const [isComplete,setIsComplete] = useState(item.isComplete);
    const [isInProgress,setIsInProgress] = useState(item.isInProgress);

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
    };

  
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
