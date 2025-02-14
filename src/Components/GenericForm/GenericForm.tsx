import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  FieldErrors,
  SubmitErrorHandler,
  DefaultValues,
} from "react-hook-form";

interface GenericFormProps<FormValues, Tdto> {
  onSubmit: (data: Tdto) => void;
  onCancel: () => void;
  defaultValues?: Tdto;
  dtoMapper?: (data: FormValues, selectedItem?:Tdto) => Tdto;
  zodSchema?: Zod.Schema<FormValues>;
  FormFields: React.FC<{data:Record<string,any>|undefined}>;
  data:Record<string,any>|undefined;
}

function GenericForm<FormValues extends FieldValues, Tdto>({
  onSubmit,
  onCancel,
  defaultValues,
  dtoMapper,
  zodSchema,
  FormFields,
  data
}: GenericFormProps<FormValues, Tdto>) {
  const methods = useForm<FormValues>({
    defaultValues: defaultValues as unknown as DefaultValues<FormValues>,
    resolver: zodSchema ? zodResolver(zodSchema) : undefined,
  });

  const onValidSubmit: SubmitHandler<FormValues> = (data) => {
    if (dtoMapper) {
      onSubmit(dtoMapper(data, defaultValues));
    }
    //if defaultValues are provided, we are in edit mode
    
    else if (defaultValues && Object.keys(defaultValues).length > 0) {
      let result: Tdto = { ...defaultValues, ...data };
      onSubmit(result);
    } else {
      onSubmit(data as unknown as Tdto);
    }

  };
  const { formState } = methods;
  const onInvalidSubmit: SubmitErrorHandler<FormValues> = () => {
    const formValues = methods.getValues();

    printErrors(formState.errors);
    console.log(formValues);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onValidSubmit, onInvalidSubmit)}>
        <FormFields data={data}/>
        {/* <div className="error-messages">
          {Object.keys(methods.formState.errors).length > 0 && (
            <Alert severity="error">
              <ul>
                {Object.entries(methods.formState.errors).map(
                  ([field, error]) => (
                    <li key={field}>
                      {field}: {(error as any).message}
                    </li>
                  )
                )}
              </ul>
            </Alert>
          )}
        </div> */}
        <div className="mt-4 flex justify-end gap-4">
          <Button type="button" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
function printErrors(
  errors: FieldErrors<any> | undefined
) {
  if (!errors)
    throw new Error("No errors to print, but printErrors was called");
  for (const key in errors) {
    console.log(`Поле: ${key} -- ${errors[key]?.message}`);
  }
}
}
export default GenericForm;
