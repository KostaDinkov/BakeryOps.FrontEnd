import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";
import { RecipeFormType } from "./RecipesFormSchema";
//import { useFormData } from "../../../Providers/FormDataProvider";
import RHFAutocomplete from "../../RHFOrderForm/RHFAutocomplete";
import { MaterialDTO, RecipeDTO } from "../../../Types/types";
import styles from "./RecipesFormFields.module.css";

export default function RecipesFormFields({
  data,
}: {
  data: Record<string, any>;
}) {
  const { control } = useFormContext<RecipeFormType>();
  // Removed useFormData hook
  const { materials = [], subRecipes = [], units = [], products = [] } = data;

  // Field array for ingredients (materials)
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  // Field array for sub recipes
  const {
    fields: subRecipeFields,
    append: appendSubRecipe,
    remove: removeSubRecipe,
  } = useFieldArray({
    control,
    name: "subRecipes",
  });

  return (
    <div className={styles.formFieldsContainer}>
      <div className={styles.multiInputRow}>
        {/* //--Product */}
        <RHFAutocomplete<RecipeDTO, RecipeFormType>
          control={control}
          name="productId"
          options={products}
          getOptionLabel={(option) => option.name}
          label="Продукт"
          size="small"
        />
        {/* //--Name */}
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Име"
              size="small"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
      </div>

      <div className={styles.multiInputRow}>
        {/* //-- Yield */}
        <Controller
          control={control}
          name="yield"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Изходно количество"
              size="small"
              type="number"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
        {/* //-- Unit */}
        <RHFAutocomplete<RecipeDTO, RecipeFormType>
          control={control}
          name="unitId"
          options={units}
          getOptionLabel={(option) => option.name}
          label="Мерна единица"
          size="small"
        />
        {/* //--Human hours */}
        <Controller
          control={control}
          name="workHours"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Човеко-часове"
              size="small"
              type="number"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
      </div>
      {/* //--Description */}
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Описание"
            size="small"
            multiline
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      {/* //-- Materials */}
      <div>
        <Typography variant="h6" sx={{margin:"1rem 0"}}>Материали</Typography>
        {ingredientFields.map((field, index) => (
          <div key={field.id} className={styles.itemInputRow}>
            <RHFAutocomplete<MaterialDTO & { id: string }, RecipeFormType>
              control={control}
              name={`ingredients.${index}.materialId`}
              options={materials}
              getOptionLabel={(option) => option.name}
              size="small"
              label="Материал"
            />
            <Controller
              control={control}
              name={`ingredients.${index}.quantity`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Количество"
                  size="small"
                  type="number"
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeIngredient(index)}
            >
              Премахни
            </Button>
          </div>
        ))}
        <Button
          variant="outlined"
          onClick={() => appendIngredient({ materialId: "", quantity: 0 })}
        >
          Добави материал
        </Button>
      </div>
      {/* //-- Sub recipes */}
      <div>
      <Typography variant="h6" sx={{margin:"1rem 0"}} >Под-рецепти</Typography>
        {subRecipeFields.map((field, index) => (
          <div key={field.id} className={styles.itemInputRow}>
            <RHFAutocomplete<RecipeDTO, RecipeFormType>
              control={control}
              name={`subRecipes.${index}.subRecipeId`}
              options={subRecipes}
              getOptionLabel={(option: any) => option.name}
              size="small"
              label="Под-рецепта"
            />
            <Controller
              control={control}
              name={`subRecipes.${index}.quantity`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Количество"
                  size="small"
                  type="number"
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeSubRecipe(index)}
            >
              Премахни
            </Button>
          </div>
        ))}
        <Button
          variant="outlined"
          onClick={() => appendSubRecipe({ subRecipeId: "", quantity: 0 })}
        >
          Добави под-рецепта
        </Button>
      </div>
    </div>
  );
}
