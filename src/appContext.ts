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
  setIsLogged:null
} as {
  orders:OrderDTO[];
  products: ProductDTO[];
  user:string;
  isLogged:boolean;
  clients:ClientDTO[];
  setIsLogged: React.Dispatch<any> | null;
});



export default AppContext;
