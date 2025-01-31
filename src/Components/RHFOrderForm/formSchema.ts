import { z } from "zod";

export const orderFormSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    clientId: z.string({}).optional().nullable(),
    clientPhone: z.string().optional().nullable(),
    isPaid: z.boolean().default(false),
    advancePayment: z.number().nonnegative().default(0),
    pickupDate: z.date(),
    orderItems: z.array(
        z.object({
            id: z.number().optional(),
            productId: z.string({
                required_error: "Изберете материал от падащото меню",
            }).uuid(),
            productAmount: z.number({
                required_error: "Полето Количество е задължително",
                invalid_type_error: "Количество трябва да е положително число",
            }).positive(),
            description: z.string().optional().nullable(),
            cakeFoto: z.string().optional().nullable(),
            cakeTitle: z.string().optional().nullable(),
            itemUnitPrice: z.number().positive().optional(),
            isInProgress: z.boolean().default(false),
            isComplete: z.boolean().default(false),

        })
    ).nonempty({
        message: "Добавете поне един артикул към поръчката",
    }),
});

export type OrderFormSchemaType = z.infer<typeof orderFormSchema>;