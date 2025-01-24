import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

interface RHFAutocompleteProps<T extends { id: string }, TForm extends FieldValues>
  extends Omit<
    AutocompleteProps<T, false, false, false>,
    'renderInput' | 'onChange' | 'value'
  > {
  control: Control<TForm>;
  name: Path<TForm>;
  label?: string;
  required?: boolean;
  options: T[];
  getOptionLabel: (option: T) => string;
}

export default function RHFAutocomplete<T extends { id: string }, TForm extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options,
  getOptionLabel,
  ...autocompleteProps
}: RHFAutocompleteProps<T, TForm>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => {
        // Handle both string (free text) and object (selected option) values
        const currentValue = typeof value === 'string' 
          ? value 
          : options.find(option => option.id === value?.id) || null;

        return (
          <>
            <Autocomplete
              {...autocompleteProps}
              {...rest}
              options={options}
              
              value={currentValue}
              getOptionLabel={(option) => 
                typeof option === 'string' ? option : getOptionLabel(option)
              }
              isOptionEqualToValue={(option, value) => {
                if (typeof value === 'string') return option.id === value;
                return option.id === value?.id;
              }}
              onChange={(_, newValue) => {
                if (typeof newValue === 'string') {
                  // Store free text directly
                  onChange(newValue);
                } else if (newValue?.id) {
                  // Store ID when selecting from options
                  onChange(newValue.id);
                } else {
                  // Handle clear action
                  onChange(null);
                }
              }}
              onInputChange={(_, newInputValue) => {
                // Update immediately for free text input
                if (!options.some(option => option.id === newInputValue)) {
                  onChange(newInputValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  required={required}
                  error={!!error}
                />
              )}
            />
            {error && (
              <FormHelperText error sx={{ mx: '14px', mt: '4px' }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}