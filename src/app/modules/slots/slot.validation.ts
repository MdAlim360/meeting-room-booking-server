import { z } from 'zod';

const slotValidationSchema = z.object({
    body: z.object({
        // _id: z.string(),
        room: z.string().nonempty("Room is required"), // Expecting room ID as a string
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),
        startTime: z.string().nonempty("Start time is required").regex(/^\d{2}:\d{2}$/, "Invalid time format, format will be (HH:MM)"),
        endTime: z.string().nonempty("End time is required").regex(/^\d{2}:\d{2}$/, "Invalid time format, format will be (HH:MM)"),
        isBooked: z.boolean().optional(),
    }),
});

const updateSlotValidationSchema = z.object({
    body: z.object({
        room: z.string().optional(),
        date: z.string().optional().refine(
            (value) => value === undefined || /^\d{4}-\d{2}-\d{2}$/.test(value),
            { message: "Date must be in format YYYY-MM-DD" }
        ),
        startTime: z.string().optional().refine(
            (value) => value === undefined || /^\d{2}:\d{2}$/.test(value),
            { message: "Invalid time format, format will be (HH:MM)" }
        ),
        endTime: z.string().optional().refine(
            (value) => value === undefined || /^\d{2}:\d{2}$/.test(value),
            { message: "Invalid time format, format will be (HH:MM)" }
        ),
        isBooked: z.boolean().optional(),
        isDeleted: z.boolean().optional(),
    })
});

export const slotValidation = {
    slotValidationSchema,
    updateSlotValidationSchema
}