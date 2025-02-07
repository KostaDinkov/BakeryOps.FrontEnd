import { CategoryDTO } from "../../../Types/types";
import { FieldValues, useFormContext } from "react-hook-form";
import { z } from "zod";
import { TextField } from "@mui/material";
import GenericForm from "../../GenericForm/GenericForm";

const categoryFormSchema = z.object({
  name: z.string().nonempty("Името на категорията е задължително"),
});
type CategoryFormType = z.infer<typeof categoryFormSchema>;

export default function CategoriesForm({
  selectedItem,
  persistData,
  onCancel,
}: {
  selectedItem: CategoryDTO;
  persistData: (data: CategoryDTO) => void;
  onCancel: () => void;
}) {
  function FormFields() {
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

  const mapFieldsToDTO = (data: FieldValues): CategoryDTO => {
    return {
      id: selectedItem.id,
      name: data.name,
    };
  }

  return (
    <GenericForm<CategoryFormType>
      onSubmit={function (data: FieldValues): void {
        persistData(mapFieldsToDTO(data));
      }}
      onCancel={onCancel}
      defaultValues={selectedItem}
      zodSchema={categoryFormSchema}
    >
      <FormFields />
    </GenericForm>
  );
}
