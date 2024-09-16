import { z } from "zod";

const roomValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty("Name is required"),
        roomNo: z.number().int().positive("Room number must be positive").refine(value => Number.isInteger(value), "Room number must be an integer"),
        floorNo: z.number().int().positive("Floor number must be positive").max(5, "Floor number cannot exceed 5"),
        capacity: z.number().int().positive("Capacity must be positive").refine(value => Number.isInteger(value), "Capacity must be an integer"),
        pricePerSlot: z.number().positive("Price per slot must be positive"),
        amenities: z.array(z.string().nonempty("Amenity cannot be empty")),
        isDeleted: z.boolean().optional(),

    })
})


const updateRoomValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty("Name is required").optional(),
        roomNo: z.number().int().positive("Room number must be positive").refine(value => Number.isInteger(value), "Room number must be an integer").optional(),
        floorNo: z.number().int().positive("Floor number must be positive").max(5, "Floor number cannot exceed 5").optional(),
        capacity: z.number().int().positive("Capacity must be positive").refine(value => Number.isInteger(value), "Capacity must be an integer").optional(),
        pricePerSlot: z.number().positive("Price per slot must be positive").optional(),
        amenities: z.array(z.string().nonempty("Amenity cannot be empty")).optional(),
        isDeleted: z.boolean().optional(),
    }),
});



export const roomValidation = {
    roomValidationSchema,
    updateRoomValidationSchema
}