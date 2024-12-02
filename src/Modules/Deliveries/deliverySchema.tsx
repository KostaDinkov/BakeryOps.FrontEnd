import { z } from "zod";
import { DeliveryDTO } from "../../Types/types";

export const deliverySchema: z.ZodSchema<DeliveryDTO> = z.object({
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  deliveryDate: z.string().datetime().optional(),
  vendorId: z.string({
    required_error: "Изберете доставчик от падащото меню",
    
  }).uuid(),
  invoiceNumber: z
    .string({
      required_error: "Полето Номер на документ е задължително",
      invalid_type_error: "Номер на документ трябва да е текст от 10 цифри",
    })
    .regex(/^\d{10}$/,{message:"Номер на документ трябва да съдържа точно 10 цифри"}),
  notes: z.string().nullable().default(null),

  items: z.array(
    z.object({
      id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
      materialId: z.string({
        required_error: "Изберете материал от падащото меню",
      }).uuid(),
      quantity: z.number({
        required_error: "Полето Количество е задължително",
        invalid_type_error: "Количество трябва да е положително число",
      }).positive(),
      unitPrice: z.number({
        required_error: "Полето Единична цена е задължително",
        invalid_type_error: "Единична цена трябва да е полoжително число",
      }).positive(),
      expirationDate: z.string().datetime().optional(),
      lotNumber: z.string().optional(),
      vat: z.number().positive().optional(),
      notes: z.string().optional(),
    })
  ).nonempty({
    message: "Добавете поне един артикул към доставката",
  }),
});
