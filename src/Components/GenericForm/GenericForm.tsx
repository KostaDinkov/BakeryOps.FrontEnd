import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button } from "@mui/material";
import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  SubmitErrorHandler,
} from "react-hook-form";

interface GenericFormProps<FormValues> {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
  children: React.ReactNode;
  defaultValues?: FormValues;
  dtoMapper?: (data: FormValues) => any;
  zodSchema?: Zod.Schema<FormValues>;
}

function GenericForm<FormValues extends FieldValues>({
  onSubmit,
  onCancel,
  children,
  defaultValues,
  dtoMapper,
  zodSchema,
}: GenericFormProps<FormValues>) {
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodSchema ? zodResolver(zodSchema) : undefined,
  });

  const onValidSubmit: SubmitHandler<FormValues> = (data) => {
    const mappedData = dtoMapper ? dtoMapper(data) : data;
    onSubmit(mappedData);
  };
  const { formState } = methods;
  const onInvalidSubmit: SubmitErrorHandler<FormValues> = () => {
    printErrors(formState.errors);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onValidSubmit, onInvalidSubmit)}>
        {children}
        <div className="error-messages">
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
        </div>
        <div className="form-actions">
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
}
function printErrors(
  errors: { [key: string]: { message: string } } | undefined
) {
  if (!errors)
    throw new Error("No errors to print, but printErrors was called");
  for (const key in errors) {
    console.log(`Поле: ${key} -- ${errors[key]?.message}`);
  }
}
export default GenericForm;
