import React, { useState, useContext } from "react";
import ProductSelector from "./ProductSelector";
import AppContext from "../../appContext";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bg } from "date-fns/locale";
import { format, formatISO } from "date-fns";
import Select from "react-select";
import { ordersApi, OrdersService } from "../../API/ordersApi";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteOrderDialog from "../DeleteOrderDialog";
import styles from "./OrderForm.module.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { NotFoundError, UnauthorizedError } from "../../system/errors";
import Dialog from "@mui/material/Dialog";

import ProductsAccordion from "./ProductsAccordion";
import {
  getNewDateWithHours,
  validateOrder,
  getDefaultOrderFormData,
  ProductSelectorValues,
  productsToOptions,
  getHoursOptions,
  clientsToOptions,
} from "./OrderFormHelperFunctions";
import OrderDTO from "../../Types/OrderDTO";
import ProductDTO from "../../Types/ProductDTO";
import ValidationResult from "../../Types/ValidationResult";

export async function orderFormLoader({
  params,
}: {
  params: { method: string; id: number };
}) {
  if (localStorage.getItem("isLogged") === null) {
    //&& !JSON.parse(localStorage.getItem("isLogged"))
    throw new UnauthorizedError();
  }
  let isEdit = params.method === "put";
  let date = new Date();
  let order: OrderDTO;

  if (isEdit) {
    order = await OrdersService.GetOrderAsync(params.id);
    date = new Date(order.pickupDate);
  } else {
    order = getDefaultOrderFormData();
  }
  return {
    order: { ...order, pickupDate: date },
    isEdit,
  };
}

export const textFieldStyle = { backgroundColor: "white", borderRadius: "4px" };

export default function OrderForm() {
  registerLocale("bg", bg);
  const navigate = useNavigate();

  let { isEdit, order } = useLoaderData() as {
    isEdit: boolean;
    order: OrderDTO;
  };
  const [productAccordionOpen, setProductAccordionOpen] = useState(false);
  let { products } = useContext(AppContext); // the products from the DB
  let { clients } = useContext(AppContext); // the clients from the DB
  let productOptions = productsToOptions(products); //options for the ProductSelector component, based on products
  let [orderFormData, setOrderFormData] = useState(order); //setting and getting the values for the form inputs
  let [showDeleteDialog, setShowDeleteDialog] = useState(false); // show/hide confirmation dialog on order delete
  let [validationResult, setValidationResult] = useState({
    isValid: true,
    errors: [],
  } as ValidationResult);
  
  let [productSelectorList, setProductSelectorList] = useState(
    order.orderItems.map((item) => (
      <ProductSelector options={productOptions} selectorValues={new ProductSelectorValues(item)} />
    ))
  ); // list of ProductSelector components added to the OrderForm

  //-- ADD NEW PRODUCT TO ORDER
  /**
   * Dynamically add an input to the order form for an a new order Item with default values
   *
   */
  function addNewProductSelector(selectorValues: ProductSelectorValues) {
    if (!selectorValues) {
      selectorValues = new ProductSelectorValues();
    }
    setProductSelectorList((list) => {
      return [
        ...list,
        <ProductSelector
          options={productOptions}
          selectorValues={selectorValues}
        />,
      ];
    });
  }

  //-- REMOVE PRODUCT FROM ORDER --
  /**
   * Remove an orderItem (productSelector) from the order
   * @param {int} index
   */
  function removeProduct(index: number) {
    productSelectorList.splice(index, 1);
    setProductSelectorList([...productSelectorList]);
  }

  //-- SUBMIT ORDER --
  async function handleSubmit(event: any) {
    event.preventDefault();
    let orderItems = productSelectorList.map(
      (selector) => selector.props.selectorValues
    );

    let newOrder = {
      ...orderFormData,
      orderItems: orderItems,
    };

    const newValidationResult = validateOrder(newOrder);
    setValidationResult(newValidationResult);

    let orderResult: OrderDTO;
    if (!newValidationResult.isValid) {
      console.log(newValidationResult.errors);
    } else {
      if (isEdit && newOrder.id) {
        orderResult = await OrdersService.PutOrderAsync(newOrder.id, newOrder);
      } else {
        orderResult = await OrdersService.PostOrderAsync(newOrder);
      }
      navigate(`/orders/print/${orderResult.id}`);
    }
  }

  function closeForm() {
    navigate("/");
  }

  async function deleteOrder() {
    if (isEdit && orderFormData.id) {
      await ordersApi.deleteOrder(orderFormData.id);
      closeForm();
    }
  }

  const handleProductAccordionClose = () => {
    setProductAccordionOpen(false);
  };

  //-- RETURN HTML --
  return (
    <div className={styles.formContainer}>
      <form>
        <Typography variant="h3">
          {isEdit ? "Редакция на Поръчка" : "Нова Поръчка"}{" "}
          {isEdit && (
            <input
              type="button"
              value="Изтрий"
              onClick={() => setShowDeleteDialog(true)}
            />
          )}
        </Typography>
        {/*//-- Client Text Field */}
        <div className={styles.mainInfo}>
          <TextField
            value={orderFormData.clientName}
            sx={textFieldStyle}
            size="small"
            label="Клиент ..."
            onChange={(evt) => {
              setOrderFormData((orderFormData) => ({
                ...orderFormData,
                clientName: evt.target.value,
              }));
            }}
          />{" "}
          {/*//-- Client Selector */}
          <Select
            options={clientsToOptions(clients)}
            placeholder="Клиент"
            onChange={(option) => {
              if (option) {
                let result = {
                  ...orderFormData,
                  clientId: parseInt(option.value),
                  clientName: option.label,
                };
                setOrderFormData(result);
              }
            }}
          />
          {/*//-- DATE PICKER */}
          <div style={{ display: "inline-block", width: "fit-content" }}>
            <DatePicker
              selected={new Date(orderFormData.pickupDate)}
              locale="bg"
              dateFormat="P"
              onChange={(date) => {
                if (date) {
                  setOrderFormData((orderFormData) => ({
                    ...orderFormData,
                    pickupDate: formatISO(date),
                  }));
                }
              }}
              customInput={<TextField sx={textFieldStyle} size="small" />}
            />
          </div>
          {/*//-- TIME Selector */}
          <Select
            value={getHoursOptions().filter(
              (option) =>
                option.label ===
                format(new Date(orderFormData.pickupDate), "HH:mm")
            )}
            options={getHoursOptions()}
            placeholder="Час ..."
            onChange={(option) => {
              if (option) {
                let result = {
                  ...orderFormData,
                  pickupDate: getNewDateWithHours(
                    new Date(orderFormData.pickupDate),
                    option.value
                  ),
                };
                setOrderFormData(result);
              }
            }}
          />
          {/*//-- PHONE Text Field */}
          <TextField
            size="small"
            type="tel"
            sx={textFieldStyle}
            value={orderFormData.clientPhone}
            label="Телефон"
            onChange={(evt) => {
              setOrderFormData((orderFormData) => ({
                ...orderFormData,
                clientPhone: evt.target.value,
              }));
            }}
          />
          {/*//-- KAPARO Text Field */}
          <TextField
            size="small"
            value={orderFormData.advancePaiment}
            sx={textFieldStyle}
            label="Капаро"
            onChange={(evt) => {
              let result = {
                ...orderFormData,
                advancePaiment: parseFloat(evt.target.value),
              } as OrderDTO;
              setOrderFormData(result);
            }}
          />
          {/*//-- PAID Checkbox */}
          <label>
            Платена?
            <Checkbox
              size="medium"
              color="error"
              checked={orderFormData.isPaid}
              onChange={(evt) => {
                setOrderFormData((orderFormData) => ({
                  ...orderFormData,
                  isPaid: evt.target.checked,
                }));
              }}
            />
          </label>
        </div>
        <hr />
        {/*//-- PRODUCT Selectors */}
        <ul>
          {productSelectorList.map((el, index) => (
            <div key={index}>
              <li className={styles.productListItem}>
                <div style={{ flexGrow: "1", maxWidth: "1025px" }}>{el}</div>
                <Button
                  tabIndex={-1}
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    removeProduct(index);
                  }}
                >
                  X{" "}
                </Button>
              </li>
              <hr />
            </div>
          ))}
        </ul>
        <Button
          variant="outlined"
          onClick={() => {
            addNewProductSelector(new ProductSelectorValues());
          }}
        >
          Добави продукт
        </Button>
        <Button
          sx={{ marginLeft: "5px" }}
          variant="outlined"
          onClick={() => {
            setProductAccordionOpen(true);
          }}
        >
          {" "}
          Избери продукти
        </Button>
        <div className={styles.submitGroup}>
          <Button variant="contained" onClick={closeForm}>
            Откажи
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="secondary">
            Запази
          </Button>
        </div>
        {!validationResult.isValid && (
          <div>
            <h3>Невалидни стойности на поръчката:</h3>
            <ul>
              {validationResult.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <DeleteOrderDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          onDelete={deleteOrder}
        />
      </form>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={productAccordionOpen}
        onClose={handleProductAccordionClose}
      >
        <ProductsAccordion
          products={products}
          addNewProductSelector={addNewProductSelector}
        />
      </Dialog>
    </div>
  );
}
