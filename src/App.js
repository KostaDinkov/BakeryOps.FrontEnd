import { useEffect, useState } from "react";
import DayColumn from "./Components/DayColumn";
import "./App.css";
import NavBar from "./Components/NavBar";
import AppContext,{defaultOrderFormData} from "./appContext";

import PubSub from 'pubsub-js';



function App() {
  let [orders, setOrders] = useState([]);
  let [products, setProducts]= useState([]);
 

  const onOrderChange = function (msg, data){
    console.log(`${msg}`)
    fetchOrders();
  }
  
  useEffect(() => {
    fetchOrders();
    fetchProducts();
    PubSub.subscribe('ORDER CHANGE', onOrderChange);
  }, []);

  

  function fetchOrders(){
    fetch("http://localhost:5257/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }

  function fetchProducts(){
    fetch("http://localhost:5257/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ orders, products }}>
        
        <NavBar />
        <div className="daysContainer">
          {orders.map((group, index) => (
            <DayColumn key={index} data={group}></DayColumn>
          ))}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
