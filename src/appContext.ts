import React from "react";
import ClientDTO from "./Types/ClientDTO";
import OrderDTO from "./Types/OrderDTO";
import ProductDTO from "./Types/ProductDTO";

const AppContext = React.createContext({
  orders:[],
  products:[],
  user:"",
  isLogged:false,
  clients:[],
} as {
  orders:OrderDTO[];
  products: ProductDTO[];
  user:string;
  isLogged:boolean;
  clients:ClientDTO[];
});

export const defaultOrderFormData = {
  operatorId: 0,
  pickupDate: "",
  pickupTime: "",
  clientName: "",
  clientPhone: "",
  isPaid: false,
  advancePaiment: 0,
  orderItems: [],
};

export default AppContext;
