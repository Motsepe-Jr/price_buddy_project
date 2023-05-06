import { Request, Response, NextFunction } from 'express';

export default catchAsyncErrors => (req:Request, res:Response, next:NextFunction) => 

    Promise.resolve(catchAsyncErrors(req, res, next)).catch(next)
