import { DateTimePicker } from "@mui/x-date-pickers";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  addDays,
  formatISO,
  getHours,
  getMinutes,
  setHours,
  startOfDay,
} from "date-fns";
import { useState, useEffect } from "react";
import {
  renderTimeViewClock,
  renderDigitalClockTimeView,
} from "@mui/x-date-pickers/timeViewRenderers";

interface RHFDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export default function RHFDatePicker<T extends FieldValues>({
  control,
  name,
}: RHFDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const [error, setError] = useState<string | null>(
          fieldState.error?.message || null
        );

        // Watch for fieldState changes
        useEffect(() => {
          setError(fieldState.error?.message || null);
        }, [fieldState.error]);

        const handleDateChange = (newValue: Date | null) => {
          if (!newValue) {
            field.onChange(null);
            setError(null);
            return;
          }

          const isWeekend = newValue.getDay() === 0;
          const isValidTime = getHours(newValue) >= 9 && getHours(newValue) < 19;

          if (isWeekend) {
            setError("Поръчки за неделя не се приемат");
            field.onChange(null);
          } else if (!isValidTime) {
            setError("Извън работно време (9:00 - 19:00)");
            field.onChange(null);
          } else {
            setError(null);
            field.onChange(newValue);
          }
        };

        return (
          <DateTimePicker
            label="За дата и час"
            value={field.value}
            onChange={handleDateChange}
            viewRenderers={{
              hours: renderDigitalClockTimeView,
              minutes: null,
            }}
            views={["year", "month", "day", "hours"]}
            openTo="day"
            slotProps={{
              textField: {
                error: Boolean(error),
                helperText: error,
              },
            }}
            skipDisabled
            minTime={setHours(startOfDay(new Date()), 9)}
            shouldDisableDate={(date) => date.getDay() === 0}
            shouldDisableTime={(timeValue, view) => {
              const h = getHours(timeValue);
              if (view === "hours") return h < 9 || h >= 19;
              return false;
            }}
            timeSteps={{ minutes: 30 }}
            format="dd/MM/yyyy HH:mm"
            disablePast // formatISO is used to convert the date to a string
          />
        );
      }}
    />
  );
}
