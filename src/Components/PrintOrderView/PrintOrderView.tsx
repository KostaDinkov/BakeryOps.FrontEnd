import React, { useContext } from "react";
import styles from "./PrintOrderView.module.css";
import OrderDTO from "../../Types/OrderDTO";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { OrdersService } from "../../API/ordersApi";
import { useLoaderData } from "react-router-dom";
import AppContext from "../../appContext";

import OrderItemDTO from "../../Types/OrderItemDTO";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";

let PhotoPrice: number;

export async function loader({ params }: { params: { id: number } }) {
  let id = params.id;
  let order = await OrdersService.GetOrderAsync(id);

  return order;
}

export default function PrintOrderView() {
  const { products } = useContext(AppContext);
  //TODO change to barcode query
  //TODO remove foto dependency from PrintOrderView
  const foto = products.find((p) => p.id === 350);
  if (foto) {
    PhotoPrice = foto.priceDrebno;
  } else {
    throw new Error(`Не може да бъде намерен продукт Фотокартина ${350}`);
  }
  const order = useLoaderData() as OrderDTO;

  return (
    <div>
      <div className={styles.pageView} data-test="PrintOrderView-container">
        <OrderForPrint order={order} />
        <div className={styles.orderDivider}></div>
        <OrderForPrint order={order} />
      </div>
      <div className={styles.printBtnContainer}>
        <Button
          variant="contained"
          endIcon={<PrintIcon />}
          onClick={() => {
            window.print();
          }}
        >
          Отпечатай
        </Button>
      </div>
    </div>
  );
}

function OrderForPrint({ order }: { order: OrderDTO }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Сладкарска Работилница Жана ООД</div>
        <div>гр. Ихтиман, ул. Цар Освободител №195, тел. 072483329</div>
      </div>
      <div className={styles.details}>
        <div>
          <div className={styles.orderNumber}>
            ПОРЪЧКА №{order.id} от{" "}
            {format(new Date(order.createdDate), "dd-MM-yyyy")} за:
          </div>
          <div className={styles.orderDate}>
            {format(new Date(order.pickupDate), "EEEE dd-MM-yyyy HH:mm", {
              locale: bg,
            })}
            ч.
          </div>
        </div>
        <div>
          <div>Клиент</div>
          <div>{order.clientName}</div>
          <div>{order.clientPhone}</div>
        </div>
      </div>
      <div className={styles.productList}>
        <div className={styles.productRow}>
          <div className={styles.productContainer}>
            <div className={styles.productName}>
              <div>Продукти</div>
            </div>
          </div>
          <div className={styles.productUnitPrice}>
            <div>Ед.ц.</div>
          </div>
          <div className={styles.productCount}>
            <div>Кол.</div>
          </div>
          <div className={styles.productPrice}>
            <div>Общо</div>
          </div>
        </div>

        {order.orderItems.map((i, index) => (
          <div className={styles.productRow} key={index + "" + i.productId}>
            <div className={styles.productContainer}>
              <div className={styles.productName}>
                {index + 1}. {i.product?.name}
              </div>
              <div className={styles.productDescription}>{i.description}</div>
              <div className={styles.productDescription}>
                {i.cakeFoto ? (
                  <div>
                    <strong>Фото:</strong>
                    {i.cakeFoto}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.productDescription}>
                {i.cakeTitle ? (
                  <div>
                    <strong>Надпис:</strong>
                    {i.cakeTitle}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.productUnitPrice}>
              <span>
                {i.itemUnitPrice} 
              </span>
            </div>
            <div className={styles.productCount}>
              <span>
                {i.productAmount} {i.product?.unit}
              </span>
            </div>
            <div className={styles.productPrice}>
              <span>{toBGN(i.productAmount * i.itemUnitPrice)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Footer order={order} />
      </div>
    </div>
  );
}

function Footer({ order }: { order: OrderDTO }) {
  if (order.isPaid) {
    return (
      <div className={styles.footerRow}>
        <span className={styles.footerTotal}>
          ПЛАТЕНА: {toBGN(getOrderPrice(order))}
        </span>
      </div>
    );
  } else if (order.advancePaiment > 0) {
    return (
      <div className={styles.footerRow}>
        <span className={styles.footerInfo}>
          Капаро: {toBGN(order.advancePaiment)}
        </span>
        <span className={styles.footerTotal}>
          За доплащане: {toBGN(getOrderPrice(order))}
        </span>
      </div>
    );
  } else {
    return (
      <div className={styles.footerRow}>
        <span></span>
        <span className={styles.footerTotal}>
          За плащане: {toBGN(getOrderPrice(order))}
        </span>
      </div>
    );
  }
}

function getOrderPrice(order: OrderDTO): number {
  let totalPrice = 0;

  for (let item of order.orderItems) {
    totalPrice += getProductPrice(item) * item.productAmount;
  }
  if (order.advancePaiment > 0) {
    totalPrice = totalPrice - order.advancePaiment;
  }
  return totalPrice;
}

function toBGN(amount: number): string {
  return amount.toLocaleString("bg-BG", { style: "currency", currency: "BGN" });
}

function getProductPrice(orderItem: OrderItemDTO) {
  let price = 0;
  if (orderItem.cakeFoto?.trim() !== "") {
    price += PhotoPrice;
  }
  price += orderItem.itemUnitPrice;
  return price;
}
