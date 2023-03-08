import React from "react";
import OrderDTO from "./Types/OrderDTO";
import ProductDTO from "./Types/ProductDTO";

const AppContext = React.createContext({
  orders:[],
  products:[],
  user:"",
  isLogged:false,
} as {
  orders:OrderDTO[];
  products: ProductDTO[];
  user:string;
  isLogged:boolean;
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
