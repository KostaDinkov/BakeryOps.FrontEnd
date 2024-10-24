import {  UseQueryResult } from "@tanstack/react-query";
import { components } from "../../API/apiSchema";

import Select from "react-select";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./IngredientsInput.module.scss";

type MaterialDTO = components["schemas"]["MaterialDTO"];
type RecipeDTO = components["schemas"]["RecipeDTO"];
const IngredientField = ({
  id,
  data,
  type,
  defaultIngredient
  
}: {
  id: string;
  data: MaterialDTO[] | RecipeDTO[] ;
  type: "material" | "subRecipe";
  defaultIngredient?: { materialId:string, quantity:number }|{subRecipeId:string, quantity:number};
  
}) => {
  let defaultItem: MaterialDTO | RecipeDTO | undefined = undefined;
  if(defaultIngredient){
    defaultItem = data.find(item => item.id === (defaultIngredient as any)[`${type}Id`]);
  }
  
  return (
    <>
      <Select
        options={data?.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
        name={`${type}-${id}`}
        defaultValue={defaultItem ? {value:defaultItem.id, label:defaultItem.name}: null}
      />
      <TextField
        label="Количество"
        type="number"
        name={`${type}-${id}-quantity`}
        size="small"
        inputProps={{step:"any"}}
        defaultValue={defaultIngredient?.quantity}
      />

    </>
  );
};
export default function IngredientsInputs({
  itemQuery,
  buttonText,
  type,
  defaultIngredients
}: {
  itemQuery: UseQueryResult<any, Error>;
  buttonText: string;
  type: "material" | "subRecipe";
  defaultIngredients?: ({ materialId:string, quantity:number }|{subRecipeId:string, quantity:number})[] | undefined | null;
}) {
  const [ingredientsList, setIngredientsList] = useState<{id:string, element:JSX.Element}[]>(defaultIngredients?defaultIngredients.map((item) => {
    const guid = crypto.randomUUID();
    return {
    id:guid,
    element:
    <IngredientField
      defaultIngredient={item}
      id={guid}      
      data={itemQuery.data}
      type={type}
    />}
}):[]);
  

  if (itemQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>{ingredientsList.map(ingredient=>
        <li className={styles.selectInput} key={ingredient.id}>
        {ingredient.element}
        <Button
          variant="outlined"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            setIngredientsList(ingredientsList.filter((item) => item.id !== ingredient.id));
          }}>
            X
          </Button>
        </li>
      )}</ul>

      <Button
        variant="outlined"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          const guid = crypto.randomUUID();
          setIngredientsList([
            ...ingredientsList,
            {id:guid, element:
              <IngredientField
              key={guid}
              id={guid}
              data={itemQuery.data}
              type={type}
            />},
          ]);
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
}
