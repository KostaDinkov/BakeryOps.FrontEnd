import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";

export default function ProductSelector({ options, onChange, index }) {
  let [productId, setProductId] = useState(undefined);
  let [productAmount, setProductAmount] = useState();
  let [cakeTitle, setCakeTitle] = useState();
  let [cakeFoto, setCakeFoto] = useState();
  let [description, setDescription] = useState();

  const updateProductId = (option) => {
    setProductId(option.value);
  };

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: false,
    stringify: (option) => `${option.label} ${option.data.code}`,
    matchFrom: "any",
  };

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange({index, productId, productAmount, description, cakeTitle, cakeFoto });
    }
  }, [productId, productAmount, description, cakeTitle, cakeFoto]);

  return (
    <>
      <Select
        placeholder="Продукт ..."
        options={options}
        filterOption={createFilter(filterConfig)}
        onChange={updateProductId}
        required
      />
      <input
        type="number"
        placeholder="Количество"
        required
        name="prodAmount"
        onChange={(evt)=>{setProductAmount(evt.target.value)}}
      />{" "}
      <input
        type="text"
        placeholder="Надпис за торта ..."
        name="cakeTitle"
        onChange={(evt)=>{setCakeTitle(evt.target.value)}}
      />{" "}
      <input
        type="text"
        placeholder="Фото ..."
        name="cakeFoto"
        onChange={(evt)=>{setCakeFoto(evt.target.value)}}
      />{" "}
      <div>
        <input
          type="text"
          placeholder="Забележка ..."
          name="description"
          onChange={(evt)=>{setDescription(evt.target.value)}}
        />{" "}
      </div>
      <input type="button" value="X" />
    </>
  );
}
