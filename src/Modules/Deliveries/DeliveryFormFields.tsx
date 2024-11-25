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
import styles from "./deliveries.module.scss";


export default function DeliveryFormFields({
  selectedItem,
  queryData,
  handleSave,
  Buttons,
}: {
  selectedItem: DeliveryDTO | null;
  queryData: { materials: MaterialDTO[]; units: Unit[]; vendors: VendorDTO[] };
  handleSave: (item: any) => void;
  Buttons: React.ReactNode;
}) {

  const getDeliveryItems=(items:DeliveryItemDTO[]|null)=>{
    let result:{ [key: string]: DeliveryItemDTO } = {};
    if (items === null) return result;
    for (const item of items) {
      result[item.id] = item;
    }
    return result;
  }
  
  const [deliveryItems, setDeliveryItems] = useState<{
    [key: string]: DeliveryItemDTO;
  }>(getDeliveryItems(selectedItem?.items ?? null));

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryDTO | null>(
    selectedItem
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const delivery = {
      ...deliveryInfo,
      items: Object.values(deliveryItems),
    };

    handleSave(delivery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Номер на документ"
        required
        value={deliveryInfo?.invoiceNumber}
        onChange={(e) =>
          setDeliveryInfo({ ...deliveryInfo, invoiceNumber: e.target.value })
        }
      />
      <DatePicker
        label="Дата на документ"
        value={parseISO(deliveryInfo?.deliveryDate ?? "")
        }
        onChange={(date) =>{
          setDeliveryInfo({
            ...deliveryInfo,
            deliveryDate: date?.toISOString(),
          })
          
        }
          
        }
      />
      <Autocomplete
        options={queryData.vendors}
        getOptionLabel={(option) => option.name || ""}
        onChange={(event, value) => {
          setDeliveryInfo({ ...deliveryInfo, vendorId: value?.id });
        }}
        value={queryData.vendors.find((v) => v.id === deliveryInfo?.vendorId)}
        renderInput={function (
          params: AutocompleteRenderInputParams
        ): React.ReactNode {
          return <TextField {...params} label="Доставчик" />;
        }}
      />

      <TextField
        label="Бележки"
        name="notes"
        value={deliveryInfo?.notes}
        onChange={(e) =>
          setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })
        }
      />
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
  deliveryItems: { [key: string]: DeliveryItemDTO };
  setDeliveryItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: DeliveryItemDTO }>
  >;
}) {
  const inputRowsFromDeliveryItems = (deliveryItems:{ [key: string]: DeliveryItemDTO })=>{
    let result:{ [key: string]: JSX.Element} = {};
    if (deliveryItems === null) return result;
    for (const key in deliveryItems) {
      result[key] = InputRow(key);
    }
    return result;
  }
  
  const [inputRows, setInputRows] = useState<{
    [key: string]: JSX.Element;
  }>(inputRowsFromDeliveryItems(deliveryItems));

  //fixme
  const updateDeliveryItem = (key: string, property: any) => {
    setDeliveryItems((deliveryItems) => {
      const deliveryItemsCopy = { ...deliveryItems };
      deliveryItemsCopy[key] = { ...deliveryItemsCopy[key], ...property };
      return deliveryItemsCopy;
    });
  };

  

  function InputRow(key:string)  {
    return (
      <div className={styles.deliveryRow}>
        <Autocomplete
          options={materials}
          getOptionLabel={(option) => option.name || ""}
          onChange={(event, value) => {
            updateDeliveryItem(key, { materialId: value?.id });
          }}
          value={materials.find((m) => m.id === deliveryItems[key]?.materialId)}
          renderInput={function (
            params: AutocompleteRenderInputParams
          ): React.ReactNode {
            return <TextField {...params} label="Име на стока" />;
          }}
        />
        <TextField
          label="Количество"
          type="number"
          slotProps={{ htmlInput: { step: "0.01" } }}
          value={deliveryItems[key]?.quantity}
          onChange={(e) =>
            updateDeliveryItem(key, {
              quantity: Number(e.target.value),
            })
          }
        />
        <TextField
          label="Единична цена"
          type="number"
          slotProps={{ htmlInput: { step: "0.01" } }}
          value={deliveryItems[key]?.unitPrice}
          onChange={(e) =>
            updateDeliveryItem(key, {
              unitPrice: Number(e.target.value),
            })
          }
        />
        <TextField
          label="Партиден номер"
          type="text"
          value={deliveryItems[key]?.lotNumber}
          onChange={(e) =>
            updateDeliveryItem(key, { lotNumber: e.target.value })
          }
        />
        <DatePicker
          label="Срок на годност"
          value={parseISO(
            deliveryItems[key]?.expirationDate ?? ""
           
           
          )}
          onChange={(date) =>
            updateDeliveryItem(key, {
              expirationDate: date?.toISOString(),
            })
          }
        />
        <TextField
          label="Бележка"
          type="text"
          value={deliveryItems[key]?.notes}
          onChange={(e) => updateDeliveryItem(key, { notes: e.target.value })}
        />
      </div>
    );
  };
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
            [key]: InputRow(key),
          });
        }}
      >
        Добави стока
      </Button>
    </>
  );
}
