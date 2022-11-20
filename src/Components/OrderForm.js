import React, { useState, useEffect, useContext } from "react";
import ProductSelector from "./ProductSelector";
import moment from "moment";
import AppContext, { defaultOrderFormData } from "../appContext";
import PubSub from "pubsub-js";

export default function OrderForm({
  formState,
  setFormState,
  initialFormData,
  isEdit,
}) {
  const dialogRef = React.createRef(null);

  let { products } = useContext(AppContext); // the products from the DB
  let [productsList, setProductsList] = useState([]); // a list of selected products for the order
  let [productOptions, setProductOptions] = useState(
    productsToOptions(products)
  ); //options for the ProductSelector component, based on products
  let [productSelectorList, setProductSelectorList] = useState([]); // list of ProductSelector components added to the OrderForm
  let [orderFormData, setOrderFormData] = useState(initialFormData);

  useEffect(() => {
    if (dialogRef && !dialogRef.current.open && formState.isFormOpen) {
      showOrderForm(orderFormData);
    }
  });

  function productsToOptions(products) {
    if (products.length >= 1) {
      let options = products.map((p) => ({
        value: p.id,
        label: p.name,
        code: p.code,
      }));
      return options;
    }
    return [];
  }

  function showOrderForm(order) {
    setOrderFormData((orderForm) => ({
      ...orderForm,
      pickupDate: moment(orderForm.pickupDate).format("DD-MM-YYYY"),
    }));
    if (order.orderItems.length === 0) {
      addNewProductSelector(new DefaultSelectorValues());
    } else {
      orderFormData.orderItems.forEach((orderItem) => {
        addNewProductSelector(orderItem);
      });
    }
    dialogRef.current.showModal();
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    let orderItems = productSelectorList.map((selector) => {
      const item = selector.props.selectorValues;
      console.log(item);
      return item;
    });

    let newOrder = {
      ...orderFormData,
      orderItems: orderItems,
      pickupDate: moment(orderFormData.pickupDate, "DD-MM-YYYY").format(),
    };

    setOrderFormData(newOrder);

    let validationResult = validateOrder(newOrder);
    if (!validationResult.isValid) {
      console.log(validationResult.errors);
    } else {
      let data = JSON.stringify(newOrder);

      let endPoint = "http://localhost:5257/api/orders";
      let method = "POST";
      if (isEdit) {
        endPoint = `http://localhost:5257/api/orders/${newOrder.id}`;
        method = "PUT";
      }

      fetch(endPoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          PubSub.publish("ORDER CHANGE", newOrder);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      closeForm();
    }
  }

  function closeForm(event) {
    setOrderFormData(defaultOrderFormData);
    setProductsList([]);
    setProductSelectorList([]);
    dialogRef.current.close();
    setFormState((state) => ({ ...state, isFormOpen: false }));
  }

  

  function addNewProductSelector(existing) {
    setProductSelectorList((list) => {
      return [...list, <ProductSelector options={productOptions} selectorValues={existing} />];
    });
  }

  function removeProduct(index) {
    productSelectorList.splice(index, 1);
    setProductSelectorList([...productSelectorList]);

    productsList.splice(index, 1);
    setProductsList([...productsList]);
  }

  return (
    <dialog ref={dialogRef} onClose={closeForm}>
      <h1>Нова Поръчка</h1>
      <form method="dialog" onSubmit={handleOnSubmit}>
        <div>
          <input
            value={orderFormData.clientName}
            type="text"
            placeholder="Клиент ..."
            name="clientName"
            id="clientName"
            onChange={(evt) => {
              setOrderFormData((order) => ({
                ...order,
                clientName: evt.target.value,
              }));
            }}
          />{" "}
          <input
            value={orderFormData.pickupDate}
            type="datetime"
            placeholder="За дата ..."
            name="pickupDate"
            id="pickupDate"
            onChange={(evt) => {
              setOrderFormData((order) => ({
                ...order,
                pickupDate: evt.target.value,
              }));
            }}
          />{" "}
          <input
            value={orderFormData.pickupTime}
            type="text"
            placeholder="Час ..."
            name="pickupTime"
            id="pickupTime"
            onChange={(evt) => {
              setOrderFormData((order) => ({
                ...order,
                pickupTime: evt.target.value,
              }));
            }}
          />{" "}
        </div>

        <div>
          <input
            type="tel"
            value={orderFormData.clientPhone}
            placeholder="Телефон ..."
            name="clientPhone"
            id="clientPhone"
            onChange={(evt) => {
              setOrderFormData((order) => ({
                ...order,
                clientPhone: evt.target.value,
              }));
            }}
          />

          <input
            type="number"
            value={orderFormData.advancePaiment}
            name="advance"
            id="advance"
            onChange={(evt) => {
              setOrderFormData((order) => ({
                ...order,
                advancePaiment: evt.target.value,
              }));
            }}
          />

          <label>
            Платена?
            <input
              type="checkbox"
              name="isPaid"
              id="isPaid"
              checked={orderFormData.isPaid}
              onChange={(evt) => {
                setOrderFormData((order) => ({
                  ...order,
                  isPaid: evt.target.checked,
                }));
              }}
            />
          </label>
        </div>

        <ul>
          {productSelectorList.map((el, index) => (
            <li key={index}>
              <div>{el}</div>
              <input
                type="button"
                value="X"
                onClick={() => {
                  removeProduct(index);
                }}
              />
            </li>
          ))}
        </ul>
        <input
          type="button"
          value="Добави"
          onClick={() => {
            addNewProductSelector(new DefaultSelectorValues());
          }}
        />
        <div>
          <input type="button" value="Отказ" onClick={closeForm} />

          <input type="submit" value="Submit" />
        </div>
      </form>
    </dialog>
  );
}

function validateOrder(order) {
  let validationResult = { isValid: false, errors: [] };

  if (order.clientName === "" || order.clientName.length < 3) {
    validationResult.errors.push("Невалидно име на клиент.");
  }
  if (order.pickupDate === "" || !moment(order.pickupDate).isValid()) {
    validationResult.errors.push(
      `Невалидна дата за получаване: ${order.pickupDate} `
    );
  } else {
    order.pickupDate = moment(order.pickupDate).format(
      "YYYY-MM-DDT00:00:00.000"
    );
  }
  if (order.advancePaiment === "") order.advancePaiment = 0;

  const regex = new RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$");
  if (!regex.test(order.pickupTime)) {
    validationResult.errors.push("Невалиден час за получаване");
  }
  order.orderItems.forEach((element, index) => {
    if (element.productId === undefined) {
      validationResult.errors.push(
        `Невалидна стойност за продукт номер ${index + 1}`
      );
    }
    if (element.productAmount <= 0) {
      validationResult.errors.push(
        `Невалидна стойност за количество за продукт номер ${index + 1} - ${
          element.productAmount
        }`
      );
    }
  });

  if (validationResult.errors.length === 0) {
    validationResult.isValid = true;
  }
  return validationResult;
}

function DefaultSelectorValues() {
  this.productId = 1;
  this.productAmount = 0;
  this.cakeFoto = "";
  this.cakeTitle = "";
  this.description = "";
}
