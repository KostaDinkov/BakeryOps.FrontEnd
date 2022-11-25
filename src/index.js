import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import moment from "moment/moment";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderForm, { orderFormLoader } from "./Components/OrderForm";
import ColumnView, {
  loader as ordersLoader,
  action as ordersAction,
} from "./Components/ColumnView";

import DayView,{DayViewLoader} from "./Components/DayView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ColumnView />,
        loader: ordersLoader,
        action: ordersAction,
      },
      {
        path: "/orders/:method/:id",
        element: <OrderForm />,
        loader: orderFormLoader,
      },
      {
        path: "/orders/:method/",
        element: <OrderForm />,
        loader: orderFormLoader,
      },
      {
        path:"/orders/forDay/:date",
        element:<DayView/>,
        loader:DayViewLoader
      }
    ],
  },
]);

moment.updateLocale("bg", {
  months: [
    "Януари",
    "Февруари",
    "Март",
    "Април",
    "Май",
    "Юни",
    "Юли",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември",
  ],
});

moment.locale("bg");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
