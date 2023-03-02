import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./Components/NavBar";
import AppContext from "./appContext";
import { productsApi } from "./API/ordersApi.ts";


function App() {
  let [products, setProducts] = useState([]);
  let [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem("isLogged")));


  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const products = await productsApi.getProducts()
    setProducts(products);
  }

  return (
    <div className={styles.app}>
      <AppContext.Provider value={{ products, isLogged, setIsLogged }}>
        <NavBar />
        <Outlet />
      </AppContext.Provider>
    </div>
  );
}

export default App;
