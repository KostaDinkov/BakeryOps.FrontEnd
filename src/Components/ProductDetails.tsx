import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { ProductDTO } from "../Types/types";

interface ProductDetailsProps {
  product: ProductDTO;
  onSubmit?: (data: ProductDTO) => void;
}

export default function ProductDetails({
  product,
  onSubmit,
}: ProductDetailsProps) {
  const [editMode, setEditMode] = useState(false);
  const { control, handleSubmit, reset } = useForm<ProductDTO>({
    defaultValues: product,
  });

  const handleCancel = () => {
    reset(product);
    setEditMode(false);
  };

  const submitHandler = (data: ProductDTO) => {
    setEditMode(false);
    onSubmit && onSubmit(data);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Детайли</Typography>
        {editMode ? null : (
          <Button variant="contained" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        )}
      </Box>
      {!editMode ? (
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  sx={{ fontWeight: "bold", width: "30%" }}
                >
                  Име
                </TableCell>
                <TableCell>{product.name || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  Код
                </TableCell>
                <TableCell>{product.code || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  Категория
                </TableCell>
                <TableCell>{product.category || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  Цена дребно
                </TableCell>
                <TableCell>
                  {product.priceDrebno !== undefined
                    ? product.priceDrebno.toFixed(2)
                    : "—"}{" "}
                  лв.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  Цена едро
                </TableCell>
                <TableCell>{product.priceEdro?.toFixed(2)} лв.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  Активен
                </TableCell>
                <TableCell>{product.isActive ? "Да" : "Не"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  С намаление
                </TableCell>
                <TableCell>{product.hasDiscount ? "Да" : "Не"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  В ценова листа
                </TableCell>
                <TableCell>{product.inPriceList ? "Да" : "Не"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{ fontWeight: "bold", width: "30%" }}
                  >
                    Име
                  </TableCell>
                  <TableCell>{product.name || "—"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    Код
                  </TableCell>
                  <TableCell>{product.code || "—"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    Категория
                  </TableCell>
                  <TableCell>{product.category || "—"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    Цена Дребно
                  </TableCell>
                  <TableCell>
                    {product.priceDrebno !== undefined
                      ? product.priceDrebno.toFixed(2)
                      : "—"}{" "}
                    лв.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    Цена едро
                  </TableCell>
                  <TableCell>{product.priceEdro?.toFixed(2)} лв.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    Активен?
                  </TableCell>
                  <TableCell>{product.isActive ? "Да" : "Не"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    Намаление?
                  </TableCell>
                  <TableCell>
                    <Controller
                      name="hasDiscount"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value || false}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          }
                          label=""
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    В ценова листа
                  </TableCell>
                  <TableCell>
                    <Controller
                      name="inPriceList"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value || false}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          }
                          label=""
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      )}
    </Paper>
  );
}
