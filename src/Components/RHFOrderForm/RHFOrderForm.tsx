// #region IMPORTS
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { orderFormSchema, type OrderFormSchemaType } from "./formSchema";
import RHFAutocomplete from "./RHFAutocomplete";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import {
  ClientDTO,
  OrderDTO,
  OrderItemDTO,
  ProductDTO,
} from "../../Types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import OrderItems from "./OrderItem";
import styles from "./RHFOrderForm.module.css";
import RFHDatePicker from "./RHFDatePicker";
import { getSpecialPrice } from "../../Pages/Orders/OrderForm/OrderFormHelperFunctions";
import { error } from "console";
import { formatISO, parseISO } from "date-fns";
// #endregion

export default function RHFOrderForm({
  products,
  clients,
  order,
  submitOrder
}: {
  products: ProductDTO[];
  clients: ClientDTO[];
  order?: OrderDTO;
  submitOrder: (data: OrderDTO) => void;
}) {
  const isUpdate = !!order;

  function getDefaultValues(order?: OrderDTO): OrderFormSchemaType {
    if (!order) {
      return {
        operatorId: null,
        clientId: null,
        clientPhone: null,
        pickupDate: null,
        clientName: null,
        isPaid: false,
        advancePaiment: 0,
        orderItems: [],
        createdDate: formatISO(new Date()),
      };
    }
    return {
      clientId: order.clientId,
      clientPhone: order.clientPhone,
      pickupDate: parseISO(order.pickupDate),
      isPaid: order.isPaid,
      advancePaiment: order.advancePaiment,
      orderItems: order.orderItems,
    };
  }

  const { control, handleSubmit, register, getValues, formState } =
    useForm<OrderFormSchemaType>({
      mode: "all",
      resolver: zodResolver(orderFormSchema),
      defaultValues: getDefaultValues(order),
    });

  const { fields, append, remove } = useFieldArray<OrderFormSchemaType>({
    name: "orderItems",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });

  const onSubmit: SubmitHandler<OrderFormSchemaType> = (data) => {
    const orderDTO: OrderDTO = {
      clientId: data.clientId || null,
      clientPhone: data.clientPhone,
      clientName:
        data.clientName || clients.find((c) => c.id === data.clientId)?.name,
      pickupDate: data.pickupDate,
      createdDate: data.createdDate,
      isPaid: data.isPaid,
      advancePaiment: data.advancePaiment,
      orderItems: data.orderItems?.map((item: OrderItemDTO) => ({
        productId: item.productId,
        productAmount: item.productAmount,
        description: item.description ||null,
        cakeFoto: item.cakeFoto || null,
        cakeTitle: item.cakeTitle || null,
        isInProgress: false,
        isComplete: false,
        itemUnitPrice: getSpecialPrice(
          products.find((p) => p.id === item.productId),
          clients.find((c) => c.id === data.clientId)?.discountPercent
        ),
      })),
    };
    console.log("OrderDTO", orderDTO);
    submitOrder(orderDTO);
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("Form data", getValues());
        console.log("Errors", errors);
      })}
    >
      {/* //--Form meta data */}
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
        <RFHDatePicker control={control} name="pickupDate" />
        
		<Controller
          name="isPaid"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox                 
                  onChange={(_, checked) => field.onChange(checked)}
                  checked={field.value||false}
                />
              }
              label="Платена?"
            />
          )}
        />

		<TextField
          {...register("advancePaiment", { valueAsNumber: true })}
          label="Капаро"
          type={"number"}
        />
      </div>

      {/* //--Order Items */}
      <Stack direction="column" spacing={1}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <OrderItems
              remove={remove}
              useFormMethods={{ control, register, formState }}
              products={products}
              index={index}
              field={field}
            />
          </div>
        ))}
      </Stack>

      {/* //--Footer */}
      <div className={styles.footerRow}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            append({ productId: "", productAmount: 0 });
          }}
        >
          Добави Продукт
        </Button>
        <div className={styles.saveCancel}>
          <Button type="button" variant="outlined" onClick={() => {}}>
            Откажи
          </Button>
          <Button type="submit" variant="contained">
            Запази Поръчката
          </Button>
        </div>
      </div>
    </form>
  );
}
