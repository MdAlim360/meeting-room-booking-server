import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { roomService } from "./room.service";
import { Request, Response } from "express";

const createRoom = catchAsync(async (req, res) => {
    const roomData = req.body;
    const result = await roomService.createRoomIntoDb(roomData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Room is created successfully",
        data: result
    })
})

const getAllRooms = catchAsync(async (req, res) => {
    const result = await roomService.getAllRoomsFromDb(req.query);
    console.log(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rooms are retrieved successfully',
        data: result,
    });
})
const getSingleRoom = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await roomService.getSingleRoomFromDb(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room is retrieved successfully',
        data: result,
    });
})

const updateRoom = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await roomService.updateRoomInToDb(id, updateData);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room update successfully',
        data: result,
    })
})
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await roomService.deleteRoomFromDb(id);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room is deleted successfully',
        data: result,
    })
})

export const roomController = {
    createRoom,
    getAllRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom,
}