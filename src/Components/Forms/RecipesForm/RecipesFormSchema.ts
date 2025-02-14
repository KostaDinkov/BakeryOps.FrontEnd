import { z, ZodTypeAny } from "zod";
import { RecipeDTO } from "../../../Types/types";
import { data } from "react-router";

const recipeDefinition = {
  name: z.string().optional().nullable(),
  productId: z.string().uuid().optional().nullable(),
  yield: z.coerce
    .number()
    .positive("Изходното количество трябва да е положително число"),
  unitId: z.string().uuid(),
  workHours: z.coerce
    .number()
    .positive("Човеко-часовете трябва да са положително число"),

  ingredients: z
    .array(
      z.object({
        materialId: z.string().uuid(),
        quantity: z.coerce
          .number()
          .positive(
            "Количеството на съставката трябва да бъде положително число"
          ),
      })
    )
    .optional(),
  subRecipes: z
    .array(
      z.object({
        subRecipeId: z.string().uuid(),
        quantity: z.coerce
          .number()
          .positive(
            "Количеството на под-рецептата трябва да бъде положително число"
          ),
      })
    )
    .optional(),

  description: z.string().optional().nullable(),
} satisfies { [K in keyof RecipeDTO]?: ZodTypeAny };

export const recipeSchema = z
.object(recipeDefinition)
.refine((data)=> data.name?.trim()||data.productId,{
    message: "Името или продуктът трябва да бъдат попълнени",
})
export type RecipeFormType = z.infer<typeof recipeSchema>;
