import GenericCRUDView, {
  IItemOperations,
} from "../Nomenclature/GenericCRUD/GenericCRUD";
import { components } from "../../API/apiSchema";
import { apiClient } from "../../API/apiClient";
import { Button, TextField } from "@mui/material";
import Select from "react-select";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import IngredientsInputs from "./IngredientsInputs";
import { z } from "zod";

type RecipeDTO = components["schemas"]["RecipeDTO"];
type MaterialDTO = components["schemas"]["MaterialDTO"];
type Product = components["schemas"]["Product"];

const recipeSchema: z.ZodSchema<RecipeDTO> = z.object({
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  name: z.string().min(3).max(50),
  lastUpdated: z.string().optional(),
  productId: z.string().uuid().nullable().default(null),
  yield: z.number().positive("Изходното количество трябва да е положително число").default(0),
  workHours: z.number().positive("Човеко-часовете трябва да са положително число").default(0),
  ingredients: z.array(
    z.object({
      materialId: z.string().uuid(),
      quantity: z.number().positive("Количеството на съставката трябва да бъде положително число"),
    })
  ),
  subRecipes: z.array(
    z.object({
      subRecipeId: z.string().uuid(),
      quantity: z.number().positive("Количеството на под-рецептата трябва да бъде положително число"),
    })
  ),
  
  description: z.string().nullable().default(null),
});

export default function RecipesHomePage() {
  const productsQuery: UseQueryResult<Product[], Error> = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Products/GetAllProducts");
      return response.data;
    },
  });
  const materialsQuery: UseQueryResult<MaterialDTO[], Error> = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Materials/GetMaterials");
      return response.data;
    },
  });
  const recipesQuery: UseQueryResult<RecipeDTO[], Error> = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await apiClient.GET("/api/Recipes/GetRecipes");
      return response.data;
    },
  });

  const RecipesList: React.FC<{
    setSelectedItem: React.Dispatch<RecipeDTO | null>;
    data: RecipeDTO[];
  }> = ({ setSelectedItem, data }) => {
    console.log(data);
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
        <dl>
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
                  } - {subRecipe.quantity}
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      )
    );
  };

  const handleSubmit =  (formData:any) => {
    
    const ingredients = parseIngredients(formData, "material");
    const subRecipes = parseIngredients(formData, "subRecipe");

    let recipe: RecipeDTO = {
      name: formData.name,
      productId: formData.product || null,
      yield: Number(formData.yield),
      workHours: Number(formData.workHours),
      ingredients: ingredients,
      subRecipes: subRecipes,
    };
    console.log(recipe);
    return recipe;
   
  };

  const RecipesFormFields: React.FC<{
    selectedItem: RecipeDTO | null;
  }> = ({ selectedItem }) => {
    return (
      <>
        <TextField
          label="Име"
          id="name"
          name="name"
          defaultValue={selectedItem?.name}
        />
        <label htmlFor="product">За продукт</label>
        <Select
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          options={productsQuery.data?.map(
            (product) => ({ value: product.id, label: product.name } as any)
          )}
          name="product"
          defaultValue={
            selectedItem
              ? {
                  value: productsQuery.data?.find(p=>p.id === selectedItem?.productId)?.id,
                  label: productsQuery.data?.find(p=>p.id === selectedItem?.productId)?.name ,
                }
              : undefined
          }
        />

        <TextField
          label="Изходно Количество"
          id="yield"
          name="yield"
          defaultValue={selectedItem?.yield}
        />

        <TextField
          label="Човекочасове"
          id="workHours"
          name="workHours"
          defaultValue={selectedItem?.workHours}
        />

        <IngredientsInputs
          defaultIngredients={selectedItem?.ingredients}
          itemQuery={materialsQuery}
          buttonText="Добави съставка (стока)"
          type="material"
        />
        <IngredientsInputs
          defaultIngredients={selectedItem?.subRecipes}
          itemQuery={recipesQuery}
          buttonText="Добави под-рецепта"
          type="subRecipe"
        />
      </>
    );
  };

  const recipesOperations: IItemOperations<RecipeDTO> = {
    queryKey: ["recipes"],
    getItems: async () => {
      const response = await apiClient.GET("/api/Recipes/GetRecipes");
      return response.data as unknown as RecipeDTO[];
    },
    createItem: async (item: RecipeDTO) => {
      const response = await apiClient.POST("/api/Recipes/AddRecipe", {
        body: item,
      });
      return response.data as unknown as RecipeDTO;
    },
    updateItem: async (item: RecipeDTO) => {
      const response = await apiClient.PUT("/api/Recipes/UpdateRecipe", {
        body: item,
      });
      return response.data as unknown as RecipeDTO;
    },
    deleteItem: async (id: string) => {
      await apiClient.DELETE("/api/Recipes/DeleteRecipe/{id}", {
        params: { path: { id } },
      });
      return;
    },
  };
  return (
    <GenericCRUDView
      title={"Рецепти"}
      ItemFormFields={RecipesFormFields}
      ItemsList={RecipesList}
      ItemDetails={RecipeDetails}
      itemSchema={recipeSchema}
      itemOperations={recipesOperations}
      customFormDataParse={handleSubmit}
    />
  );
}

function parseIngredients(formData: any, type: "material" | "subRecipe") {
  let ingredients: { [typeId:string]: string|number; }[] = [];
  const regex = new RegExp(`^${type}-[0-9A-Fa-f]{8}[-]?(?:[0-9A-Fa-f]{4}[-]?){3}[0-9A-Fa-f]{12}$`, "is");
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
