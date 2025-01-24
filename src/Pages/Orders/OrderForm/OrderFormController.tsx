import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ProductSelector from "./ProductSelector";
import  { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bg } from "date-fns/locale";
import { OrdersService } from "../../../API/ordersApi";
import { useNavigate, useParams } from "react-router-dom";
import PubSub from "pubsub-js";

import {
  getNewDateWithHours,
  validateOrder,
  getDefaultOrderFormData,
  ProductSelectorValues,
  productsToOptions,
  getHoursOptions,
  clientsToOptions,
  getOrderTimeOrDefault,
  getItemUnitPrice,
  getStringFromDate,
} from "./OrderFormHelperFunctions";
import OrderDTO from "../../../Types/OrderDTO";
import ValidationResult from "../../../Types/ValidationResult";
import OrderItemDTO from "../../../Types/OrderItemDTO";
import { apiClient } from "../../../API/apiClient";
import { handleApiResponse } from "../../../API/apiUtils";
import OrderForm from "./OrderForm";

export const textFieldStyle = { backgroundColor: "white", borderRadius: "4px" };

export default function OrderFormController() {
  registerLocale("bg", bg);
  const navigate = useNavigate();
  const { id } = useParams();
  let isEdit = !!id;
  
  const orderQuery = useQuery({
    queryKey: ["order", "id"],
    queryFn: async () =>
      handleApiResponse(async () =>
        apiClient.GET("/api/Orders/{id}", {
          params: { path: { id: Number(id) } },
        })
      ),
      enabled:isEdit
  });

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async ()=> handleApiResponse(async()=> apiClient.GET("/api/Products/GetAllProducts")),

      enabled:true
  });

  const clientsQuery = useQuery({
    queryKey: ["clients"],
    queryFn: async () =>
      handleApiResponse(async () => apiClient.GET("/api/Clients")),
    enabled:true
  });

  let [orderFormData, setOrderFormData] = useState(orderQuery.data??getDefaultOrderFormData()); //setting and getting the values for the form inputs
   // show/hide confirmation dialog on order delete
  let [validationResult, setValidationResult] = useState({
    isValid: true,
    errors: [],
  } as ValidationResult);

// list of ProductSelector components added to the OrderForm

  // useEffect(() => {
  //   focusNewSelector();
  // }, [productSelectorList]);

 

  // function focusNewSelector() {
  //   let allProductNameFields = [
  //     ...document.querySelectorAll('[data-field="productNameField"]'),
  //   ];

  //   if (allProductNameFields.length > 0) {
  //     let input = allProductNameFields
  //       .pop()
  //       ?.querySelector("input") as HTMLInputElement;

  //     input.focus();
  //   }
  // }

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
    let orderItems: OrderItemDTO[] = productSelectorList.map(
      (selector) => selector.props.selectorValues
    );

    let newOrder: OrderDTO = {
      ...orderFormData,
      orderItems: orderItems,
    };

    const newValidationResult = validateOrder(newOrder);
    setValidationResult(newValidationResult);
    //calculate and assign item unit prices
    newOrder.orderItems.forEach((item) => {
      let client = clientsQuery.data.find((c) => c.id === newOrder.clientId);
      item.itemUnitPrice = getItemUnitPrice(item, products, client);
    });

    let orderResult: OrderDTO;
    if (!newValidationResult.isValid) {
      console.log(newValidationResult.errors);
    } else {
      if (isEdit && newOrder.id) {
        orderResult = await OrdersService.PutOrderAsync(newOrder.id, newOrder);
      } else {
        orderResult = await OrdersService.PostOrderAsync(newOrder);
      }
      PubSub.publish("SendUpdateOrders");
      navigate(`/orders/print/${orderResult.id}`);
    }
  }

  function closeForm() {
    navigate(-1);
  }

  async function deleteOrder() {
    if (isEdit && orderFormData.id) {
      await OrdersService.DeleteOrderAsync(orderFormData.id);
      PubSub.publish("SendUpdateOrders");
      closeForm();
    }
  }

  if (clientsQuery.isLoading || productsQuery.isLoading || orderQuery.isLoading)
    return <div>Loading...</div>;
  
  if (clientsQuery.isError || productsQuery.isError || orderQuery.isError) return <div>Error...</div>;
  
  console.group("Data from queries");
  console.log("order", orderQuery.data);
  console.log("clients", clientsQuery.data);
  console.log("products", productsQuery.data);
  console.groupEnd();
  //-- RETURN HTML --
  return (
    <OrderForm order={orderQuery.data} clients={clientsQuery.data} products={productsQuery.data}/>
  );
}
