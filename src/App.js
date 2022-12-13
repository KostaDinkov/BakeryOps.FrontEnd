import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./Components/NavBar";
import AppContext from "./appContext";


function App() {
  let [products, setProducts] = useState([]);
  let [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem("isLogged")));


  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("http://localhost:5257/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
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
