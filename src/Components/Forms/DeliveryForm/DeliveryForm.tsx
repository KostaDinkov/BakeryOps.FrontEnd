import React from "react";
import {
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
} from "@mui/material";
import {
  DeliveryDTO,
  DeliveryItemDTO,
  MaterialDTO,
  VendorDTO,
} from "../../../Types/types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { parseISO } from "date-fns";
import { customInvalidProps } from "../../../system/utils";
import styles from "./DeliveryForm.module.css";
import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import { DeliveryFormType } from "./deliverySchema";
import { useFormData } from "../../../Providers/FormDataProvider";
import RHFAutocomplete from "../../RHFOrderForm/RHFAutocomplete";


export default function DeliveryForm({data}:Record<string,any>) {
  const { register, formState, control } = useFormContext<DeliveryFormType>();
  
  const vendors = data?.data?.vendors || [];
  const materials = data?.data?.materials || [];
  const { append, remove, fields } = useFieldArray({ control, name: "items" });

  return (
    <div className={styles.deliveryForm}>
      <div className={styles.deliveryInfo}>
        {/* //-- VENDOR */}
        <RHFAutocomplete<VendorDTO & { id: string }, DeliveryFormType>
          control={control}
          name="vendorId"
          options={vendors}
          getOptionLabel={(option) => option.name}
          size="small"
        />
        {/* //-- DOCUMENT DATE */}
        <Controller
          control={control}
          name="deliveryDate"
          render={({ field }) => (
            <DatePicker
              label="Дата на документ"
              value={(field.value && parseISO(field.value))|| null}
              onChange={(date) => {
                field.onChange(date?.toISOString());
              }}
              slotProps={{ textField: { size: "small" } }}
            />
          )}
        />

        {/* //-- DOCUMENT NUMBER */}
        <Controller
          control={control}
          name="invoiceNumber"
          render={({ field }) => (
            <TextField {...field} size="small" label="Номер на документ" />
          )}
        />

        {/* //-- NOTES */}
        <div className={styles.fullGridRow}>
          <Controller
            control={control}
            name="notes"
            render={({ field }) => (
              <TextField {...field} label="Бележки" size="small" fullWidth />
            )}
          />
        </div>
      </div>

      {/* //-- MATERIALS */}
      <MaterialFields fields={fields} materials={materials} control={control} remove={remove} />
      
      {/* //-- ADD MATERIAL BUTTON */}
      <Button
        size="medium"
        variant="outlined"
        onClick={() => append({ materialId: "", quantity: 0, unitPrice: 0 })}
        >Добави</Button>
    </div>
  );
}

function MaterialFields({
  fields,
  materials,
  control,
  remove
}: {
  fields: FieldArrayWithId<DeliveryItemDTO>[];
  materials: MaterialDTO[];
  control: Control<DeliveryFormType, any>;
  remove:UseFieldArrayRemove
}) {
  return(
  <div className={styles.deliveryList}>
  {fields.map((field, index) => (
    
      <div className={styles.deliveryRowWithDelete}>
        <div key={field.id} className={styles.deliveryRow}>
          {/* //--PRODUCT NAME */}
          <RHFAutocomplete<MaterialDTO & { id: string }, DeliveryFormType>
            className={styles.item}
            size="small"
            options={materials}
            getOptionLabel={(option) => option.name || ""}
            name={`items.${index}.materialId`}
            control={control}
          />
          {/* //--PRODUCT QUANTITY */}
          <Controller
            control={control}
            name={`items.${index}.quantity`}
            render={({ field }) => (
              <TextField
                {...field}
                className={styles.quantity}
                size="small"
                label="Количество"
                type="number"
                slotProps={{ htmlInput: { step: "1" } }}
              />
            )}
          />
          {/* //--PRODUCT UNIT PRICE */}
          <Controller
            control={control}
            name={`items.${index}.unitPrice`}
            render={({ field }) => (
              <TextField
                {...field}
                className={styles.price}
                size="small"
                label="Единична цена"
                type="number"
                slotProps={{ htmlInput: { step: "0.01" } }}
              />
            )}
          />
          {/* //--PRODUCT LOT */}
          <Controller
            control={control}
            name={`items.${index}.lotNumber`}
            render={({ field }) => (
              <TextField
                {...field}
                className={styles.lot}
                size="small"
                label="Партиден номер"
                type="text"
              />
            )}
          />
          {/* //--PRODUCT EXPIRATION DATE */}
          <Controller
            control={control}
            name={`items.${index}.expirationDate`}
            render={({ field }) => (
              <DatePicker
                label="Срок на годност"
                value={(field.value && parseISO(field.value)) || null}
                onChange={(date) => {
                  field.onChange(date?.toISOString());
                }}
                slotProps={{ textField: { size: "small" } }}
              />
            )}
          />
          {/* //--PRODUCT NOTES */}
          <Controller
            control={control}
            name={`items.${index}.notes`}
            render={({ field }) => (
              <TextField
                className={styles.notes}
                size="small"
                label="Бележка"
                type="text"
              />
            )}
          />
      
        </div>
         <Button
         size="small"
         variant="contained"
         color="error"
         onClick={() => remove(index)}
         >Премахни</Button>
      </div>
  ))}
  </div>
  )
}
