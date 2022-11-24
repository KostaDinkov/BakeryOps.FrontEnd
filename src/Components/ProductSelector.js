import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";

export default function ProductSelector({ options, selectorValues }) {
  let [productId, setProductId] = useState(-1);
  let [productAmount, setProductAmount] = useState(0);
  let [cakeTitle, setCakeTitle] = useState("");
  let [cakeFoto, setCakeFoto] = useState("");
  let [description, setDescription] = useState("");
  //let [id, setId]= useState(-1); //orderItem id in DB

  useEffect(() => {
    if (selectorValues !== undefined) {
      setProductId(selectorValues.productId);
      setProductAmount(selectorValues.productAmount);
      setCakeTitle(selectorValues.cakeTitle);
      setCakeFoto(selectorValues.cakeFoto);
      setDescription(selectorValues.description);
      //setId(existing.id)
    } 
  },[selectorValues]);

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: false,
    stringify: (option) => `${option.label} ${option.data.code}`,
    matchFrom: "any",
  };

  return (
    <>
      <Select
        value={options.filter((option) => option.value === productId)}
        placeholder="Продукт ..."
        options={options}
        filterOption={createFilter(filterConfig)}
        onChange={(option) => {
          setProductId(option.value);
          selectorValues.productId = option.value;
        }}
        name={`pid${productId}`}
        required
      />
      <input
        value={productAmount}
        
        type="number"
        placeholder="Количество"
        required
        name={`${productId}-amount`}
        onChange={(evt) => {
          setProductAmount(evt.target.value);
          selectorValues.productAmount = evt.target.value;
        }}
      />{" "}
      <input
        value={cakeTitle}
        type="text"
        placeholder="Надпис за торта ..."
        name={`${productId}-cakeTitle`}
        onChange={(evt) => {
          setCakeTitle(evt.target.value);
          selectorValues.cakeTitle = evt.target.value;
        }}
      />{" "}
      <input
        value={cakeFoto}
        type="text"
        placeholder="Фото ..."
        name={`${productId}-cakeFoto`}
        onChange={(evt) => {
          setCakeFoto(evt.target.value);
          selectorValues.cakeFoto = evt.target.value;
        }}
      />{" "}
      <div>
        <input
          value={description}
          type="text"
          placeholder="Забележка ..."
          name={`${productId}-description`}
          onChange={(evt) => {
            setDescription(evt.target.value);
            selectorValues.description = evt.target.value;
          }}
        />{" "}
      </div>
    </>
  );
}
