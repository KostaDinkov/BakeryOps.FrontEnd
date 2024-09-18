import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./Components/NavBar/NavBar.js";
import AppContext from "./appContext.ts";
import * as ClientsService from "./API/clientsService.ts";
import ProductsService from "./API/productsService.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ClientDTO from "./Types/ClientDTO.ts";
import ProductDTO from "./Types/ProductDTO.ts";

const queryClient = new QueryClient();

function App() {
  let [products, setProducts] = useState<ProductDTO[]>([]);
  let [clients, setClients] = useState<ClientDTO[]>([]);
  let [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("isLogged"))
  );

  useEffect(() => {
    fetchProducts();
    fetchClients();
  }, []);

  async function fetchProducts() {
    const products = await ProductsService.getProducts();
    setProducts(products);
  }

  async function fetchClients() {
    const clients = await ClientsService.getAllItems();
    setClients(clients);
  }
  
  

  return (
    <div className={styles.app}>
      <AppContext.Provider value={{ products, clients, isLogged, setIsLogged }}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <div className={styles.homeContainer}>
            <Outlet />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
