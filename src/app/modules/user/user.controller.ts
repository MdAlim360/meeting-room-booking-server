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

export const userController = {
    createUser
}