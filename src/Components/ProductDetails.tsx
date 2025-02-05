import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
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
  onEditChange?: (editMode: boolean) => void;
}

export default function ProductDetails({ product, onSubmit, onEditChange }: ProductDetailsProps) {
  const [editMode, setEditMode] = useState(false);
  const { control, handleSubmit, reset, getValues } = useForm<ProductDTO>({
    defaultValues: product,
  });

  // Reset the form whenever the product prop changes
  useEffect(() => {
    reset(product);
  }, [product, reset]);

  const handleCancel = () => {
    reset(product);
    setEditMode(false);
    onEditChange && onEditChange(false);
  };

  const submitHandler = (data: ProductDTO) => {
    setEditMode(false);
    onEditChange && onEditChange(false);
    onSubmit && onSubmit(data);
  };

  const startEditing = () => {
    setEditMode(true);
    onEditChange && onEditChange(true);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Детайли</Typography>
        {!editMode && (
          <Button variant="contained" onClick={startEditing}>
            Edit
          </Button>
        )}
      </Box>
      <form onSubmit={handleSubmit(submitHandler)}>
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Име</TableCell>
                <TableCell>{getValues("name") || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Код</TableCell>
                <TableCell>{product.code || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Категория</TableCell>
                <TableCell>{product.category || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Цена дребно</TableCell>
                <TableCell>
                  {product.priceDrebno !== undefined ? product.priceDrebno.toFixed(2) : "—"} лв.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Цена едро</TableCell>
                <TableCell>
                  {product.priceEdro !== undefined ? product.priceEdro.toFixed(2) : "—"} лв.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Активен</TableCell>
                <TableCell>{product.isActive ? "Да" : "Не"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Намаление?</TableCell>
                <TableCell>
                  {editMode ? (
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
                  ) : (
                    product.hasDiscount ? "Да" : "Не"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>В ценова листа</TableCell>
                <TableCell>
                  {editMode ? (
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
                  ) : (
                    product.inPriceList ? "Да" : "Не"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {editMode && (
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        )}
      </form>
    </Paper>
  );
}
