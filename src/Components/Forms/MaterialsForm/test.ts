import { z, ZodTypeAny } from 'zod';

interface MaterialDTO {
  name: string;
  categoryId: string;
  // phone not in MaterialDTO
}

function createMaterialFormSchema<T extends { [K in keyof MaterialDTO]?: ZodTypeAny }>(schema: T) {
  return z.object(schema).strict();
}

export const materialFormSchema = createMaterialFormSchema({
  name: z.string().min(3, "Името трябва да е поне 3 символа"),
  categoryId: z.string().min(1, "Категорията е задължителна"),
  phone: z.string().min(1, "Телефонът е задължителен"), // Expect typescript error here
});

console.log(materialFormSchema);