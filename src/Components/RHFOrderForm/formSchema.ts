import { z } from "zod";

export const orderFormSchema = z.object({
    id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
    deliveryDate: z.string().datetime().optional(),
    clientId: z.string({}).optional(),
    clientPhone: z.string().optional().nullable(),
    clientName: z.string().optional().nullable(),
    isPaid: z.boolean().default(false),
    advancePayment: z.number().positive().optional(),
    pickupDate: z.string().datetime({offset:true}),
    orderItems: z.array(
        z.object({
            id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
            productId: z.string({
                required_error: "Изберете материал от падащото меню",
            }).uuid(),
            productAmount: z.number({
                required_error: "Полето Количество е задължително",
                invalid_type_error: "Количество трябва да е положително число",
            }).positive(),
            description: z.string().optional(),
            cakeFoto: z.string().optional(),
            cakeTitle: z.string().optional(),
            itemUnitPrice: z.number().positive().optional(),
            isInProgress: z.boolean().default(false),
            isComplete: z.boolean().default(false),

        })
    ).nonempty({
        message: "Добавете поне един артикул към поръчката",
    }),
});

export type OrderFormSchemaType = z.infer<typeof orderFormSchema>;