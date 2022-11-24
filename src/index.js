import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import moment from "moment/moment";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import OrderForm2,{orderFormLoader,orderFormAction as editAction} from "./Components/OrderForm2";
import ColumnView, {
  loader as ordersLoader,
  action as ordersAction,
} from "./Components/ColumnView";

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
        path:"/orders/:method/:id",
        element:<OrderForm2/>,
        loader: orderFormLoader,
        action: editAction
      },
      {
        path:"/orders/:method/",
        element:<OrderForm2/>,
        loader: orderFormLoader,
        action: editAction
      },
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
