import { TextField, Button, Checkbox, FormLabel } from "@mui/material";
import { z } from "zod";
import { fieldLabels } from "../system/strings";


export default function AutoForm<T>({
  selectedItem,
  schema,
  onSubmit,
  onDelete,
}: {
  selectedItem: T;

  schema: z.ZodTypeAny;
  onSubmit: (data: T) => void;
  onDelete: (id: string) => void;
}) {
  const mode = selectedItem === null ? "create" : "update";

  console.log(schema.shape);
  console.log(selectedItem);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: any = {};

    Object.keys(schema.shape).forEach((key) => {
      console.log(formData.get(key));
      data[key] = schema.shape[key].parse(formData.get(key));
    });

    if (mode === "create") {
      onSubmit(data);
    } else {
      data.id = selectedItem.id;
      onSubmit(data);
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(schema.shape).map((key) => {
        return (() => {
          switch (true) {
            case schema.shape[key] instanceof z.ZodString:
              return (
                <div key={key}>
                  <TextField
                    label={fieldLabels[key] || key}
                    name={key}
                    id={key}
                    defaultValue={selectedItem[key]}
                  />
                </div>
              );
            case schema.shape[key] instanceof z.ZodNumber:
              return (
                <div key={key}>
                  <input
                    placeholder={fieldLabels[key] || key}
                    name={key}
                    type="number"
                  />
                </div>
              );
            case schema.shape[key] instanceof z.ZodBoolean:
              return (
                <div key={key}>
                  <FormLabel htmlFor={key}>{fieldLabels[key] || key}</FormLabel>
                  <Checkbox
                    id={key}
                    name={key}
                    defaultChecked={selectedItem[key]}
                  />
                </div>
              );
          }
        })();
      })}

      <Button variant="contained" color="primary" type="submit">
        Запази{" "}
      </Button>
    </form>
  );
}
