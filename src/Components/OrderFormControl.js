import React, { useState, useEffect } from "react";
import styles from "./Button.module.css";

export default function OrderFromControl({ text }) {
  let defaultOrder = {
    operatorId: 0,
    pickupDate: "",
    clientName: "",
    clientPhone: "",
    isPaid: false,
    advancePaiment: 0,
    orderItems: [
      {
        productId: 127,
        productAmount: 1,
        description: "",
        cakeFoto: "",
        cakeTitle: "",
      },
    ],
  };

  let [order, setOrder] = useState(defaultOrder);
  let [products, setProducts] = useState([]);
  let [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("http://localhost:5257/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

 



  let showOrderForm = () => {
    setProductList((list)=>[...list,<ProductSelector products={products}/>])
    dialogRef.current.showModal();
  };

  let dialogRef = React.useRef(null);

  const handleOnSubmit = (event) => {
    console.log(event);
  };

  const handleDialogClose = (event)=>{
    setProductList([]);
  }

  const addNewProductSelector = (event) => {
    setProductList((list) => {
      console.log(list);
      return [...list,<ProductSelector products={products}/>];
    });
  };

  return (
    <>
      <div className={styles.buttonContainer} onClick={showOrderForm}>
        {text}
      </div>

      <dialog ref={dialogRef} onClose={handleDialogClose}>
        <h1>Нова Поръчка</h1>
        <form method="dialog" onSubmit={handleOnSubmit}>
          <div>
            <label>
              Клиент: <input type="text" name="clientName" id="clientName" />{" "}
            </label>

            <label>
              За дата:{" "}
              <input type="datetime" name="pickupDate" id="pickupDate" />{" "}
            </label>
          </div>

          <div>
            <label>
              Телефон: <input type="text" name="clientPhone" id="clientPhone" />
            </label>
            <label>
              Капаро
              <input type="number" name="advance" id="advance" />
            </label>
            <label>
              Платена
              <input type="checkbox" name="isPaid" id="isPaid" />
            </label>
          </div>

          <div>
            {productList.map((el, index) => (
              <div key={index}>{el}</div>
            ))}
          </div>
          <input type="button" value="Добави" onClick={addNewProductSelector} />
          <div>
            <button value="cancel">Cancel</button>

            <input type="submit" value="Submit" />
          </div>
        </form>
      </dialog>
      
    </>
  );
}

function ProductSelector({ products }) {
  return (
    <>
      <label>
        Продукт
        <select>
          <option value="default">Choose…</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Колич: <input type="number" name="prodAmount" />{" "}
      </label>
      <input type="button" value="X"/>
    </>
  );
}
