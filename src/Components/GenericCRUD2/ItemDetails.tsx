import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";

interface ItemDetailsProps<T> {
  item: T;
  onEditClick?: () => void;
}

export default function ItemDetails<T extends Record<string, any>>({
  item,
  onEditClick,
}: ItemDetailsProps<T>) {
  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Детайли</Typography>
        {onEditClick && (
          <Button variant="contained" onClick={onEditClick}>
            Edit
          </Button>
        )}
      </Box>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {Object.keys(item).map((key) => (
              <TableRow key={key}>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>{key}</TableCell>
                <TableCell>
                  {typeof item[key] === "boolean"
                    ? item[key]
                      ? "Да"
                      : "Не"
                    : item[key] || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
