import { dateToString } from "../../system/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./GenericGridView.module.css";

export type GenericGridViewProps<T> = {
    items:T[];
    columnsDef:GridColDef[];
}

export default function GenericGridView<T>({
  items,
  columnsDef,
}:GenericGridViewProps<T>) {

 

  //#region Returns
  return (
    items && (

        <DataGrid
          className={styles.container}
          sx={{ backgroundColor: "white", margin: "1rem 1rem 1rem 0", display:"grid" }}
          rows={items}
          columns={columnsDef}
          hideFooter
          rowHeight={30}
          disableColumnResize
          disableColumnSorting
          disableColumnMenu
        //   initialState={{pinnedColumns: {left: ["materialName"]}}}
        />
    )
  );
  //#endregion
}
