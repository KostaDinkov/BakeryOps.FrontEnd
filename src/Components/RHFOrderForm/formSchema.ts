import { z } from "zod";

export const orderFormSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    clientId: z.string({message:"Въведете име на клиента"}).min(3,{message: "Името на клиента трябва да бъде минимум 3 символа"}),
    clientPhone: z.string().optional().nullable(),
    clientName: z.string().optional().nullable(),
    isPaid: z.boolean().default(false),
    advancePaiment: z.number().nonnegative().default(0),
    pickupDate: z.date({message: "Изберете дата за поръчката"}),
    orderItems: z.array(
        z.object({
            productId: z.string({
                required_error: "Изберете материал от падащото меню",
            }).uuid({message: "Изберете материал от падащото меню"}),
            productAmount: z.number({
                required_error: "Полето е задължително",
            }).positive({message: "Трябва да е положително число"}),
            description: z.string().optional().nullable(),
            cakeFoto: z.string().optional().nullable(),
            cakeTitle: z.string().optional().nullable(),
            isInProgress: z.boolean().default(false),
            isComplete: z.boolean().default(false),

        })
    ).nonempty({
        message: "Добавете поне един артикул към поръчката",
    }),
});

export type OrderFormSchemaType = z.infer<typeof orderFormSchema>;