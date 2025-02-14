import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import GenericGridView from "./GenericGridView";

export type ViewConfigItem<T> = {
  [K in keyof T]?:
    | {
        label: string;
        valueFormatter?: (value: T[K]) => any;
        columnDef?: never;
      }
    | { label: string; columnDef: GridColDef[]; valueFormatter?: never };
};

interface ItemDetailsProps<T> {
  item: T;
  viewConfig: ViewConfigItem<T>[];
}

export default function ItemDetails<T>({
  item,
  viewConfig,
}: ItemDetailsProps<T>) {
  // Split configs into normal ones and grid ones
  const normalConfigs = viewConfig.filter((cfg) => {
    const config = Object.values(cfg)[0] as
      | { label: string; columnDef?: GridColDef }
      | undefined;
    return !(config && config.columnDef);
  });
  const gridConfigs = viewConfig.filter((cfg) => {
    const config = Object.values(cfg)[0] as
      | { label: string; columnDef?: GridColDef }
      | undefined;
    return config && config.columnDef;
  });

  return (
    <Paper sx={{ p: 2 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Детайли</Typography>
      </Box>
      {/* Table for normal configurations */}
      <TableContainer>
        <Table size="small">
          <TableBody>
            {normalConfigs.map((cfg, index) => {
              const [key, config] = Object.entries(cfg)[0]! as [
                keyof T,
                {
                  label: string;
                  valueFormatter: (value: T[keyof T]) => any;
                  columnDef?: never;
                }
              ];
              const value = item[key as keyof T];
              // If a valueFormatter is provided, use it
              const renderedValue =
                typeof config === "object" &&
                config !== null &&
                "valueFormatter" in config &&
                typeof config.valueFormatter === "function"
                  ? config.valueFormatter(value)
                  : typeof value === "boolean"
                  ? value
                    ? "Да"
                    : "Не"
                  : value || "—";
              return (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                    {config?.label ?? key}
                  </TableCell>
                  <TableCell>{renderedValue}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render grid views for configs with columnDef */}
      {gridConfigs.map((cfg, index) => {
        const [key, config] = Object.entries(cfg)[0]! as  [
          keyof T,
          {
            label: string;
            valueFormatter: (value: T[keyof T]) => any;
            columnDef?: GridColDef[];
          }
        ];
        const gridItems = (item[key as keyof T] as any[]) || [];
        return gridItems.length > 0 ? (
          <Box key={index} mt={2}>
            <Typography variant="h6" mb={1}>
              {config?.label ?? "Без Име"}
            </Typography>
            <GenericGridView
              items={gridItems}
              columnsDef={
          (config as { label: string; columnDef: GridColDef[] }).columnDef
              }
            />
          </Box>
        ) : null;
      })}
    </Paper>
  );
}
