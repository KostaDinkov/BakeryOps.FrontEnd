import React from "react";
import {
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
} from "@mui/material";
import {
  DeliveryDTO,
  DeliveryItemDTO,
  MaterialDTO,
  Unit,
  VendorDTO,
} from "../../Types/types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { parseISO } from "date-fns";
import { useState } from "react";
import { customInvalidProps } from "../../system/utils";
import { VAT } from "../../system/constants";
import styles from "./DeliveryForm.module.css";

type DeliveryItems = {
  [key: string]: DeliveryItemDTO;
};

export default function DeliveryForm({
  selectedItem,
  queryData,
  handleSave,
  Buttons,
}: {
  selectedItem: DeliveryDTO | null;
  queryData: { materials: MaterialDTO[]; vendors: VendorDTO[] };
  handleSave: (item: any) => void;
  Buttons: React.FC;
}) {
  const getDeliveryItems = (items: DeliveryItemDTO[]) => {
    let result: { [key: string]: DeliveryItemDTO } = {};
    if (items.length === 0) return result;
    for (const item of items) {
      if (item.id) {
        result[item.id] = item;
      }
    }
    return result;
  };

  const [deliveryItems, setDeliveryItems] = useState<{
    [key: string]: DeliveryItemDTO | null;
  }>(getDeliveryItems(selectedItem?.items || []));

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryDTO | null>(
    selectedItem
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const delivery = {
      ...deliveryInfo,
      items: Object.values(deliveryItems),
    };
    delivery.total = delivery.items.reduce(
      (acc, item) => acc + item?.quantity * item?.unitPrice,
      0
    );
    delivery.tax = delivery.total * VAT;
    delivery.totalWithTax = delivery.total + delivery.tax;

    handleSave(delivery);
  };

  return (
    <form className={styles.deliveryForm} onSubmit={handleSubmit}>
      <div className={styles.deliveryInfo}>
        {/* //-- VENDOR */}
        <Autocomplete
          size="small"
          options={queryData.vendors}
          getOptionLabel={(option) => option.name || ""}
          onChange={(event, value) => {
            setDeliveryInfo({ ...deliveryInfo, vendorId: value?.id });
          }}
          value={
            queryData.vendors.find((v) => v.id === deliveryInfo?.vendorId) ||
            null
          }
          renderInput={function (
            params: AutocompleteRenderInputParams
          ): React.ReactNode {
            return <TextField {...params} label="Доставчик" />;
          }}
        />
        {/* //-- DOCUMENT DATE */}
        <DatePicker
          label="Дата на документ"
          value={parseISO(deliveryInfo?.deliveryDate ?? "")}
          onChange={(date) => {
            setDeliveryInfo({
              ...deliveryInfo,
              deliveryDate: date?.toISOString(),
            });
          }}
          slotProps={{ textField: { size: "small" } }}
        />
        {/* //-- DOCUMENT NUMBER */}
        <TextField
          size="small"
          label="Номер на документ"
          required
          value={deliveryInfo?.invoiceNumber || ""}
          onChange={(e) =>
            setDeliveryInfo({ ...deliveryInfo, invoiceNumber: e.target.value })
          }
          slotProps={{ htmlInput: { ["data-testid"]: "documentNumber" } }}
          {...customInvalidProps("Номера на документа е задължителен")}
        />

        {/* //-- NOTES */}
        <div className={styles.fullGridRow}>
          <TextField
            label="Бележки"
            size="small"
            name="notes"
            value={deliveryInfo?.notes || ""}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })
            }
            fullWidth
          />
        </div>
      </div>

      {/* //-- MATERIALS */}
      <DynamicMaterialInputList
        materials={queryData.materials}
        setDeliveryItems={setDeliveryItems}
        deliveryItems={deliveryItems}
      />
      <Buttons />
    </form>
  );
}

function DynamicMaterialInputList({
  materials,
  deliveryItems,
  setDeliveryItems,
}: {
  materials: MaterialDTO[];
  deliveryItems: DeliveryItems | {};
  setDeliveryItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: DeliveryItemDTO | null }>
  >;
}) {
  const updateDeliveryItem = (key: string, property: any) => {
    setDeliveryItems((deliveryItems) => {
      const deliveryItemsCopy = { ...deliveryItems };
      deliveryItemsCopy[key] = { ...deliveryItemsCopy[key], ...property };
      return deliveryItemsCopy;
    });
  };

  return (
    <>
      <ul className={styles.deliveryList}>
        {Object.keys(deliveryItems).map((key) => {
          let deliveryItem = null;
          if (Object.keys(deliveryItems).length > 0) {
            deliveryItem = (deliveryItems as DeliveryItems)[key] || null;
          }
          return (
            <li key={key} className={styles.deliveryRowWithDelete}>
              {React.createElement(InputRow, {
                rowId: key,
                materials,
                deliveryItem,
                updateDeliveryItem,
              })}
              <Button
                sx={{minWidth:0, height:"fit-content",}}
                size="small"
                variant="contained"
                color="error"
                onClick={() =>
                  setDeliveryItems(
                    Object.fromEntries(
                      Object.entries(deliveryItems).filter(([k]) => k !== key)
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
        size="medium"
        variant="outlined"
        onClick={() => {
          const key = crypto.randomUUID();
          setDeliveryItems({
            ...deliveryItems,
            [key]: null,
          });
        }}
      >
        Добави стока
      </Button>
    </>
  );
}

function InputRow({
  rowId,
  materials,
  deliveryItem,
  updateDeliveryItem,
}: {
  rowId: string;
  materials: MaterialDTO[];
  deliveryItem: DeliveryItemDTO | null;
  updateDeliveryItem: (key: string, property: any) => void;
}) {
  return (
    <div className={styles.deliveryRow}>
      {/* //--PRODUCT NAME */}
      <Autocomplete
        className={styles.item}
        size="small"
        options={materials}
        getOptionLabel={(option) => option.name || ""}
        onChange={(event, value) => {
          updateDeliveryItem(rowId, { materialId: value?.id });
        }}
        value={materials.find((m) => m.id === deliveryItem?.materialId) || null}
        renderInput={function (
          params: AutocompleteRenderInputParams
        ): React.ReactNode {
          return <TextField {...params} label="Име на стока" />;
        }}
      />
      {/* //--PRODUCT QUANTITY */}
      <TextField
        className={styles.quantity}
        required
        size="small"
        label="Количество"
        type="number"
        slotProps={{ htmlInput: { step: "1" } }}
        value={deliveryItem?.quantity || ""}
        onChange={(e) =>
          updateDeliveryItem(rowId, {
            quantity: Number(e.target.value),
          })
        }
        {...customInvalidProps("Количеството е задължително")}
      />
      {/* //--PRODUCT UNIT */}
      <TextField
        className={styles.price}
        size="small"
        label="Единична цена"
        type="number"
        slotProps={{ htmlInput: { step: "0.01" } }}
        value={deliveryItem?.unitPrice || ""}
        onChange={(e) =>
          updateDeliveryItem(rowId, {
            unitPrice: Number(e.target.value),
          })
        }
        required
        {...customInvalidProps("Цената е задължителна")}
      />
      {/* //--PRODUCT LOT */}
      <TextField
        className={styles.lot}
        size="small"
        label="Партиден номер"
        type="text"
        value={deliveryItem?.lotNumber || ""}
        onChange={(e) =>
          updateDeliveryItem(rowId, { lotNumber: e.target.value })
        }
      />
      {/* //--PRODUCT EXPIRATION DATE */}
      <DatePicker
        className={styles.expDate}
        label="Срок на годност"
        value={parseISO(deliveryItem?.expirationDate ?? "")}
        onChange={(date) =>
          updateDeliveryItem(rowId, {
            expirationDate: date?.toISOString(),
          })
        }
        slotProps={{ textField: { size: "small" } }}
      />
      {/* //--PRODUCT NOTES */}
      <TextField
        className={styles.notes}
        size="small"
        label="Бележка"
        type="text"
        value={deliveryItem?.notes || ""}
        onChange={(e) => updateDeliveryItem(rowId, { notes: e.target.value })}
      />
    </div>
  );
}
