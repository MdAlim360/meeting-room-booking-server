import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date: { type: Date, required: true },
    slots: [
        {
            type: Schema.Types.ObjectId,
            ref: "Slot", required: true
        }
    ],
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room", required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", required: true
    },
    totalAmount: {
        type: Number,
    },

    isConfirmed: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'cancelled'],
        default: 'unconfirmed'
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
    transaction: {
        type: String,

    }
},
    { timestamps: true });

const Booking = model<TBooking>("Booking", bookingSchema);

export default Booking;