import React, { useState, useContext } from "react";
import ProductSelector from "./ProductSelector";
import moment from "moment";
import AppContext from "../appContext";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bg } from "date-fns/locale";
import Select from "react-select";
import { getOrder } from "../API/ordersApi";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteOrderDialog from "./DeleteOrderDialog";

export async function orderFormLoader({ params }) {
  let isEdit = params.method === "put";
  let date = new Date();
  let order = {};
  if (isEdit) {
    order = await getOrder(params.id);
    date = new Date(order.pickupDate);
  } else {
    order = getDefaultOrderFormData();
  }
  return {
    order: { ...order, pickupDate: date },
    isEdit,
  };
}


export default function OrderForm() {
  registerLocale("bg", bg);
  const navigate = useNavigate();
  let { isEdit, order } = useLoaderData();
  let { products } = useContext(AppContext); // the products from the DB
  let productOptions = productsToOptions(products); //options for the ProductSelector component, based on products
  let [productSelectorList, setProductSelectorList] = useState(
    order.orderItems.map((item) => (
      <ProductSelector options={productOptions} selectorValues={item} />
    ))
  ); // list of ProductSelector components added to the OrderForm
  let [orderFormData, setOrderFormData] = useState(order);
  let [showDeleteDialog, setShowDeleteDialog] = useState(false);

  function addNewProductSelector(existing) {
    setProductSelectorList((list) => {
      return [
        ...list,
        <ProductSelector options={productOptions} selectorValues={existing} />,
      ];
    });
  }

  function removeProduct(index) {
    productSelectorList.splice(index, 1);
    setProductSelectorList([...productSelectorList]);
  }

  //-- SUBMIT ORDER --
  function handleOnSubmit(event) {
    event.preventDefault();
    let orderItems = productSelectorList.map((selector) => {
      const item = selector.props.selectorValues;
      return item;
    });

    let newOrder = {
      ...orderFormData,
      orderItems: orderItems,
    };

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
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  //-- CLOSE FORM --
  function closeForm(event) {
    navigate("/");
  }

  //-- DELETE ORDER --
  function deleteOrder() {
    fetch(`http://localhost:5257/api/orders/${order.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        
        return console.log("Success:", response);
        closeForm();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //-- RETURN HTML --
  return (
    <form method="post" onSubmit={handleOnSubmit}>
      <h1>
        {isEdit ? "Редакция на Поръчка" : "Нова Поръчка"}{" "}
        {isEdit && (
          <input
            type="button"
            value="Изтрий"
            onClick={()=>setShowDeleteDialog(true)}
          />
        )}
      </h1>
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
        <div style={{ display: "inline-block", width: "fit-content" }}>
          <DatePicker
            selected={orderFormData.pickupDate}
            locale="bg"
            dateFormat="P"
            onChange={(date) =>
              setOrderFormData((order) => ({ ...order, pickupDate: date }))
            }
          />
        </div>
        <Select
          value={getHoursOptions().filter(
            (option) => option.label === orderFormData.pickupTime
          )}
          options={getHoursOptions()}
          placeholder="Час ..."
          onChange={(option) => {
            setOrderFormData((order) => ({
              ...order,
              pickupTime: option.value,
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
      <DeleteOrderDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        onDelete={deleteOrder}
      />
    </form>
  );
}

//-- HELPER FUNCTIONS --
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
    if (element.productId === undefined || element.productId === -1) {
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
  this.productId = -1;
  this.productAmount = 0;
  this.cakeFoto = "";
  this.cakeTitle = "";
  this.description = "";
}

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

function getHoursOptions() {
  let availableHours = ["09:00", "09:30", "10:00", "10:30"];
  let hoursOptions = availableHours.map((hour) => ({
    value: hour,
    label: hour,
  }));
  return hoursOptions;
}

function getDefaultOrderFormData() {
  return {
    operatorId: 0,
    pickupDate: "",
    pickupTime: "",
    clientName: "",
    clientPhone: "",
    isPaid: false,
    advancePaiment: 0,
    orderItems: [],
  };
}
