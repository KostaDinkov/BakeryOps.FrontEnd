import React from "react";
import DayColumn from "./DayColumn";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  let response = await fetch("http://localhost:5257/api/orders");
  
  return response.json();
}

export async function action(){
    
}

function ColumnView() {
  const orders = useLoaderData();
  return (
    <div className="daysContainer">
      {orders.map((group, index) => (
        <DayColumn key={index} data={group} />
      ))}
    </div>
  );
}

export default ColumnView;
