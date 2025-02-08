import { ZodSchema } from "zod";
import { useFormPersistence } from "../../Providers/FormNavigationProvider";
import GenericForm from "./GenericForm";
import { FieldValues } from "react-hook-form";

interface PersistedFormProps<TForm, TDTO> {
  zodSchema: ZodSchema<TForm>;
  FormFields: React.FC;
  dtoMapper?: (data: TForm) => TDTO;
}

export default function PersistedForm<TForm extends FieldValues, TDTO>({
  zodSchema,
  FormFields,
  dtoMapper,
}: PersistedFormProps<TForm, TDTO>) {
  const { selectedItem, handleSubmit, handleCancel } =
    useFormPersistence<TDTO>();

  return (
    <GenericForm<TForm, TDTO>
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      defaultValues={selectedItem}
      zodSchema={zodSchema}
      dtoMapper={dtoMapper}
      FormFields={FormFields}
    />
  );
}
