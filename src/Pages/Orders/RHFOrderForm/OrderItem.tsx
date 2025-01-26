// #region Imports
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RHFAutocomplete from "./RHFAutocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { OrderItemDTO, ProductDTO } from "../../../Types/types";
import {
  Control,
  FormState,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { type OrderFormSchemaType } from "./formSchema";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "./OrderItem.module.css";
// #endregion

export default function OrderItems({
  remove,
  useFormMethods,
  products,
  index,
  field,
}: {
  remove: UseFieldArrayRemove;
  useFormMethods: {
    register: UseFormRegister<OrderFormSchemaType>;
    formState: FormState<OrderFormSchemaType>;
    control: Control<OrderFormSchemaType>;
  };
  products: ProductDTO[];
  index: number;
  field: OrderItemDTO & { id: string };
}) {
  const [isCakeCategory, _setIsCakeCategory] = useState<boolean>(false);
  const [showNote, setShowNote] = useState<boolean>(false);
  const setIsCakeCategory = (product: ProductDTO) => {
    if (product.category?.toLowerCase().includes("торта")) {
      console.log("is cake category");
      _setIsCakeCategory(true);
      return;
    }
    _setIsCakeCategory(false);
  };

  const filterOptions = createFilterOptions<ProductDTO>({
    stringify: (option: ProductDTO) => String(option.name) + option.code,
  });

  return (
    <div className={styles.orderItemContainer}>
      
      <div className={styles.product}>
        {/* //--Product Select  */}
        <RHFAutocomplete
          sx={{ flexGrow: "1" }}
          size="small"
          control={useFormMethods.control}
          label="Изберете продукт"
          name={`orderItems.${index}.productId`}
          customOnChange={(option) => {
            setIsCakeCategory(option);
          }}
          filterOptions={filterOptions}
          getOptionLabel={(option: ProductDTO) => option.name}
          options={products}
        />

        {/* //--Product Quantity  */}
        <TextField
          label="Количество"
          {...useFormMethods.register(`orderItems.${index}.productAmount`, {
            valueAsNumber: true,
          })}
          size="small"
          error={
            !!useFormMethods.formState.errors.orderItems?.[index]?.productAmount
          }
        />

        {/* //--Product Cake Fields  */}
        {isCakeCategory && (
          <>
            <TextField
              label="Фото №"
              size="small"
              {...useFormMethods.register(`orderItems.${index}.cakeFoto`)}
              error={
                !!useFormMethods.formState.errors.orderItems?.[index]?.cakeFoto
              }
            />
            <TextField
              size="small"
              label="Надпис на тортата"
              {...useFormMethods.register(`orderItems.${index}.cakeTitle`)}
              error={
                !!useFormMethods.formState.errors.orderItems?.[index]?.cakeTitle
              }
            />
          </>
        )}

        {/* //--NOTE Checkbox  */}
        <Checkbox
          className={styles.checkBox}
          // sx={{"&.Mui-checked": {color: "secondary.main", backgroundColor:"green"}}}
          icon={<EditNoteIcon />}
          checkedIcon={<EditNoteIcon />}
          checked={showNote}
          onChange={() => setShowNote(!showNote)}
          size="medium"
        />
      </div>

      {/* //--Product Note */}
      {showNote && (
        <TextField
        size="small"
          className={styles.note}
          {...useFormMethods.register(`orderItems.${index}.description`)}
          label="Бележка"
          error={
            !!useFormMethods.formState.errors.orderItems?.[index]?.description
          }
        />
      )}

      {/* //--Delete Order Item Btn */}
      <div className={styles.delete}>
        <IconButton
          size="large"
          className={styles.iconBtnStyle}
          type="button"
          onClick={() => remove(index)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </div>
  );
}
