import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";

export default function ProductSelector({ options, onChange, index, existing }) {
  let [productId, setProductId] = useState(-1);
  let [productAmount, setProductAmount] = useState(0);
  let [cakeTitle, setCakeTitle] = useState("");
  let [cakeFoto, setCakeFoto] = useState("");
  let [description, setDescription] = useState("");
  let [id, setId]= useState(-1)

  useEffect(()=>{
    if(existing !== undefined){
      setProductId(existing.productId);
      setProductAmount(existing.productAmount);
      setCakeTitle(existing.cakeTitle);
      setCakeFoto(existing.cakeFoto);
      setDescription(existing.description)
      setId(existing.id)
    }
  },[])
 

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: false,
    stringify: (option) => `${option.label} ${option.data.code}`,
    matchFrom: "any",
  };

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange({index, productId, productAmount, description, cakeTitle, cakeFoto, id});
    }
  }, [productId, productAmount, description, cakeTitle, cakeFoto]);

  return (
    <>
      <Select
        value = {options.filter(option=>option.value === productId)}
        placeholder="Продукт ..."
        options={options}
        filterOption={createFilter(filterConfig)}
        onChange={(option) => {setProductId(option.value)}}
        required
      />

      <input
        value = {productAmount}
        type="number"
        placeholder="Количество"
        required
        name="prodAmount"
        onChange={(evt)=>{setProductAmount(evt.target.value)}}
      />{" "}
      
      <input
        value={cakeTitle}
        type="text"
        placeholder="Надпис за торта ..."
        name="cakeTitle"
        onChange={(evt)=>{setCakeTitle(evt.target.value)}}
      />{" "}
      
      <input
        value={cakeFoto}
        type="text"
        placeholder="Фото ..."
        name="cakeFoto"
        onChange={(evt)=>{setCakeFoto(evt.target.value)}}
      />{" "}
      
      <div>
        <input
          value={description}
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
