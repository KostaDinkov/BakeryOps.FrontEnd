import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().nonempty("Името на категорията е задължително"),
});
export type CategoryFormType = z.infer<typeof categoryFormSchema>;

export default function FormFields() {
    const { register, formState, control } = useFormContext<CategoryFormType>();

    return (
      <div>
        <TextField
          {...register("name")}
          label="Име"
          size="small"
          error={!!formState.errors.name}
          helperText={!!formState.errors.name && formState.errors.name.message}
        />
      </div>
    );
  }


