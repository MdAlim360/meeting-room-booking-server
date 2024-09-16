import { Request, Response } from "express";
import { paymentServices } from "./payment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const confirmationController = async (req: Request, res: Response) => {
    try {
        const { transactionId, status, id } = req.query;

        // Await the confirmationService to get the result
        const result = await paymentServices.confirmationService(transactionId as string, status as string, id as string);



        res.send(result);
    } catch (error) {
        console.error('Error in confirmationController:', error);

        sendResponse(res, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred while processing the payment confirmation.",
            data: null
        });
    }
}

export const paymentController = {
    confirmationController
}
