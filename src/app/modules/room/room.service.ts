import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";
import QueryBuilder from "../../builder/queryBuilder";
import { roomSearchableFields } from "./room.constant";

const createRoomIntoDb = async (payload: TRoom) => {
    try {
        const newRoom = await Room.create(payload);
        return newRoom
    } catch (error: any) {
        throw new Error(error)
    }
}

const getAllRoomsFromDb = async (query: Record<string, unknown>) => {

    const productQuery = new QueryBuilder(
        Room.find(),
        query,
    )
        .search(roomSearchableFields)
        .filter()
        .sort()

    const result = await productQuery.modelQuery;


    return {
        result,
    }

}
const getSingleRoomFromDb = async (id: string) => {
    const result = await Room.findById(id);
    return result;
}

const updateRoomInToDb = async (id: string, payload: Partial<TRoom>) => {
    try {
        const result = await Room.findByIdAndUpdate(
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

const deleteRoomFromDb = async (id: string) => {
    const result = await Room.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const roomService = {
    createRoomIntoDb,
    getAllRoomsFromDb,
    getSingleRoomFromDb,
    updateRoomInToDb,
    deleteRoomFromDb
}