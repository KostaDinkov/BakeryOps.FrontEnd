import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./OrderForm.module.css";
import DatePicker from "react-datepicker";
import {
  getHoursOptions,
  getNewDateWithHours,
  getOrderTimeOrDefault,
  getStringFromDate,
  ProductSelectorValues,
  productsToOptions,
} from "./OrderFormHelperFunctions";
import { useState } from "react";
import type { OrderDTO, OrderItemDTO } from "../../../Types/types.d.ts";
import DeleteOrderDialog from "./DeleteOrderDialog.tsx";
import ProductsAccordion from "./ProductsAccordion.tsx";
import type { ClientDTO } from "../../../Types/types.d.ts";
import Product from "../../../Types/ProductDTO.ts";
import ProductSelector from "./ProductSelector.tsx";
import { set } from "date-fns";

export default function OrderForm({
  order,
  clients,
  products,
}: {
  order: OrderDTO;
  clients: ClientDTO[];
  products: Product[];
}) {
  const isEdit = !!order;
  const defaultFormData: {
    id: number;
    status: number;
    clientId: string;
    clientName: string;
    clientPhone: string;
    pickupDate: string;
    isPaid: boolean;
    advancePaiment: number;
    orderItems: { key: string; value: OrderItemDTO };
  } = {
    id: 0,
    status: 0,
    clientId: "",
    clientName: "",
    clientPhone: "",
    pickupDate: new Date().toISOString(),
    isPaid: false,
    advancePaiment: 0,
    orderItems: {},
  };
  function formDataFromOrder(order: OrderDTO): typeof defaultFormData {
    return {
      id: order.id ?? crypto.randomUUID(),
      status: order.status,
      clientId: order.clientId.toString(),
      clientName: order.clientName,
      clientPhone: order.clientPhone,
      pickupDate: order.pickupDate,
      isPaid: order.isPaid,
      advancePaiment: order.advancePaiment,
      orderItems: order.orderItems.reduce((acc, item) => {
        acc[item.productId] = item;
        return acc;
      }, {}),
    };
  }
  const [orderFormData, setOrderFormData] = useState(order ?? defaultFormData);
  let [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [productAccordionOpen, setProductAccordionOpen] = useState(false);
  const handleProductAccordionClose = () => {
    setProductAccordionOpen(false);
  };
  //-- ADD NEW PRODUCT TO ORDER
  /**
   * Dynamically add an input to the order form for an a new order Item with default values
   *
   */
  function addNewProductSelector(selectorValues: ProductSelectorValues) {
    if (!selectorValues) {
      selectorValues = new ProductSelectorValues();
    }
    setOrderFormData((orderFormData) => {
      return {
        ...orderFormData,
        orderItems: [...(orderFormData.orderItems || []), selectorValues],
      };
    });
  }
  function removeItem(productId: string | undefined) {
    setOrderFormData((orderFormData) => {
      return {
        ...orderFormData,
        orderItems: orderFormData.orderItems?.filter(
          (item) => item.productId !== productId
        ),
      };
    });
  }

  return (
    <div className={styles.formContainer}>
      <form>
        <Typography variant="h3">
          {isEdit ? "Редакция на Поръчка" : "Нова Поръчка"}{" "}
          {isEdit && (
            <input
              data-test="OrderForm-deleteBtn"
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
            size="small"
            label="Клиент ..."
            data-test="OrderForm-clientNameInput"
            onChange={(evt) => {
              setOrderFormData((orderFormData) => ({
                ...orderFormData,
                clientName: evt.target.value,
              }));
            }}
          />{" "}
          {/*//-- Client Selector */}
          <Autocomplete
            options={clients.map((c) => ({ label: c.name, value: c.id }))}
            renderInput={(params) => <TextField {...params} label="Клиент" />}
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
              data-test="OrderForm-datePicker"
              onChange={(date) => {
                if (date) {
                  setOrderFormData((orderFormData) => ({
                    ...orderFormData,
                    pickupDate: getStringFromDate(date),
                  }));
                }
              }}
              customInput={<TextField size="small" />}
            />
          </div>
          {/*//-- TIME Selector */}
          <div data-test="OrderForm-timeSelector">
            <Autocomplete
              value={getOrderTimeOrDefault(orderFormData.pickupDate)}
              options={getHoursOptions()}
              renderInput={(params) => <TextField {...params} label="Час" />}
              onChange={(event, option) => {
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
          </div>
          {/*//-- PHONE Text Field */}
          <TextField
            size="small"
            type="tel"
            value={orderFormData.clientPhone}
            label="Телефон"
            data-test="OrderForm-phoneInput"
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
            value={orderFormData.advancePaiment || ""}
            label="Капаро"
            data-test="OrderForm-kaparoInput"
            type="number"
            onChange={(evt) => {
              let kaparo = parseFloat(evt.target.value);
              if (!Object.is(kaparo, NaN)) {
                setOrderFormData({
                  ...orderFormData,
                  advancePaiment: kaparo,
                });
              } else {
                setOrderFormData({
                  ...orderFormData,
                  advancePaiment: 0,
                });
              }
            }}
          />
          {/*//-- PAID Checkbox */}
          <label>
            Платена?
            <Checkbox
              size="medium"
              color="error"
              checked={orderFormData.isPaid ?? false}
              data-test="OrderForm-paidCheckbox"
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
          {orderFormData.orderItems &&
            orderFormData.orderItems.map((item, index) => (
              <div key={item.productId}>
                <li className={styles.productListItem}>
                  <div style={{ flexGrow: "1", maxWidth: "1025px" }}>
                    <ProductSelector
                      options={productsToOptions(products)}
                      item={item}
                      setOrderFormData={setOrderFormData}
                    />
                  </div>
                  <Button
                    tabIndex={-1}
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      removeItem(item.productId);
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
          data-test="OrderForm-addProductBtn"
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
          <Button variant="contained" onClick={() => {}}>
            Откажи
          </Button>

          <Button
            variant="contained"
            onClick={() => {}}
            color="secondary"
            data-test="OrderForm-submitBtn"
          >
            Запази
          </Button>
        </div>
        {/* {!validationResult.isValid && (
          <div>
            <h3>Невалидни стойности на поръчката:</h3>
            <ul>
              {validationResult.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )} */}
        <DeleteOrderDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          onDelete={() => {}}
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
