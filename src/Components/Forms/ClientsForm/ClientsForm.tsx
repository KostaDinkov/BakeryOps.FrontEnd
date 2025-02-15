import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { z } from "zod";
//import {useFormData} from "../../../Providers/FormDataProvider";

export const clientSchema = z.object({
  name: z
    .string({ required_error: "Името на клиента е задължително", invalid_type_error: "Името на клиента е задължително" })
    .min(3,{message:"Името на клиента трябва да е минимум 3 символа"})
    .max(50,{message:"Името на клиента трябва да е максимум 50 символа"}),
  phone: z.string().min(5,{message:"Телефонният номер трябва да е минимум 5 символа"}).max(20).optional(),
  email: z
    .string()
    .email({ message: "Невалиден формат на мейла." })
    .optional()
    .nullable(),
  isCompany: z.coerce.boolean(),
  isSpecialPrice: z.coerce.boolean(),
  hasDiscount:z.coerce.boolean(),
});

export type ClientFormType = z.infer<typeof clientSchema>;

 export default function ClientFormFields() {
    const { register, formState, control } = useFormContext<ClientFormType>();
    //const { data} = useFormData<ClientFormType>();
    return (
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
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
          name="phone"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Телефон"
              size="small"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Мейл"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
        <Controller
          control={control}
          name="isCompany"
          render={({ field }) => (
            <FormControlLabel
              label="Компания?"
              labelPlacement="start"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                />
              }
            />
          )}
        />
        <Controller
          control={control}
          name="isSpecialPrice"
          render={({ field }) => (
            <FormControlLabel
              label="Ползва специални цени?"
              labelPlacement="start"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                />
              }
            />
          )}
        />
      </div>
    );
  }



