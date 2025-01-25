import {
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { orderFormSchema, type OrderFormSchemaType } from "./formSchema";
import RHFAutocomplete from "./RHFAutocomplete";
import { Button, Stack, TextField } from "@mui/material";
import { ClientDTO, OrderItemDTO, ProductDTO } from "../../../Types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import OrderItems from "./OrderItem";
import styles from "./RHFOrderForm.module.css";
import RFHDatePicker from "./RHFDatePicker";

export default function RHFOrderForm({
  products,
  clients,
}: {
  products: ProductDTO[];
  clients: ClientDTO[];
}) {
  const { control, handleSubmit, register, getValues, formState } =
    useForm<OrderFormSchemaType>({
      mode: "all",
      resolver: zodResolver(orderFormSchema),
      defaultValues: { clientName: "1", clientPhone: "1234567890" },
    });

  const { fields, append, prepend, remove } =
    useFieldArray<OrderFormSchemaType>({
      name: "orderItems",
      control,
      rules: {
        required: "Please append at least 1 item",
      },
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
        <div className={styles.formMetaData}>
          <RHFAutocomplete<ClientDTO, OrderFormSchemaType>
            name="clientId"
            label="Име на клиент"
            getOptionLabel={(option) => option.name || ""}
            options={clients}
            control={control}
            freeText
          />
          <TextField
            {...register("clientPhone")}
            error={!!formState.errors.clientPhone}
            helperText={formState.errors.clientPhone?.message}
            label="Телефон на клиент"
          />
          <RFHDatePicker control={control} name="pickupDate"/>
        </div>
        <Stack direction="column" spacing={2}>
        {fields.map((field, index) => (
          <div key={field.id} >
           <OrderItems
             remove={ remove }
             useFormMethods={{ control, register, formState }}
             products={products}
             index={index}
             field={field}
             />
          </div>
        ))}
        </Stack>
        
        <div>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              append({ productId: "", productAmount: 0 });
            }}
          >
            Добави Продукт
          </Button>
          <Button  type="submit" variant="contained">Запази Поръчката</Button>
        </div>
      </form>
      <DevTool control={control} />
      
    </div>
  );
}
