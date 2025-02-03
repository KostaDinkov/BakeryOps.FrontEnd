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
  Alert,
  Button,
  Checkbox,
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
import OrderItem from "./OrderItem";
import styles from "./RHFOrderForm.module.css";
import RFHDatePicker from "./RHFDatePicker";
import { formatISO, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// #endregion

export default function RHFOrderForm({
  products,
  clients,
  order,
  submitOrder,
}: {
  products: ProductDTO[];
  clients: ClientDTO[];
  order?: OrderDTO;
  submitOrder: (data: OrderDTO) => void;
}) {
  const navigate = useNavigate();
  const isEdit = !!order;
  const [errors, setErrors] = useState<string[]>([]);

  function getDefaultValues(order: OrderDTO): OrderFormSchemaType {
    if (order) {
      return {
        id: order.id,
        clientId: order.clientId || order.clientName,
        clientName: order.clientName,
        clientPhone: order.clientPhone,
        pickupDate: parseISO(order.pickupDate),
        isPaid: order.isPaid || false,
        advancePaiment: order.advancePaiment,
        orderItems: order.orderItems,
      };
    }
    return {
      id: undefined,
      operatorId: null,
      clientId: null,
      clientPhone: null,
      pickupDate: null,
      clientName: null,
      isPaid: false,
      advancePaiment: 0,
      orderItems: [],
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
    //if clientId is not a valid clientId, it must be a free text
    //so we set the clientName to the clientId and set the clientId to null
    if (data.clientId) {
      if (!clients.find((c) => c.id === data.clientId)) {
        data.clientName = data.clientId;
        data.clientId = null;
      }
    }

    const orderDTO: OrderDTO = {
      id: data.id || undefined,
      clientId: data.clientId || null,
      clientPhone: data.clientPhone,
      clientName:
        data.clientName || clients.find((c) => c.id === data.clientId)?.name,
      pickupDate: formatISO(data.pickupDate),
      isPaid: data.isPaid,
      advancePaiment: data.advancePaiment,
      orderItems: data.orderItems?.map((item: OrderItemDTO) => ({
        productId: item.productId,
        productName: products.find((p) => p.id === item.productId)?.name,
        productAmount: item.productAmount,
        description: item.description || null,
        cakeFoto: item.cakeFoto || null,
        cakeTitle: item.cakeTitle || null,
        isInProgress: false,
        isComplete: false,
        // itemUnitPrice: getSpecialPrice(
        //   products.find((p) => p.id === item.productId),
        //   clients.find((c) => c.id === data.clientId)?.discountPercent
        // ),
      })),
    };

    submitOrder(orderDTO);
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("Form data", getValues());
        console.log("Errors", errors);
        setErrors(Object.keys(errors));
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
                  checked={field.value || false}
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
            <OrderItem
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
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              navigate("/orders");
            }}
          >
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
