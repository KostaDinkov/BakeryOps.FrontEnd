import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  TextField,
  FormControlLabel,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";

interface ItemFormProps<T> {
  defaultValues: T;
  onSubmit: (data: T) => void;
  onCancel: () => void;
}

export default function ItemForm<T extends Record<string, any>>({
  defaultValues,
  onSubmit,
  onCancel,
}: ItemFormProps<T>) {
  const { control, handleSubmit, reset, getValues } = useForm<T>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const submitHandler = (data: T) => {
    onSubmit(data);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Детайли</Typography>
      </Box>
      <form onSubmit={handleSubmit(submitHandler)}>
        <TableContainer>
          <Table size="small">
            <TableBody>
              {Object.keys(getValues()).map((key) => (
                <TableRow key={key}>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>{key}</TableCell>
                  <TableCell>
                    {typeof getValues()[key] === "boolean" ? (
                      <Controller
                        name={key as any}
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
                      <Controller
                        name={key as any}
                        control={control}
                        render={({ field }) => <TextField {...field} size="small" />}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
