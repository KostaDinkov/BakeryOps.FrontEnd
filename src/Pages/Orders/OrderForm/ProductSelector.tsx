import React, { useEffect, useState, useContext } from "react";
import styles from "./ProductSelector.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { textFieldStyle } from "./OrderFormController";
import SelectorOption from "../../../Types/SelectorOptions";
import { ProductSelectorValues } from "./OrderFormHelperFunctions";
import { Autocomplete } from "@mui/material";
import type { OrderDTO } from "../../../Types/types";
import type {OrderItemDTO} from "../../../Types/types";
import { set } from "date-fns";

export const selectorStyles = {
  control: (styles: any) => ({
    ...styles,

    borderColor: "rgba(0, 0, 0, 0.23);",
    minHeight: "40px",
    flexGrow: "1",
  }),
};

export default function ProductSelector({
  options,
  item,
  setOrderFormData
}: {
  options: SelectorOption[];
  item: OrderItemDTO;
  setOrderFormData: React.Dispatch<React.SetStateAction<OrderDTO>>;
}) {


  let [showDescription, setShowDescription] = useState(
    !!item?.description
  );
  let [showDescriptionDisabled, setShowDescriptionDisabled] = useState(
    !!item?.description
  );


  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: false,
    //React select option has a specific shape. Custom properties are stored in the data object
    stringify: (option: { label: string; value: string; data: any }) =>
      `${option.label} ${option.data.code}`,
    matchFrom: "any" as const,
  };

  const filterOptions = (
    candidate: { label: string; value: string; data: any },
    input: string
  ) => {
    if (input) {
      //filter by code
      if (input.startsWith(".")) {
        let name = candidate.label.toLowerCase().replaceAll(/["“\.-]/g, "");
        let parts = input.slice(1).trim().split(" ");
        for (let part of parts) {
          if (!name.includes(part.toLowerCase())) {
            return false;
          }
        }
        return true;
      } else {
        return candidate.data.code.startsWith(input.trim());
      }
    }
    return true;
  };

  const setProductAmount = (quantity: number) => {
    item.productAmount = quantity;
    setOrderFormData((orderFormData:OrderDTO) => {
      const itemIndex = orderFormData.orderItems?.findIndex(i=>i.productId === item.productId);
      if(itemIndex === -1){
        return orderFormData;
      }
      const newOrderFormData = {
        ...orderFormData,
        orderItems: [
          ...orderFormData.orderItems
        ],
      };
      newOrderFormData.orderItems[itemIndex] = {
        ...newOrderFormData.orderItems[itemIndex],
        productAmount: quantity,
      };
      return newOrderFormData;
    }
    );
  }
  

  const isCakeCategory = (category: string): boolean => {
    if (category.toLowerCase().includes("торта")) {
      return true;
    }
    return false;
  };

  const handleProductChange = (option) => {
    if (option) {
      setOrderFormData((orderFormData:OrderDTO) => {
        const itemIndex = orderFormData.orderItems?.findIndex(i=>i.productId === item.productId);
        if(itemIndex === -1){
          return orderFormData;
        }
        const newOrderFormData = {
          ...orderFormData,
          orderItems: [
            ...orderFormData.orderItems
          ],
        };
        newOrderFormData.orderItems[itemIndex] = {
          ...newOrderFormData.orderItems[itemIndex],
          productId: option.value,
        };
        return newOrderFormData;
      });
    }
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.productRow}>
        <div
          className={styles.selectWrapper}
          data-field="productNameField"
          data-test="ProductSelector-productSelector"
        >
          <Autocomplete
            value={options.filter(
              (option) => option.value === item.productId?.toString()
            )}
            renderInput={(params) => <TextField {...params} label="Продукт" />}
            options={options}
            filterOption={filterOptions}
            onChange={handleProductChange}
            styles={selectorStyles}
            required
          />
        </div>
        <div>
          <TextField
            data-test="ProductSelector-amountInput"
            value={item.productAmount || ""}
            label="Количество"
            sx={{ ...textFieldStyle, width: "100px" }}
            size="small"
            type="number"
            required
            onChange={(evt) => {
              let quantity = parseFloat(evt.target.value);
              if (!Object.is(quantity, NaN)) {
                setProductAmount(quantity);
                item.productAmount = quantity;
              } else {
                setProductAmount(0);
                item.productAmount = 0;
              }
            }}
          />
        </div>
        {isCakeCategory(item.productCategory) && (
          <>
            <TextField
              data-test="ProductSelector-cakeTitleInput"
              value={cakeTitle}
              type="text"
              sx={textFieldStyle}
              label="Надпис за торта"
              size="small"
              onChange={(evt) => {
                setCakeTitle(evt.target.value);
                selectorValues.cakeTitle = evt.target.value;
              }}
            />

            <TextField
              value={cakeFoto}
              data-test="ProductSelector-cakeFotoInput"
              sx={{ ...textFieldStyle, width: "70px" }}
              type="text"
              placeholder="Фото"
              size="small"
              onChange={(evt) => {
                setCakeFoto(evt.target.value);
                selectorValues.cakeFoto = evt.target.value;
              }}
            />
          </>
        )}
        Бележка?{" "}
        <Checkbox
          data-test="ProductSelector-descriptionCheckBox"
          checked={showDescription}
          disabled={showDescriptionDisabled}
          onChange={(evt, checked) => setShowDescription(!showDescription)}
          tabIndex={-1}
        />
      </div>

      {showDescription && (
        <TextField
          data-test="ProductSelector-descriptionInput"
          size="small"
          sx={textFieldStyle}
          value={description}
          type="text"
          placeholder="Забележка..."
          multiline
          onChange={(evt) => {
            setDescription(evt.target.value);
            selectorValues.description = evt.target.value;
            setShowDescriptionDisabled(selectorValues.description !== "");
          }}
        />
      )}
    </div>
  );
}
