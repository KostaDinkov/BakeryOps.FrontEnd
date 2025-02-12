import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, "Името трябва да е поне 3 символа"),
  category: z.string().min(1, "Категорията е задължителна"),
  code: z.string().optional(),
  unit: z.string().min(1, "Мярката е задължителна"),
  priceDrebno: z.number().min(0, "Цената не може да е отрицателна"),
  priceEdro: z.number().min(0, "Цената не може да е отрицателна"),
  isActive: z.boolean(),
  inPriceList: z.boolean(),
  hasDiscount: z.boolean(),
});

export type ProductFormType = z.infer<typeof productFormSchema>;

export default function ProductFormFields() {
  const { control } = useFormContext<ProductFormType>();

  return (
    <div className="flex flex-col gap-4">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled
            {...field}
            label="Име"
            size="small"
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled
            {...field}
            label="Категория"
            size="small"
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      <Controller
        control={control}
        name="code"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled
            {...field}
            label="Код"
            size="small"
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      <Controller
        control={control}
        name="unit"
        render={({ field, fieldState: { error } }) => (
          <TextField
            disabled
            {...field}
            label="Мярка"
            size="small"
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      <Controller
        control={control}
        disabled
        name="priceDrebno"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type="number"
            label="Цена на дребно"
            size="small"
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      <Controller
        control={control}
        disabled
        name="priceEdro"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type="number"
            label="Цена на едро"
            size="small"
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      <Controller
        control={control}
        disabled
        name="isActive"
        render={({ field }) => (
          <FormControlLabel
            label="Активен"
            labelPlacement="start"
            control={<Checkbox {...field} checked={field.value} />}
          />
        )}
      />

      <Controller
        control={control}
        name="inPriceList"
        render={({ field }) => (
          <FormControlLabel
            label="В ценовия лист"
            labelPlacement="start"
            control={<Checkbox {...field} checked={field.value} />}
          />
        )}
      />
      <Controller
        control={control}
        name="hasDiscount"
        render={({ field }) => (
          <FormControlLabel
            label="Отстъпка"
            labelPlacement="start"
            control={<Checkbox {...field} checked={field.value} />}
          />
        )}
      />
    </div>
  );
}
