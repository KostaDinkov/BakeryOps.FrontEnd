//TODO fix mui errors

import {
  TextField,
  Button,
} from "@mui/material";
import {
  DeliveryItemDTO,
  MaterialDTO,
  VendorDTO,
} from "../../../Types/types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { parseISO } from "date-fns";
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
import RHFAutocomplete from "../../RHFOrderForm/RHFAutocomplete";
import DeleteButton from "../../Buttons/DeleteButton/DeleteButton";


export default function DeliveryForm({data}:Record<string,any>) {
  const { register, formState, control } = useFormContext<DeliveryFormType>();
  
  const vendors = data?.vendors || [];
  const materials = data?.materials || [];
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
          label="Доставчик"
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
            <TextField 
              {...field} 
              size="small" 
              label="Номер на документ" 
              value={field.value || ""} // ensure controlled input
            />
          )}
        />

        {/* //-- NOTES */}
        <div className={styles.fullGridRow}>
          <Controller
            control={control}
            name="notes"
            render={({ field }) => (
              <TextField {...field} 
                label="Бележки" 
                size="small" 
                fullWidth 
                value={field.value || ""} // ensure controlled input
                />
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
    
      <div key={field.id} className={styles.deliveryRowWithDelete}>
        <div className={styles.deliveryRow}>
          {/* //--PRODUCT NAME */}
          <RHFAutocomplete<MaterialDTO & { id: string }, DeliveryFormType>
            className={styles.item}
            size="small"
            options={materials}
            getOptionLabel={(option) => option.name || ""}
            name={`items.${index}.materialId`}
            control={control}
            label="Стока"
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
                value={field.value || ""}
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
                {...field}
                value={field.value || ""}
                className={styles.notes}
                size="small"
                label="Бележка"
                type="text"
              />
            )}
          />
        </div>
         <DeleteButton onClick={() => remove(index)} />
      </div>
  ))}
  </div>
  )
}
