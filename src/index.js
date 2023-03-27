//TODO add custom order layout for day view
//TODO fix nginx config to allow for react router refresh
//TODO cleanup and refactor where necessary

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderForm, { orderFormLoader } from "./Components/OrderForm/OrderForm";
import Error from "./Components/Error";
import ColumnView, { loader as ordersLoader } from "./Components/ColumnView/ColumnView.tsx";
import DayView, { DayViewLoader } from "./Components/DayView/DayView";
import LoginForm from "./Components/LoginForm/LoginForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EventHub from "./EventHub";
import PubSub from "pubsub-js";
import PrintOrderView ,{loader as PrintOrderViewLoader}from "./Components/PrintOrderView/PrintOrderView";
import ReportsPage from "./Components/ReportsPage/ReportsPage";
import PriceList from "./Components/PriceList/PriceList.tsx";
import { loader as PriceListLoader } from "./Components/PriceList/PriceList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ColumnView />,
        errorElement: <Error />,
        loader: ordersLoader,
      },
      {
        path: "/orders/:method/:id",
        element: <OrderForm />,
        loader: orderFormLoader,
        errorElement:<Error/>
      },
      {
        path: "/orders/:method/",
        element: <OrderForm />,
        loader: orderFormLoader,
        errorElement:<Error/>
      },
      {
        path:"/orders/print/:id",
        element:<PrintOrderView/>,
        loader: PrintOrderViewLoader,
        errorElement:<Error/>
      },
      {
        path: "/orders/forDay/:date",
        element: <DayView />,
        loader: DayViewLoader,
        errorElement:<Error/>
      },
      {
        path: "/login/",
        element: <LoginForm />,
      },
      {
        path:"/reports/",
        element:<ReportsPage/>,
        children:[
          {
            path:"/reports/priceList/",
            element:<PriceList/>,
            loader: PriceListLoader,
          }
          
        ]
      }
    ],
  },
]);

//Disable window vertical scrolling with the arrow keys.
window.addEventListener("keydown",function(e){
  if(["ArrowUp","ArrowDown"].indexOf(e.code) > -1) {
    e.preventDefault();
}},false);

const eventHub = new EventHub();
PubSub.subscribe("SendUpdateOrders", eventHub.sendUpdateOrders);

const muiTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1f5464",
    },
    secondary: {
      main: "#ffb300",
    },
    background: {
      default: "#e1e2e1",
      paper: "#f5f5f6",
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
