import { NextFunction, Response, Request } from "express";
import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import User from '../models/user';
import user from "../models/user";

declare global {
    namespace Express {
      interface Request {
        user?: typeof User;
      }
    }
  }

// check if user is authenticated or not
const authAndAuthorize = (...roles: string[]) => {
    return async (req, res: Response, next: NextFunction) => {
      // Check if user is authenticated
      const { token } = req.cookies;
  
      if (!token) {
        return next(new ErrorHandler('Login First to access resources', 401));
      }
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

  
        if (!user) {
          return next(new ErrorHandler('User not found', 404));
        }
  
        // Check if user is authorized
        if (!roles.includes(user.role)) {
          return next(new ErrorHandler(`Role (${user.role}) does not have access to this resource`, 403));
        }

        req.user = user;

        next();
        
      } catch (error) {
        return next(new ErrorHandler('Unauthorized access', 401));
      }
    };
  };




const isAuthenticatedBearerUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

  
    if (!token) {
      return next(new ErrorHandler('Login First to access resources', 401));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id);
      next();
    } catch (err) {
      return next(new ErrorHandler('Invalid Token', 401));
    }
  });

export {authAndAuthorize, isAuthenticatedBearerUser}