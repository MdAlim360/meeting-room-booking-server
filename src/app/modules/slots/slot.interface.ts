import { ObjectId } from "mongodb";

export type TSlot = {
    // _id:string;
    room: ObjectId;
    date: Date;
    startTime: string; // Assuming time is in HH:MM format
    endTime: string; // Assuming time is in HH:MM format
    isBooked: boolean;
    isDeleted: boolean
}