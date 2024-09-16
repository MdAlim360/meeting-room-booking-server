import { z } from 'zod';
const userValidationSchema = z.object({
    body: z.object({
        name: z.string().max(20),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string(),
        address: z.string().max(50),
        role: z.enum(['user', 'admin']),
    })
})

export const userValidation = {
    userValidationSchema
}