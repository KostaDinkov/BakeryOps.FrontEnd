//TODO Add mechanism to sync deleted products from GenSoft DB
//TODO extract business logic from components
//TODO fix nginx config to allow for react router refresh

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/globals.scss";
import { RouterProvider } from "react-router-dom";
import EventHub from "./EventHub";
import PubSub from "pubsub-js";
import { browserRouter } from "./system/browserRouter";
import { setMuiLicense } from "./muiLicense";
import type {} from '@mui/x-data-grid/themeAugmentation';


setMuiLicense();
const router = browserRouter;

//Disable window vertical scrolling with the arrow keys.
window.addEventListener(
  "keydown",
  function (e) {
    if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  },
  false
);

const eventHub = new EventHub();
PubSub.subscribe("SendUpdateOrders", eventHub.sendUpdateOrders);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
