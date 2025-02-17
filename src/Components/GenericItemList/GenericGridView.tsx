import { dateToString } from "../../system/utils";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import styles from "./GenericGridView.module.css";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import Typography from "@mui/material/Typography";

export type GenericGridViewProps<T> = {
    items:T[];
    columnsDef:GridColDef[];
}

export default function GenericGridView<T>({
  items,
  columnsDef,
}:GenericGridViewProps<T>) {

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [cellValue, setCellValue] = useState<string>("");

  const handleCellClick = (params: GridCellParams, event: React.MouseEvent) => {
    const formattedValue = params.formattedValue ?? params.value;
    const cellText = formattedValue as string;

    // Check if the rendered cell content is trimmed:
    // The content is considered trimmed if its scrollWidth is greater than its clientWidth.
    const targetElement = event.currentTarget as HTMLElement;
    if (targetElement.scrollWidth > targetElement.clientWidth) {
      setCellValue(cellText);
      setAnchorEl(targetElement);
    } else {
      // Do not open the popover if the content is fully visible.
      setAnchorEl(null);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //#region Returns
  return (
    items && (
        <>
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

          onCellClick={handleCellClick}
        //   initialState={{pinnedColumns: {left: ["materialName"]}}}
        />
        <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{cellValue}</Typography>
      </Popover>
        </>
    )
  );
  //#endregion
}
