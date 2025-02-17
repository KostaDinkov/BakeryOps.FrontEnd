import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { z } from "zod";

export const vendorFormSchema = z.object({
  name: z.string().min(3, "Името трябва да е поне 3 символа"),
  phoneNumber: z.string().optional(),
  email: z.string().email("Невалиден email").optional(),
  address: z.string().optional(),
});

export type VendorFormType = z.infer<typeof vendorFormSchema>;

export default function VendorFormFields() {
  const { control } = useFormContext<VendorFormType>();

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
        name="phoneNumber"
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
            label="Имейл"
            size="small"
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Адрес"
            size="small"
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
    </div>
  );
}
