import React from "react";

const AppContext = React.createContext({
  orders:[],
  products:[],
  user:"",
  isLogged:false,
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
