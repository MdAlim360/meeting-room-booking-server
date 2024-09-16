import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const result = await userService.createUserIntoDb(userData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is create successfully",
        data: result
    })


})

const getAllUsers = catchAsync(async (req, res) => {
    const result = await userService.getAllUsersFromDb();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All user retrieved successfully",
        data: result
    })
})

const updateUsers = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await userService.updateUsersIntoDb(id, updateData);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User update successfully',
        data: result,
    })
})

export const userController = {
    createUser,
    getAllUsers,
    updateUsers
}