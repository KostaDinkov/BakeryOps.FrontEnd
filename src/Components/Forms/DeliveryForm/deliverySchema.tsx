import { z } from "zod";
import { DeliveryDTO } from "../../../Types/types";

 const deliverySchemaDefinition = {
  id: z.string().uuid().optional(),
  deliveryDate: z.string({required_error:"Моля изберете дата на доставката"}).datetime(),
  vendorId: z.string({
    required_error: "Изберете доставчик от падащото меню",
  }).uuid(),
  invoiceNumber: z
    .string({
      required_error: "Полето Номер на документ е задължително",
    })
    .regex(/^\d{10}$/,{message:"Номер на документ трябва да съдържа точно 10 цифри"}),
  notes: z.string().optional().nullable(),

  items: z.array(
    z.object({
      id: z.string().uuid().optional(),
      materialId: z.string({
        required_error: "Изберете материал от падащото меню",
      }).uuid(),
      quantity: z.coerce.number({
        required_error: "Полето Количество е задължително",
        invalid_type_error: "Количество трябва да е положително число",
      }).positive(),
      unitPrice: z.coerce.number({
        required_error: "Полето Единична цена е задължително",
        invalid_type_error: "Единична цена трябва да е полoжително число",
      }).positive(),
      expirationDate: z.string().datetime().optional().nullable(),
      lotNumber: z.string().optional().nullable(),
      vat: z.number().positive().optional(),
      notes: z.string().optional().nullable()
    })
  ).nonempty({
    message: "Добавете поне един артикул към доставката",
  }),
} satisfies { [K in keyof DeliveryDTO]?: z.ZodTypeAny };

export const deliverySchema = z.object(deliverySchemaDefinition)
export type DeliveryFormType = z.infer<typeof deliverySchema>;
