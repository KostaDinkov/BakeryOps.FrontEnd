import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect, useState } from 'react';

interface RHFAutocompleteProps<T extends { id: string }, TForm extends FieldValues>
  extends Omit<
    AutocompleteProps<T, false, false, false>,
    'renderInput' | 'onChange' | 'value' | 'inputValue'
  > {
  control: Control<TForm>;
  name: Path<TForm>;
  label?: string;
  required?: boolean;
  options: T[];
  freeText?: boolean;
  getOptionLabel: (option: T) => string;
  customOnChange?:(option: T|null) => void;
}

export default function RHFAutocomplete<T extends { id: string }, TForm extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options,
  getOptionLabel,
  customOnChange,
  freeText,
  ...autocompleteProps

}: RHFAutocompleteProps<T, TForm>) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => {
        // Sync input value with form value changes
        useEffect(() => {
          if (typeof value === 'string') {
            const option = options.find(o => o.id === value);
            setInputValue(option ? getOptionLabel(option) : value);
          } else {
            setInputValue('');
          }
        }, [value, options, getOptionLabel]);

        return (
          <div>
            <Autocomplete
              {...autocompleteProps}
              {...rest}
              freeSolo={freeText || false}
              defaultValue={null}
              options={options}
              inputValue={inputValue}
              onInputChange={(_, newValue) => {
                setInputValue(newValue);
                // Only update form value if it's not a valid option ID
                if (!options.some(o => o.id === newValue) && freeText) {
                  onChange(newValue);
                }
              }}
              getOptionLabel={(option) => 
                typeof option === 'string' ? option : getOptionLabel(option)
              }
              isOptionEqualToValue={(option, value) => {
                return option.id === (typeof value === 'string' ? value : value?.id);
              }}
              onChange={(_, newValue) => {
                customOnChange && customOnChange(newValue);
                if (typeof newValue === 'object' && newValue !== null) {
                  // Store ID when selecting from options
                  onChange(newValue.id);
                  setInputValue(getOptionLabel(newValue));
                } else if (newValue === null) {
                  // Handle clear action
                  onChange(null);
                  setInputValue('');
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
            
          </div>
        );
      }}
    />
  );
}