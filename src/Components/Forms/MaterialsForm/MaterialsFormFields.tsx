import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { z, ZodTypeAny } from "zod";
import { CategoryDTO, MaterialDTO } from "../../../Types/types";
import RHFAutocomplete from "../../RHFOrderForm/RHFAutocomplete";

export const materialFormDefinition = {
  id: z.string().optional(),
  unitId: z.string().optional(),
  vendorId: z.string().optional(),
  categoryId: z.string().optional(),  
  name: z.string().min(3, "Името трябва да е поне 3 символа"),
  categoryName: z
    .string()
    .min(2, "Категорията трябва да е поне 2 символа")
    .optional(),
  description: z.string().optional().nullable(),
  unitName: z.string().min(1, "Мярката е задължителна"),
  vendorName: z.string().min(1, "Доставчикът е задължителен"),
  latestPrice: z.coerce.number().positive("Цената трябва да е положително число").optional(),
} satisfies { [K in keyof MaterialDTO]?: ZodTypeAny };

export const materialFormSchema = z.object(materialFormDefinition).strict();
export type MaterialFormType = z.infer<typeof materialFormSchema>;

export default function MaterialFormFields({ data }: { data: Record<string, any> }) {
  const { control } = useFormContext<MaterialFormType>();
  const { categories, vendors, units } = data || {};

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

      <RHFAutocomplete<MaterialDTO & { id: string }, MaterialFormType>
        control={control}
        name={"categoryName"}
        options={categories}
        getOptionLabel={(option) => option.name}
        freeText
      />
      <RHFAutocomplete<MaterialDTO & { id: string }, MaterialFormType>
        control={control}
        name={"vendorName"}
        options={vendors}
        getOptionLabel={(option) => option.name}
        freeText
      />
      <RHFAutocomplete<MaterialDTO & { id: string }, MaterialFormType>
        control={control}
        name={"unitName"}
        options={units}
        getOptionLabel={(option) => option.name}
        freeText
      />
    <Controller
      control={control}
      name="latestPrice"
      render={({ field, fieldState: { error } }) => (
        <TextField
        {...field}
        label="Цена без ДДС"
        size="small"
        type="number"
        error={!!error}
        helperText={error ? error.message : ""}
        />
      )}
    />
    <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                label="Описание"
                size="small"
                multiline
                rows={4}
                error={!!error}
                helperText={error ? error.message : ""}
            />
        )}
    />

    </div>
  );
}
