import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./Components/NavBar/NavBar";
import AppContext from "./appContext";
import { productsApi } from "./API/ordersApi.ts";
import ClientsService from "./API/clientsService";


function App() {
  let [products, setProducts] = useState([]);
  let [clients, setClients] = useState([]);
  let [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem("isLogged")));


  useEffect(() => {
    fetchProducts();
    fetchClients();
  }, []);

  async function fetchProducts() {
    const products = await productsApi.getProducts()
    setProducts(products);
  }

  async function fetchClients(){
    const clients = await ClientsService.GetClientsAsync();
    setClients(clients);
  }

  return (
    <div className={styles.app}>
      <AppContext.Provider value={{ products, clients, isLogged, setIsLogged }}>
        <NavBar />
        <Outlet />
      </AppContext.Provider>
    </div>
  );
}

export default App;
