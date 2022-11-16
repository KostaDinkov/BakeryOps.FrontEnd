import React from "react";
import styles from "./OrderCard.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderCard = ({ order }) => {
  const pickupTime = order.pickupTime;
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span>{pickupTime}</span> <span>{order.clientName}</span>
      </AccordionSummary>

      <AccordionDetails>
        <ul>
          {order.orderItems.map((item, index) => (
            <dl key={index}>
              <dt>
                <span>{item.product.name} </span>
                <span>{item.productAmount} </span>
                <span>{item.isInProgress ? "true" : "false"} </span>
                <span>{item.isComplete ? "true" : "false"}</span>
              </dt>
              <dd>
                {item.description !== "" && (
                  <div>Забележка: {item.description}</div>
                )}
                {item.cakeFoto !== "" && <div>Фото: {item.cakeFoto}</div>}
                {item.cakeTitle !== "" && <div>Надпис: {item.cakeTitle}</div>}
              </dd>
            </dl>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCard;
