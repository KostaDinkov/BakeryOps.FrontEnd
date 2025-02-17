import { RecipeFormType } from "../../../Components/Forms/RecipesForm/RecipesFormSchema";
import FormWithData from "../../../Components/GenericForm/FormWithData";
import TitleBar from "../../../Components/TitleBar/TitleBar";
import { FormDataProvider } from "../../../Components/GenericForm/FormDataProvider";
import { RecipeDTO } from "../../../Types/types";
import { recipeSchema } from "../../../Components/Forms/RecipesForm/RecipesFormSchema";
import RecipesFormFields from "../../../Components/Forms/RecipesForm/RecipesFormFields";
import {
  useMaterialsQuery,
  useProductsQuery,
  useRecipesQuery,
  useUnitsQuery,
} from "../../../API/Queries/queryHooks";

export default function RecipeFormIndex() {
  const productsQuery = useProductsQuery();
  const unitsQuery = useUnitsQuery();
  const materialsQuery = useMaterialsQuery();
  const recipesQuery = useRecipesQuery();
  if (
    materialsQuery.isLoading ||
    recipesQuery.isLoading ||
    productsQuery.isLoading ||
    unitsQuery.isLoading
  ) {
    return <div>Loading...</div>;
  }
  if (
    materialsQuery.isError ||
    recipesQuery.isError ||
    productsQuery.isError ||
    unitsQuery.isError
  ) {
    return <div>Error...</div>;
  }
  return (
    <div>
      <TitleBar title="Рецепти - редактиране" />
      <FormDataProvider<RecipeDTO, RecipeFormType>
        endpoints={{
          create: "/api/Recipes/AddRecipe",
          update: "/api/Recipes/UpdateRecipe",
        }}
        messages={{
          createSuccess: "",
          createError: "",
          updateSuccess: "",
          updateError: "",
        }}
        queryKey="recipes"
        data={{
          materials: materialsQuery.data,
          subRecipes: recipesQuery.data,
          units: unitsQuery.data,
          products: productsQuery.data,
        }}
        zodSchema={recipeSchema}
        FormFields={RecipesFormFields}
      />
    </div>
  );
}
