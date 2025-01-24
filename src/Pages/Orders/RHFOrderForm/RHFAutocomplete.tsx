import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

interface RHFAutocompleteProps<T, TForm extends FieldValues>
  extends Omit<
    AutocompleteProps<T, false, false, false>,
    'renderInput' | 'onChange' | 'value'
  > {
  control: Control<TForm>;
  name: Path<TForm>;
  label?: string;
  required?: boolean;
  options: Array<T & { id: string }> ;
  getOptionLabel: (option: T) => string;
  transformValue: (value: T | null) => any | null;
}

export default function RHFAutocomplete<T, TForm extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options,
  getOptionLabel,
  transformValue,
  ...autocompleteProps
}: RHFAutocompleteProps<T, TForm>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field:{value, onChange, ...rest}, fieldState: { error } }) => (
        <>
          <Autocomplete
            defaultValue={null}
            value={options.find(o=>o?.id === value) || value}
            {...autocompleteProps}
            {...rest}
            options={options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(_, newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                required={required}
                error={!!error}
              />
            )}
            freeSolo
            
          />
          {error && (
            <FormHelperText error sx={{ mx: '14px', mt: '4px' }}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}