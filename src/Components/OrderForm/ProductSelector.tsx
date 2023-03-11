import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import styles from "./ProductSelector.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { textFieldStyle } from "./OrderForm";
import SelectorOption from "../../Types/SelectorOptions";
import { ProductSelectorValues } from "./OrderFormHelperFunctions";

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
  selectorValues,
}: {
  options: SelectorOption[];
  selectorValues: ProductSelectorValues;
}) {
  let [productId, setProductId] = useState(-1);
  let [productAmount, setProductAmount] = useState(0);
  let [cakeTitle, setCakeTitle] = useState("");
  let [cakeFoto, setCakeFoto] = useState("");
  let [description, setDescription] = useState("");
  let [showDescription, setShowDescription] = useState(selectorValues.description!=="");
  let [showDescriptionDisabled, setShowDescriptionDisabled] = useState(selectorValues.description!=="");

  useEffect(() => {
    if (selectorValues !== undefined) {
      setProductId(selectorValues.productId);
      setProductAmount(selectorValues.productAmount);
      setCakeTitle(selectorValues.cakeTitle);
      setCakeFoto(selectorValues.cakeFoto);
      setDescription(selectorValues.description);
      
      
    }
  }, [selectorValues]);

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: false,
    //React select option has a specific shape. Custom properties are stored in the data object
    stringify: (option:{label:string, value:string, data:any} ) => `${option.label} ${option.data.code}`,
    matchFrom: "any" as const,
  };

  const isCakeCategory = (category: string): boolean => {
    if (category.toLowerCase().includes("торта")) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.productRow}>
        <div className={styles.selectWrapper}>
          <Select
            value={options.filter(
              (option) => option.value === productId.toString()
            )}
            placeholder="Продукт ..."
            options={options}
            filterOption={createFilter(filterConfig)}
            onChange={(option) => {
              if (option) {
                setProductId(parseInt(option.value));
                selectorValues.productId = parseInt(option.value);
                selectorValues.productCategory = option.category || "";
              }
            }}
            styles={selectorStyles}
            required
          />
        </div>
        <div>
          <TextField
            value={productAmount}
            label="Количество"
            sx={{ ...textFieldStyle, width: "100px" }}
            size="small"
            type="number"
            required
            onChange={(evt) => {
              setProductAmount(parseFloat(evt.target.value));
              selectorValues.productAmount = parseFloat(evt.target.value);
            }}
          />
        </div>
        {isCakeCategory(selectorValues.productCategory) && (
          <>
            <TextField
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
          checked={showDescription}
          disabled={showDescriptionDisabled}
          onChange={(evt, checked) => setShowDescription(!showDescription)}
        />
      </div>

      {showDescription &&<TextField
        size="small"
        sx={textFieldStyle}
        value={description}
        type="text"
        placeholder="Забележка..."
        multiline
        onChange={(evt) => {
          setDescription(evt.target.value);
          selectorValues.description = evt.target.value;
          setShowDescriptionDisabled(selectorValues.description!=="");
        }}
      />}
    </div>
  );
}
