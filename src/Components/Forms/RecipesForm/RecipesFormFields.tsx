import React from "react";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { RecipeFormType } from "./RecipesFormSchema";
import { useFormData } from "../../../Providers/FormDataProvider";
import RHFAutocomplete from "../../RHFOrderForm/RHFAutocomplete";
import { MaterialDTO, RecipeDTO } from "../../../Types/types";

export default function RecipesFormFields() {
  const { control } = useFormContext<RecipeFormType>();
  const { data } = useFormData();
  const materials = data?.materials || [];
  const subRecipes = data?.subRecipes || [];
  const units = data?.units || [];
  const products = data?.products || [];

  // Field array for ingredients (materials)
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  // Field array for subrecipes
  const {
    fields: subRecipeFields,
    append: appendSubRecipe,
    remove: removeSubRecipe,
  } = useFieldArray({
    control,
    name: "subRecipes",
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Name */}
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
      {/* Product*/}
        <RHFAutocomplete<RecipeDTO, RecipeFormType>
            control={control}
            name="productId"
            options={products}
            getOptionLabel={(option) => option.name}
            label="Продукт"
        />
      {/* Yield */}
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
      {/* Unit */}
        <RHFAutocomplete<RecipeDTO, RecipeFormType>
            control={control}
            name="unitId"
            options={units}
            getOptionLabel={(option) => option.name}
            label="Мерна единица"
        />
      {/* Човеко-часове */}
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
      {/* Описание */}
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Описание"
            size="small"
            multiline
            rows={4}
            error={!!error}
            helperText={error ? error.message : ""}
          />
        )}
      />
      {/* Материали */}
      <div>
        <h3>Материали</h3>
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <RHFAutocomplete<MaterialDTO & { id: string }, RecipeFormType>
              control={control}
              name={`ingredients.${index}.materialId`}
              options={materials}
              getOptionLabel={(option) => option.name}
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
      {/* Подрецепти */}
      <div>
        <h3>Подрецепти</h3>
        {subRecipeFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <RHFAutocomplete<RecipeDTO, RecipeFormType>
              control={control}
              name={`subRecipes.${index}.subRecipeId`}
              options={subRecipes}
              getOptionLabel={(option: any) => option.name}
              
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
          Добави подрецепт
        </Button>
      </div>
      {/* ...existing code for additional nested fields if needed... */}
    </div>
  );
}
