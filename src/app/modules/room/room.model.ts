import { Schema, model } from "mongoose";
import { TRoom } from "./room.interface";

export const roomSchema = new Schema<TRoom>({
    name: {
        type: String,
        required: true
    },
    roomNo: {
        type: Number,
        required: true,
        unique: true,
    },
    floorNo: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    pricePerSlot: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        required: true

    },
    image1: {
        type: String,


    },
    image2: {
        type: String,


    },
    image3: {
        type: String,


    },
    isDeleted: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    }
)

export const Room = model<TRoom>('Room', roomSchema)