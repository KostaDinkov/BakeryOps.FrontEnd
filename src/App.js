import { useEffect, useState } from "react";
import DayColumn from "./Components/DayColumn";
import "./App.css";
import NavBar from "./Components/NavBar";


function App() {
  let [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("http://localhost:5257/api/orders")
      .then((response) => response.json())
      .then((data) => setData(data));
  }
  
  return (
    <div className="App">
      <NavBar/>
      <div className="daysContainer">
        {data.map((group,index)=>
          <DayColumn key ={index} data = {group}>
        
          </DayColumn>
          )}
      </div>
      
    </div>
  );
}

export default App;
