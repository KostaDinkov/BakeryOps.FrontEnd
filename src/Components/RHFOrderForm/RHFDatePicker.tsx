import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  addDays,
  formatISO,
  getHours,
  getMinutes,
  setHours,
  startOfDay,
} from "date-fns";
import { useState } from "react";
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
      render={({ field }) => {
        const [error, setError] = useState<string | null>(null);
        const handleDateChange = (newValue: Date | null) => {
          if (!newValue) {
            field.onChange(null);
            return;
          }

          // Custom validation example
          const isWeekend = newValue.getDay() === 0;
          const isValidTime =
            getHours(newValue) >= 9 && getHours(newValue) < 19;

          if (isWeekend) {
            setError("Weekend dates are not allowed");
          } else if (!isValidTime) {
            setError("Outside business hours (9 AM - 5 PM)");
          } else {
            setError(null);
            field.onChange(formatISO(newValue));
          }
        };

        return (
          <DateTimePicker
          label="За дата и час"
            viewRenderers={{
              hours: renderDigitalClockTimeView,
              minutes: null,
            }}
            views={["year", "month", "day", "hours"]}
            openTo="day"
            slotProps={{
              textField: {
                error: !!error,
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
            value={field.value || null}
            onChange={(newValue) => handleDateChange(newValue)}
            format="dd/MM/yyyy HH:mm"
            disablePast // formatISO is used to convert the date to a string
          />
        );
      }}
    />
  );
}
