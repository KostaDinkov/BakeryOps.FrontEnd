import React, { useState, useEffect } from "react";
import styles from "./Button.module.css";
import Select,{createFilter} from "react-select";

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
  let [productOptions, setProductOptions] = useState([]);
  let [productList, setProductList] = useState([]);

  const filterConfig={
    ignoreCase:true,
    ignoreAccents:true,
    trim:false,
    stringify: option => `${option.label} ${option.data.code}`,
    matchFrom: 'any',
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(()=>{
    if(products.length>=1){
      setProductOptions(() => {
        let options = products.map((p) => ({ value: p.id, label: p.name,  code:p.code}));
        console.log(options)
        return options;
      });
    }

  },[products])

  function fetchProducts() {
    fetch("http://localhost:5257/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  let showOrderForm = () => {
    
    setProductList((list) => [
      ...list,
      <ProductSelector options={productOptions} filterConfig={filterConfig}/>,
    ]);
    dialogRef.current.showModal();
  };

  let dialogRef = React.useRef(null);

  const handleOnSubmit = (event) => {
    console.log(event);
  };

  const handleDialogClose = (event) => {
    setProductList([]);
  };

  const addNewProductSelector = (event) => {
    setProductList((list) => {
      console.log(list);
      return [...list, <ProductSelector options={productOptions} filterConfig={filterConfig} />];
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

function ProductSelector({ options, filterConfig }) {
  return (
    <>
      <span>
        <label>
          Продукт
          <Select options={options} filterOption={createFilter(filterConfig)} />
        </label>
      </span>
      <label>
        Колич: <input type="number" name="prodAmount" />{" "}
      </label>
      <input type="button" value="X" />
    </>
  );
}
