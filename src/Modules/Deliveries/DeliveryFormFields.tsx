import {
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Box,
} from "@mui/material";
import {
  DeliveryDTO,
  DeliveryItemDTO,
  MaterialDTO,
  Unit,
  VendorDTO,
} from "../../Types/types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { parse } from "date-fns";
import Select from "react-select";
import { useState } from "react";
import styles from "./deliveries.module.scss";

export default function DeliveryFormFields({
  selectedItem,
  queryData,
}: {
  selectedItem: DeliveryDTO | null;
  queryData: { materials: MaterialDTO[]; units: Unit[]; vendors: VendorDTO[] };
}) {
  const [deliveryItems, setDeliveryItems] = useState<{
    [key: string]: DeliveryItemDTO;
  }>({});

  return (
    <>
      <TextField
        label="Номер на документ"
        name="invoiceNumber"
        required
        defaultValue={selectedItem?.invoiceNumber}
      />
      <DatePicker
        label="Дата на документ"
        defaultValue={
          selectedItem
            ? parse(selectedItem?.deliveryDate, "MM/dd/yyyy", new Date())
            : undefined
        }
      />
      <Select
        options={queryData.vendors.map((vendor) => ({
          value: vendor.id,
          label: vendor.name,
        }))}
        name="vendorId"
        defaultValue={
          selectedItem
            ? queryData.vendors.find((v) => v.id === selectedItem.vendorId)
            : undefined
        }
        placeholder="Избери доставчик"
      />
      <TextField
        label="Бележки"
        name="notes"
        defaultValue={selectedItem?.notes}
      />
      <DynamicMaterialInputList materials={queryData.materials} />
    </>
  );
}

function DeliveryItemInputFields({
  materials,
  rowId,
  setDeliveryItems,
  deliveryItems,
}: {
  materials: MaterialDTO[];
  rowId: string;
  setDeliveryItems: React.Dispatch<{ [key: string]: DeliveryItemDTO }>;
  deliveryItems: { [key: string]: DeliveryItemDTO };
}) {
  return (
    <div className={styles.deliveryRow}>
      <Autocomplete
        options={materials}
        getOptionLabel={(option) => option.name || ""}
        onChange={(event, value) => {
          setDeliveryItems({
            ...deliveryItems,
            [rowId]: { ...deliveryItems[rowId], materialId: value?.id },
          });
        }}
        renderInput={function (
          params: AutocompleteRenderInputParams
        ): React.ReactNode {
          return (
            <TextField
              {...params}
              label="Име на стока"
              name={`${rowId}-name`}
            />
          );
        }}
      />
      <TextField
        label="Количество"
        type="number"
        name={`${rowId}-quantity`}
        slotProps={{ htmlInput: { step: "0.01" } }}
        value={deliveryItems[rowId]?.quantity}
        onChange={(e) =>
          setDeliveryItems({
            ...deliveryItems,
            [rowId]: {
              ...deliveryItems[rowId],
              quantity: Number(e.target.value),
            },
          })
        }
      />
      <TextField
        label="Единична цена"
        type="number"
        name={`${rowId}-unitPrice`}
        slotProps={{ htmlInput: { step: "0.01" } }}
        value={deliveryItems[rowId]?.unitPrice}
        onChange={(e) =>
          setDeliveryItems({
            ...deliveryItems,
            [rowId]: {
              ...deliveryItems[rowId],
              unitPrice: Number(e.target.value),
            },
          })
        }
      />
      <TextField
        label="Партиден номер"
        type="text"
        name={`${rowId}-lotNumber`}
        value={deliveryItems[rowId]?.lotNumber}
        onChange={(e) =>
          setDeliveryItems({
            ...deliveryItems,
            [rowId]: { ...deliveryItems[rowId], lotNumber: e.target.value },
          })
        }
      />
      <TextField
        label="Бележка"
        type="text"
        name={`${rowId}-notes`}
        value={deliveryItems[rowId]?.notes}
        onChange={(e) =>
          setDeliveryItems({
            ...deliveryItems,
            [rowId]: { ...deliveryItems[rowId], notes: e.target.value },
          })
        }
      />
    </div>
  );
}

function DynamicMaterialInputList({ materials }: { materials: MaterialDTO[] }) {
  const [inputRows, setInputRows] = useState<{
    [key: string]: JSX.Element;
  }>({});

  const [deliveryItems, setDeliveryItems] = useState<{
    [key: string]: DeliveryItemDTO;
  }>({});

  return (
    <>
      <ul>
        {Object.keys(inputRows).map((key) => {
          return (
            <li key={key} className={styles.deliveryRowWithDelete}>
              {inputRows[key]}
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  setInputRows(
                    Object.fromEntries(
                      Object.entries(inputRows).filter(([k]) => k !== key)
                    )
                  )
                }
              >
                X
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        onClick={() => {
          const key = crypto.randomUUID();
          setInputRows({
            ...inputRows,
            [key]: (
              <DeliveryItemInputFields rowId={key} materials={materials} deliveryItems={deliveryItems} setDeliveryItems={setDeliveryItems} />
            ),
          });
        }}
      >
        Добави стока
      </Button>
    </>
  );
}
