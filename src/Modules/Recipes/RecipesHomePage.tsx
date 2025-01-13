import GenericCRUDView, {
  IItemOperations,
  ItemFormType,
} from "../../Components/GenericCRUD/GenericCRUD";
import { components } from "../../API/apiSchema";
import { apiClient } from "../../API/apiClient";
import { Autocomplete, Button, TextField } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import IngredientsInputs from "./IngredientsInputs";
import { z } from "zod";
import { useItemsQuery } from "../../API/crudOperations";
import { useState } from "react";
import { handleApiResponse } from "../../API/apiUtils";
import { Unit } from "../../Types/types";
import {twoColumnGrid} from "../../styles/globalStyles.module.css"

type RecipeDTO = components["schemas"]["RecipeDTO"];
type MaterialDTO = components["schemas"]["MaterialDTO"];
type Product = components["schemas"]["Product"];

const recipeSchema: z.ZodSchema<RecipeDTO> = z.object({
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  name: z.string().min(3).max(50),
  lastUpdated: z.string().optional(),
  productId: z.string().uuid().nullable().default(null),
  yield: z
    .number()
    .positive("Изходното количество трябва да е положително число")
    .default(0),
  workHours: z
    .number()
    .positive("Човеко-часовете трябва да са положително число")
    .default(0),
  ingredients: z.array(
    z.object({
      materialId: z.string().uuid(),
      quantity: z
        .number()
        .positive(
          "Количеството на съставката трябва да бъде положително число"
        ),
    })
  ),
  subRecipes: z.array(
    z.object({
      subRecipeId: z.string().uuid(),
      quantity: z
        .number()
        .positive(
          "Количеството на под-рецептата трябва да бъде положително число"
        ),
    })
  ),

  description: z.string().nullable().default(null),
});

export default function RecipesHomePage() {
  const productsQuery: UseQueryResult<Product[], Error> = useItemsQuery({
    queryKey: "products",
    url: "/api/Products/GetAllProducts",
  });
  const materialsQuery: UseQueryResult<MaterialDTO[], Error> = useItemsQuery({
    queryKey: "materials",
    url: "/api/Materials/GetMaterials",
  });
  const recipesQuery: UseQueryResult<RecipeDTO[], Error> = useItemsQuery({
    queryKey: "recipes",
    url: "/api/Recipes/GetRecipes",
  });
  const unitsQuery: UseQueryResult<Unit[], Error> = useItemsQuery({
    queryKey: "units",
    url: "/api/Units/GetUnits",
  });

  const RecipesList: React.FC<{
    setSelectedItem: React.Dispatch<RecipeDTO | null>;
    data: RecipeDTO[];
  }> = ({ setSelectedItem, data }) => {
    return (
      <div>
        {data &&
          data.map((recipe: RecipeDTO) => (
            <div key={recipe.id} onClick={() => setSelectedItem(recipe)}>
              {recipe.name}
            </div>
          ))}
      </div>
    );
  };

  const RecipeDetails: React.FC<{ selectedItem: RecipeDTO | null }> = ({
    selectedItem,
  }) => {
    return (
      selectedItem && (
        <dl className={twoColumnGrid}>
          <dt>Рецепта за:</dt>
          <dd>{selectedItem.name}</dd>
          <dt>Изходно количество</dt>
          <dd>{selectedItem.yield}</dd>
          <dt>Човекочасове</dt>
          <dd>{selectedItem.workHours}</dd>
          <dt>Съставки</dt>
          <dd>
            <ul>
              {selectedItem.ingredients?.map((ingredient) => (
                <li key={ingredient.materialId}>
                  {
                    materialsQuery.data?.find(
                      (m) => m.id === ingredient.materialId
                    )?.name
                  }{" "}
                  - {ingredient.quantity}
                </li>
              ))}
            </ul>
          </dd>
          <dt>Под-рецепти</dt>
          <dd>
            <ul>
              {selectedItem.subRecipes?.map((subRecipe) => (
                <li key={subRecipe.subRecipeId}>
                  {
                    recipesQuery.data?.find(
                      (r) => r.id === subRecipe.subRecipeId
                    )?.name
                  }{" "}
                  - {subRecipe.quantity}
                </li>
              ))}
            </ul>
          </dd>
          <dt>Себестойност</dt>
          <dd>{selectedItem.cost}</dd>
        </dl>
      )
    );
  };

  const RecipesForm: ItemFormType<RecipeDTO> = ({
    selectedItem,
    handleSave,
    Buttons,
  }) => {
    const [materialsQtty, setMaterialsQtty] = useState<{
      [key: string]: { item: MaterialDTO; quantity: number };
    }>(
      Object.fromEntries(
        selectedItem?.ingredients?.map((i) => [
          i.materialId,
          {
            item:
              materialsQuery.data?.find((m) => m.id === i.materialId) || null,
            quantity: i.quantity,
          },
        ]) || []
      )
    );
    const [subRecipesQtty, setSubRecipesQtty] = useState<{
      [key: string]: { item: RecipeDTO; quantity: number };
    }>(
      Object.fromEntries(
        selectedItem?.subRecipes?.map((r) => [
          r.subRecipeId,
          {
            item:
              recipesQuery.data?.find((i) => i.id === r.subRecipeId) || null,
            quantity: r.quantity,
          },
        ]) || []
      )
    );
    const [formData, setFormData] = useState<RecipeDTO | null>(selectedItem);

    const handleSubmit = (e) => {
      e.preventDefault();

      const ingredients = Object.keys(materialsQtty).map((key) => ({
        materialId: materialsQtty[key]?.item.id,
        quantity: Number(materialsQtty[key]?.quantity),
      }));

      const subRecipes = Object.keys(subRecipesQtty).map((key) => ({
        subRecipeId: subRecipesQtty[key]?.item.id,
        quantity: Number(subRecipesQtty[key]?.quantity),
      }));

      let newRecipe = { ...formData, ingredients, subRecipes };
      console.log(newRecipe);
      handleSave(newRecipe);
    };
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label="Име"
          value={formData?.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label htmlFor="product">За продукт</label>
        <Autocomplete
          options={productsQuery.data}
          getOptionLabel={(option) => option.name}
          value={productsQuery.data?.find(
            (p) => p.id === selectedItem?.productId
          )}
          onChange={(event, value) => {
            setFormData({ ...formData, productId: value?.id });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Продукт" size="small" />
          )}
          name="product"
        />

        <TextField
          label="Изходно Количество"
          value={formData?.yield || ""}
          onChange={(e) =>
            setFormData({ ...formData, yield: Number(e.target.value) })
          }
        />
        <Autocomplete
          options={unitsQuery.data}
          getOptionLabel={(option) => option.name}
          value={
            unitsQuery.data?.find((u) => u.id === formData?.unitId) || null
          }
          onChange={(event, value) => {
            setFormData({ ...formData, unitId: value?.id });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Мерна единица" size="small" />
          )}
        />

        <TextField
          label="Човекочасове"
          value={formData?.workHours || ""}
          onChange={(e) =>
            setFormData({ ...formData, workHours: Number(e.target.value) })
          }
        />

        <IngredientsInputs
          itemsQuantity={materialsQtty}
          setItems={setMaterialsQtty}
          itemQuery={materialsQuery}
          buttonText="Добави съставка (стока)"
          type="material"
        />
        <IngredientsInputs
          itemsQuantity={subRecipesQtty}
          setItems={setSubRecipesQtty}
          itemQuery={recipesQuery}
          buttonText="Добави под-рецепта"
          type="subRecipe"
        />
        <Buttons />
      </form>
    );
  };

  const recipesOperations: IItemOperations<RecipeDTO> = {
    queryKey: ["recipes"],
    getItems: async () =>
      await handleApiResponse(
        async () => await apiClient.GET("/api/Recipes/GetRecipes")
      ),
    createItem: async (item: RecipeDTO) =>
      await handleApiResponse(
        async () =>
          await apiClient.POST("/api/Recipes/AddRecipe", {
            body: item,
          })
      ),
    updateItem: async (item: RecipeDTO) =>
      await handleApiResponse(
        async () =>
          await apiClient.PUT("/api/Recipes/UpdateRecipe", {
            body: item,
          })
      ),
    deleteItem: async (id: string) =>
      await handleApiResponse(
        async () =>
          await apiClient.DELETE("/api/Recipes/DeleteRecipe/{id}", {
            params: { path: { id } },
          })
      ),
  };
  return (
    <GenericCRUDView
      title={"Рецепти"}
      ItemForm={RecipesForm}
      ItemsList={RecipesList}
      ItemDetails={RecipeDetails}
      itemSchema={recipeSchema}
      itemOperations={recipesOperations}
      newBtnText={"Добави рецепта"}
    />
  );
}

function parseIngredients(formData: any, type: "material" | "subRecipe") {
  let ingredients: { [typeId: string]: string | number }[] = [];
  const regex = new RegExp(
    `^${type}-[0-9A-Fa-f]{8}[-]?(?:[0-9A-Fa-f]{4}[-]?){3}[0-9A-Fa-f]{12}$`,
    "is"
  );
  Object.keys(formData)
    .filter((key) => key.match(regex))
    .forEach((key) =>
      ingredients.push({
        [`${type}Id`]: formData[key],
        quantity: Number(formData[`${key}-quantity`]),
      })
    );
  return ingredients;
}
