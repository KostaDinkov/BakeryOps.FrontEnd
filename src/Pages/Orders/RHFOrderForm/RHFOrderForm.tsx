import { SubmitHandler, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { orderFormSchema, type OrderFormSchemaType } from "./formSchema";
import RHFAutocomplete from "./RHFAutocomplete";
import { TextField } from "@mui/material";
import { ClientDTO, ProductDTO } from "../../../Types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

export default function RHFOrderForm({products, clients}: {products: ProductDTO[], clients: ClientDTO[]}) {
  const {control, handleSubmit, register, getValues, formState} = useForm<OrderFormSchemaType>({
      mode: "all",
      resolver: zodResolver(orderFormSchema),
      defaultValues: {clientName: "1", clientPhone: "1234567890"}
    });

    const { fields, append, prepend, remove } = useFieldArray<OrderFormSchemaType>({
      name: "orderItems",
      control,
      rules: {
        required: "Please append at least 1 item"
      }
    });

  const onSubmit: SubmitHandler<OrderFormSchemaType> = (data) => {
    console.log("Submitted data:");
    console.log(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("Validation errors", errors);
          console.log(getValues());
        })}
      >
        <RHFAutocomplete<ClientDTO, OrderFormSchemaType>
          name="clientId"
          label="Име на клиент"
          getOptionLabel={(option) => option.name || ""}
          transformValue={(value) =>value}
          options={clients}
          control={control}
          freeSolo
        />
        <TextField
          {...register("clientPhone")}
          error={!!formState.errors.clientPhone}
          helperText={formState.errors.clientPhone?.message}
        />
        <input type="submit" />
        {fields.map((field, index) => (
          <div key={field.id}>
            <RHFAutocomplete
              control={control}
              name={`orderItems.${index}.productId`} 
              getOptionLabel={ (option: ProductDTO)=> option.name } 
              options={products}
              />
            <TextField
              {...register(`orderItems.${index}.cakeFoto` )}
              error={!!formState.errors.orderItems?.[index]?.cakeFoto}
              helperText={formState.errors.orderItems?.[index]?.cakeFoto?.message}
            />
            <TextField
              {...register(`orderItems.${index}.productAmount`,{valueAsNumber:true} )}
              error={!!formState.errors.orderItems?.[index]?.productAmount}
              helperText={formState.errors.orderItems?.[index]?.productAmount?.message}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            append({ productId: "", productAmount: 0 });
          }}
          >Dobavi</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
