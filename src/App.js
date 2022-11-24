import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import NavBar from "./Components/NavBar";
import AppContext from "./appContext";
import PubSub from "pubsub-js";

function App() {
  let [products, setProducts] = useState([]);

  const onOrderChange = function (msg, data) {
    console.log(`${msg}`);
    //fetchOrders();
  };

  useEffect(() => {
    fetchProducts();
    //PubSub.subscribe("ORDER CHANGE", onOrderChange);
    // eslint-disable-next-line
  }, []);

  function fetchProducts() {
    fetch("http://localhost:5257/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ products }}>
        <NavBar />
        <Outlet />
      </AppContext.Provider>
    </div>
  );
}

export default App;
