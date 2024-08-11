import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import PubSub from "pubsub-js";

const hostName = import.meta.env.VITE_API_SERVER_URL;
const eventHubPath = import.meta.env.VITE_API_SERVER_EVENT_HUB_PATH;

export default class EventHub {
  eventConnection: HubConnection;
  constructor() {
    this.eventConnection = new HubConnectionBuilder()
      .withUrl(`${hostName}${eventHubPath}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    if (this.eventConnection) {
      this.eventConnection.logging = true;
      this.eventConnection.start().then((result) => {
        this.eventConnection.on("UpdateOrders", (message) => {
          PubSub.publish("DBOrdersUpdated", message);
        });
      });
    }
  }

  sendUpdateOrders = () => {
    if (this.eventConnection.state === HubConnectionState.Connected) {
      this.eventConnection
        .invoke("UpdateClients")
        .catch((err) => console.log(err));
    }
  };
}
