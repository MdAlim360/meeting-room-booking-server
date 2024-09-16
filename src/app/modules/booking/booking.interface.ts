import { Schema } from "mongoose";

export type TBooking = {
    date: Date;
    slots: Schema.Types.ObjectId[];
    room: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    totalAmount?: number;
    isConfirmed: 'confirmed' | 'unconfirmed' | 'cancelled';
    isDeleted: boolean;
    transaction: string;
}