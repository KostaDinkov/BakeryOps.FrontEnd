import { useEffect, useState } from "react";
import DayColumn from "./Components/DayColumn";
import "./App.css";
import NavBar from "./Components/NavBar";
import AppContext,{defaultOrderFormData} from "./appContext";
import OrderForm from "./Components/OrderForm";
import PubSub from 'pubsub-js';



function App() {
  let [data, setData] = useState([]);
  let [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  let [orderFormData, setOrderFormData] = useState(defaultOrderFormData);
  let [isEdit, setIsEdit] = useState(false);

  const onOrderChange = function (msg, data){
    console.log(`${msg}`)
    console.log(data)
    fetchData();
  }
  
  
  
  useEffect(() => {
    fetchData();
    //PubSub.clearAllSubscriptions();
    let token = PubSub.subscribe('ORDER CHANGE', onOrderChange);
  }, []);

  function fetchData() {
    fetch("http://localhost:5257/api/orders")
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ isOrderFormOpen, setIsOrderFormOpen, orderFormData, setOrderFormData, isEdit, setIsEdit }}>
        <OrderForm />
        <NavBar />
        <div className="daysContainer">
          {data.map((group, index) => (
            <DayColumn key={index} data={group}></DayColumn>
          ))}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
