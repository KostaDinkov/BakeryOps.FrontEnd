import { z } from "zod";
import { DeliveryDTO } from "../../Types/types";

export const deliverySchema: z.ZodSchema<DeliveryDTO> = z.object({
  id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
  deliveryDate: z.string().datetime().optional(),
  vendorId: z.string().uuid(),
  invoiceNumber: z
    .string({
      required_error: "Полето Номер на документ е задължително",
      invalid_type_error: "Номер на документ трябва да е текст от 10 цифри",
    })
    .regex(/^\d{10}$/),
  notes: z.string().nullable().default(null),

  items: z.array(
    z.object({
      id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
      materialId: z.string().uuid(),
      quantity: z.number().positive(),
      unitPrice: z.number().positive(),
      expirationDate: z.string().datetime().optional(),
      lotNumber: z.string().optional(),
      vat: z.number().positive().optional(),
      notes: z.string().optional(),
    })
  ),
});
