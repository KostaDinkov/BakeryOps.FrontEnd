import { dateToString } from "../../system/utils";
import { DeliveryDTO } from "../../Types/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function ({
  setSelectedItem,
  data,
}: {
  setSelectedItem: React.Dispatch<DeliveryDTO | null>;
  data: DeliveryDTO[];
}) {
  const columns: GridColDef[] = [
    {
      headerName: "Дата",
      field: "deliveryDate",
      valueFormatter: (value) => dateToString(value),
    },
    {
      headerName: "Доставчик",
      field: "vendorName",
    },
  ];
  return (
    <>
      <h2>Доставки</h2>

      <DataGrid
        columns={columns}
        rows={data}
        rowHeight={30}
        onRowClick={(row) => setSelectedItem(row.row)}
        hideFooter
        disableColumnMenu
        autosizeOptions={{
          includeHeaders: true,
          includeOutliers: true,
          outliersFactor: 5,
          
        }}
      />
    </>
  );
}
