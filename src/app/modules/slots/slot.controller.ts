import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotService } from "./slot.service";
import { Request, Response } from "express";

const createSlot = catchAsync(async (req, res) => {
    const slotData = req.body;
    const result = await slotService.createSlotInToDb(slotData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "slots are created successfully",
        data: result
    })
});

const getSlots = catchAsync(async (req, res) => {
    const slotData = req.body;
    const result = await slotService.getSlotFromDb(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "slots are retrieved successfully",
        data: result
    })
});

const getSingleSlotByRoomId = catchAsync(async (req: Request, res: Response) => {
    const { roomId } = req.params;  // Extract the 'roomId' parameter from the request
    const result = await slotService.getSlotByRoomIdFromDb(roomId);  // Call the service to get the slot by roomId

    sendResponse(res, {
        statusCode: httpStatus.OK,  // HTTP 200 OK
        success: true,
        message: 'Slot is retrieved successfully',
        data: result,  // The slot data
    });
});

const updateSlot = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await slotService.updateSlotInToDb(id, updateData);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room update successfully',
        data: result,
    })
})
const deleteSlot = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await slotService.deleteSlotFromDb(id);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Slot is deleted successfully',
        data: result,
    })
})

export const slotController = {
    createSlot,
    getSlots,
    updateSlot,
    deleteSlot,
    getSingleSlotByRoomId
}