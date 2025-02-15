import { ZodSchema } from "zod";
//import { useFormData } from "../../Providers/FormDataProvider";
import GenericForm from "./GenericForm";
import { FieldValues } from "react-hook-form";

interface FormWithDataProps<TForm, TDTO> {
  zodSchema: ZodSchema<TForm>;
  FormFields: React.FC;
  dtoMapper?: (data: TForm, selectedItem?:TDTO) => TDTO;
}

export default function FormWithData<TForm extends FieldValues, TDTO>({
  zodSchema,
  FormFields,
  dtoMapper,
}: FormWithDataProps<TForm, TDTO>) {
  // const { selectedItem, handleSubmit, handleCancel, data } =
  //   useFormData<TDTO>();

  return (
   <></>
  );
}
