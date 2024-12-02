import { UseQueryResult } from "@tanstack/react-query";
import { components } from "../../API/apiSchema";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  TextField,
} from "@mui/material";
import styles from "./IngredientsInput.module.scss";
import { MaterialDTO,RecipeDTO } from "../../Types/types";

export default function IngredientsInputs({
  itemQuery,
  buttonText,
  itemsQuantity,
  setItems,
}: {
  itemQuery: UseQueryResult<MaterialDTO[] | RecipeDTO[], Error>;
  buttonText: string;
  itemsQuantity: { [key: string]: { item: MaterialDTO | RecipeDTO; quantity: number } |null };
  setItems: React.Dispatch<
    React.SetStateAction<{
      [key: string]: { item: MaterialDTO | RecipeDTO; quantity: number } | null;
    } >
  >;
}) {
  if (itemQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    itemQuery.data &&(
    <div>
      <ul>
        {Object.keys(itemsQuantity).map((key) => (
          <li className={styles.selectInput} key={key}>
            <Autocomplete
              options={itemQuery.data}
              getOptionLabel={(option) => option?.name || ""}
              value={itemQuery.data?.find(
                (item) => item.id === itemsQuantity[key]?.item.id
              )||null}
              onChange={(event, value) => {
                setItems({
                  ...itemsQuantity,
                  [key]: { ...itemsQuantity[key], item: value },
                });
              }}
              renderInput={function (
                params: AutocompleteRenderInputParams
              ): React.ReactNode {
                return <TextField {...params} label="Съставка" size="small" />;
              }}
            />
            <TextField
              label="Количество"
              type="number"
              size="small"
              value={itemsQuantity[key]?.quantity || ""}
              onChange={(e) => {
                setItems({
                  ...itemsQuantity,
                  [key]: { ...itemsQuantity[key], quantity: Number(e.target.value) },
                });
              }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                setItems(
                  Object.fromEntries(
                    Object.entries(itemsQuantity).filter(([k, v]) => k !== key)
                  )
                );
              }}
            >
              X
            </Button>
          </li>
        ))}
      </ul>

      <Button
        variant="outlined"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          const guid = crypto.randomUUID();
          setItems({ ...itemsQuantity, [guid]: null});
        }}
      >
        {buttonText}
      </Button>
    </div>)
  );
}
