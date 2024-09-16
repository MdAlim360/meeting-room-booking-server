import { z } from "zod";

export const bookingValidationSchema = z.object({
    body: z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),
        slots: z.array(z.string()).nonempty("Slots are required"),
        room: z.string().nonempty("Room is required"),
        user: z.string().nonempty("User is required"),
        totalAmount: z.number().optional(),  // Calculated, not required in input
        isConfirmed: z.enum(['confirmed', 'unconfirmed', 'cancelled']).optional(),  // Default value
        isDeleted: z.boolean().optional()  // Default value
    })

});

export const bookingValidation = {
    bookingValidationSchema
}
