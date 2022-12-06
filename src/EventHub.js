import { HubConnectionBuilder } from "@microsoft/signalr";
import { eventHubUrl } from "./API/ordersApi";
import PubSub from "pubsub-js";

export default class EventHub {
  constructor() {
    this.eventConnection = new HubConnectionBuilder()
      .withUrl(eventHubUrl)
      .withAutomaticReconnect()
      .build();

    if (this.eventConnection) {
      this.eventConnection.start().then((result) => {
        console.log("Connected to eventHub");

        this.eventConnection.on("UpdateOrders", (message) => {
          PubSub.publish("DBOrdersUpdated", message);
          console.log(message);
        });
      });
    }
  }

  sendUpdateOrders = ()=> {
    if (this.eventConnection.connectionStarted) {
      this.eventConnection.send("UpdateClients", {
        user: "client",
        message: "a client updated orders",
      });
    }
  }
}
