import { z } from "zod";
import { OrderDTO } from "../../Types/types";

export const orderFormSchema: z.ZodSchema<OrderDTO> = z.object({
    id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
    deliveryDate: z.string().datetime().optional(),
    clientId: z.string({
        required_error: "Изберете клиент от падащото меню",
    }).uuid(),
    client:z.object({
        id: z.string().uuid(),
        name: z.string(),
    }),
    clientPhone: z.string({required_error:"Телефонът е задължителен"}).min(10, {"message": "Телефонът трябва да е от минимум 10 символа"}).regex(/^\d+$/, {"message": "Телефонът трябва да съдържа само цифри"}),
    clientName: z.string({required_error:"Името на клиента е задължително"}).min(3, {"message": "Името на клиента трябва да е от минимум 3 символа"}),
    operatorId: z.string().uuid(),
    isPaid: z.boolean().default(false),
    advancePayment: z.number().positive().optional(),
    status: z.number().int().default(0),
    deliveryId: z.string({
        required_error: "Изберете доставка от падащото меню",
    }).uuid(),
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
            itemUnitPrice: z.number().positive(),
            isInProgress: z.boolean().default(false),
            isComplete: z.boolean().default(false),
            
        })
    ).nonempty({
        message: "Добавете поне един артикул към поръчката",
    }),
});

export type OrderFormSchemaType = z.infer<typeof orderFormSchema>;