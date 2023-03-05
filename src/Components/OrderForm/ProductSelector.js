import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import styles from "./ProductSelector.module.css";
import TextField from "@mui/material/TextField";
import { textFieldStyle } from "./OrderForm";

export const selectorStyles = {
  control: (styles) => ({
    ...styles,
   
    borderColor: "rgba(0, 0, 0, 0.23);",
    minHeight:"40px",
    flexGrow:"1"
  }),
};

export default function ProductSelector({ options, selectorValues }) {
  let [productId, setProductId] = useState(-1);
  let [productAmount, setProductAmount] = useState(0);
  let [cakeTitle, setCakeTitle] = useState("");
  let [cakeFoto, setCakeFoto] = useState("");
  let [description, setDescription] = useState("");

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
    stringify: (option) => `${option.label} ${option.data.code}`,
    matchFrom: "any",
  };

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.productRow}>
        <div className={styles.selectWrapper}>
          <Select
            value={options.filter((option) => option.value === productId)}
            placeholder="Продукт ..."
            options={options}
            filterOption={createFilter(filterConfig)}
            onChange={(option) => {
              setProductId(option.value);
              selectorValues.productId = option.value;
            }}
            styles={selectorStyles}
            style
            required
          />
        </div>
        <div>
          <TextField
            value={productAmount}
            label="Количество"
            sx={{...textFieldStyle, width:"100px"}}
            size="small"
            type="number"
            required
            onChange={(evt) => {
              setProductAmount(evt.target.value);
              selectorValues.productAmount = evt.target.value;
            }}
          />
        </div>
        
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
            sx={{...textFieldStyle, width:"70px"}}
            type="text"
            placeholder="Фото"
            size="small"
            onChange={(evt) => {
              setCakeFoto(evt.target.value);
              selectorValues.cakeFoto = evt.target.value;
            }}
          />
        
      </div>

      <TextField
        size="small"
        sx={textFieldStyle}
        value={description}
        type="text"
        placeholder="Забележка..."
        multiline
        onChange={(evt) => {
          setDescription(evt.target.value);
          selectorValues.description = evt.target.value;
        }}
      />
      
    </div>
  );
}
