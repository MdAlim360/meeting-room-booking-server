import httpStatus from "http-status";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import AppError from "../../errors/appError";
import QueryBuilder from "../../builder/queryBuilder";
import { slotSearchableFields } from "./slot.constant";

const createSlotInToDb = async (payload: TSlot) => {
    const newSlots = [];
    const tempData = { ...payload }; // Clone the payload to avoid mutating the input
    const slotTime = 60; // Slot duration in minutes

    // Parse start time
    const [startHourStr, startMinuteStr] = payload.startTime.split(':');
    const startHour = parseInt(startHourStr, 10);
    const startMinute = parseInt(startMinuteStr, 10);
    const startTotalMinutes = startHour * 60 + startMinute;

    // Parse end time
    const [endHourStr, endMinuteStr] = payload.endTime.split(':');
    const endHour = parseInt(endHourStr, 10);
    const endMinute = parseInt(endMinuteStr, 10);
    const endTotalMinutes = endHour * 60 + endMinute;

    // Check for existing slots
    const existingSlots = await Slot.find({
        room: payload.room,
        date: payload.date,
        $or: [
            { startTime: { $lt: payload.endTime }, endTime: { $gt: payload.startTime } }
        ]
    });

    if (existingSlots.length > 0) {
        throw new AppError(httpStatus.CONFLICT, "Slots overlap with existing slots");
    }

    //end time can not be exceeds than 24 hours
    if (endTotalMinutes > 1440) {
        throw new AppError(httpStatus.CONFLICT, "End time can not be exceeds more than 24 hours ");
    }

    // Calculate total duration and number of slots
    const totalDuration = endTotalMinutes - startTotalMinutes;
    const numberOfSlots = Math.floor(totalDuration / slotTime);

    for (let i = 0; i < numberOfSlots; i++) {
        const currentStartTotalMinutes = startTotalMinutes + i * slotTime;
        const currentEndTotalMinutes = currentStartTotalMinutes + slotTime;

        // Stop if the end time of the current slot exceeds the provided end time
        if (currentEndTotalMinutes > endTotalMinutes) {
            break;
        }

        const currentStartHour = Math.floor(currentStartTotalMinutes / 60);
        const currentStartMinute = currentStartTotalMinutes % 60;
        const currentEndHour = Math.floor(currentEndTotalMinutes / 60);
        const currentEndMinute = currentEndTotalMinutes % 60;

        const startTimeFormatted = `${currentStartHour.toString().padStart(2, '0')}:${currentStartMinute.toString().padStart(2, '0')}`;
        const endTimeFormatted = `${currentEndHour.toString().padStart(2, '0')}:${currentEndMinute.toString().padStart(2, '0')}`;

        newSlots.push({

            room: tempData.room,
            date: tempData.date,
            startTime: startTimeFormatted,
            endTime: endTimeFormatted,
            isBooked: false,
        });
    }

    const addSlots = await Slot.create(newSlots);
    return addSlots

};

const getSlotFromDb = async (query: Record<string, unknown>) => {
    const slotQuery = new QueryBuilder(Slot.find(), query).filter();  // Apply filtering first
    const populatedQuery = slotQuery.modelQuery.populate('room');     // Populate the 'room' field
    const result = await populatedQuery;

    if (result.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Slots are not available');
    }

    return result;
}

const getSlotByRoomIdFromDb = async (roomId: string) => {
    const result = await Slot.find({ room: roomId });  // Find the slot by roomId in the database
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');  // Handle if the slot is not found
    }
    return result;
};

const updateSlotInToDb = async (id: string, payload: Partial<TSlot>) => {
    try {
        const result = await Slot.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true
            }
        )
        return result;

    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update room!');
    }
}

const deleteSlotFromDb = async (id: string) => {
    const result = await Slot.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};
export const slotService = {
    createSlotInToDb,
    getSlotFromDb,
    updateSlotInToDb,
    deleteSlotFromDb,
    // getSingleSlotFromDb
    getSlotByRoomIdFromDb
};
