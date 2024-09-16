import { NextFunction, Request, RequestHandler, Response } from "express";

//* avoid repetition of try catch by using higher function//
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    };
};
export default catchAsync;