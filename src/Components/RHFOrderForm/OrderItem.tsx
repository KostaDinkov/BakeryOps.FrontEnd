import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import RHFAutocomplete from "./RHFAutocomplete";
import { OrderItemDTO, ProductDTO } from "../../Types/types";
import {
  Control,
  FormState,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { type OrderFormSchemaType } from "./formSchema";
import { useState } from "react";
import { set } from "date-fns";

export default function OrderItems({
  remove,
  useFormMethods,
  products,
  index,
  field,
}: {
  remove: UseFieldArrayRemove;
  useFormMethods: {
    register: UseFormRegister<OrderFormSchemaType>;
    formState: FormState<OrderFormSchemaType>;
    control: Control<OrderFormSchemaType>;
  };
  products: ProductDTO[];
  index: number;
  field: OrderItemDTO & { id: string };
}) {
    
    const [isCakeCategory, _setIsCakeCategory] = useState<boolean>(false);
    const [showNote, setShowNote] = useState<boolean>(false);
    const setIsCakeCategory = (product: ProductDTO) => {
        if (product.category?.toLowerCase().includes("торта")) {
            console.log("is cake category");
          _setIsCakeCategory(true);
          return;
        }
          
        _setIsCakeCategory(false);
    };
  return (
    <>
      <RHFAutocomplete
        control={useFormMethods.control}
        label="Изберете продукт"
        name={`orderItems.${index}.productId`}
        customOnChange={(option) => {setIsCakeCategory(option)}}
        getOptionLabel={(option: ProductDTO) => option.name}
        options={products}
      />
      <TextField
        label="Количество"
        {...useFormMethods.register(`orderItems.${index}.productAmount`, {
          valueAsNumber: true,
        })}
        error={
          !!useFormMethods.formState.errors.orderItems?.[index]?.productAmount
        }
        helperText={
          useFormMethods.formState.errors.orderItems?.[index]?.productAmount
            ?.message
        }
      />
      {isCakeCategory&& <>
          <TextField
            label="Фото №"
            {...useFormMethods.register(`orderItems.${index}.cakeFoto`)}
            error={!!useFormMethods.formState.errors.orderItems?.[index]?.cakeFoto}
            helperText={
              useFormMethods.formState.errors.orderItems?.[index]?.cakeFoto?.message
            }
          />
          <TextField
            label="Надпис на тортата"
            {...useFormMethods.register(`orderItems.${index}.cakeTitle`)}
            error={!!useFormMethods.formState.errors.orderItems?.[index]?.cakeTitle}
            helperText={
              useFormMethods.formState.errors.orderItems?.[index]?.cakeTitle
                ?.message
            }
          />
      </>}
      <FormControlLabel
          value="bottom"
          control={<Checkbox checked={showNote} onChange={()=>setShowNote(!showNote)}/>}
          
          label="Бележка?"
          labelPlacement="start"
        />
      {showNote && <TextField
        {...useFormMethods.register(`orderItems.${index}.description`)}
        label="Бележка"
        error={
          !!useFormMethods.formState.errors.orderItems?.[index]?.description
        }
        helperText={
          useFormMethods.formState.errors.orderItems?.[index]?.description
            ?.message
        }
      />}
      <button type="button" onClick={() => remove(index)}>
        Delete
      </button>
    </>
  );
}
