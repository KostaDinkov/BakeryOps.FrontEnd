import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

 export default function ClientFormFields() {
    const { register, formState, control } = useFormContext<ClientFormType>();
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



