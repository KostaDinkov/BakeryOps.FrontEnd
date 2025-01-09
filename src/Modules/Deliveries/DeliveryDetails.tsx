import { DeliveryDTO, MaterialDTO, Unit, VendorDTO } from "../../Types/types";
import styles from "./itemDetails.module.css";
import { dateToString } from "../../system/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function ItemDetails({
  selectedItem,
  
}: {
  selectedItem: DeliveryDTO | null;
  queryData: { vendors: VendorDTO[]; materials: MaterialDTO[]; units: Unit[] };
}) {
  const columns: GridColDef[] = [
    {
      field: "materialName",
      headerName: "Стока",
      headerClassName: "bg-white",
      description: "Име на стоката",
    },
    {
      field: "quantity",
      headerName: "Кол.",
      description: "Количество на стоката",
      headerClassName: "bg-white",
    },
    {
      field: "materialUnit",
      headerName: "Мярка",
      description: "Мярка на стоката",
      headerClassName: "bg-white",
    },
    {
      field: "unitPrice",
      headerName: "Ед.цена",
      description: "Цена на стоката",
      headerClassName: "bg-white",
    },
    {
      field: "totalPrice",
      headerName: "Цена",
      description: "Обща цена за стоката",
      headerClassName: "bg-white",
      valueGetter: (value, row) => row.quantity * row.unitPrice,
    },
    {
      field: "lotNumber",
      headerName: "Партида",
      description: "Партиден номер",
      headerClassName: "bg-white",
    },
    {
      field: "expirationDate",
      headerName: "Годност",
      description: "Срок на годност",
      headerClassName: "bg-white",
      valueFormatter: (value) => dateToString(value),
    },
    {
      field: "notes",
      headerName: "Бележка",
      description: "Бележка",
      headerClassName: "bg-white",
    },
  ];
  return (
    selectedItem && (
      <>
        <div className={styles.deliveryInfo}>
          <div>Доставчик:</div>
          <div className="font-bold">{selectedItem.vendorName}</div>
          <div>От дата:</div>
          <div className="font-bold">
            {dateToString(selectedItem.deliveryDate)}
          </div>
          <div>Документ:</div>
          <div className="font-bold">{selectedItem.invoiceNumber}</div>
          <div>Сума:</div>
          <div className="font-bold">{selectedItem.total}</div>
          <div>ДДС: </div>
          <div className="font-bold">{selectedItem.tax}</div>
          <div>Общо:</div>
          <div className="font-bold">{selectedItem.totalWithTax}</div>
          {selectedItem.notes?.length > 0 && (
            <>
              <div>Бележки:</div>
              <div>{selectedItem.notes}</div>
            </>
          )}
        </div>

        <div className="w-full">
          <DataGrid
            sx={{ backgroundColor: "white", margin: "1rem 1rem 1rem 0" }}
            rows={selectedItem.items}
            columns={columns}
            autosizeOnMount
            hideFooter
            rowHeight={30}
            disableColumnResize
          />
        </div>
      </>
    )
  );
}
