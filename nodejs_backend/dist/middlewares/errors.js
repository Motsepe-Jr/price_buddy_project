"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = Object.assign({}, err);
        error.message = err.message;
        //  wrong mongoose object ID error
        if (err.name === 'CastError') {
            error.message = `Resource not found. Invalid: ${err.path}`;
        }
        // handle duplicate error
        if (err.code === 11000) {
            error.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        }
        // handle wrong jwt error
        if (err.name == 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid: Try Again Later';
            new errorHandler_1.default(message, 400);
        }
        // handle wrong jwt error
        if (err.name == 'TokenExpiredError') {
            const message = 'JSON Web Token is invalid: Try Again Later';
            new errorHandler_1.default(message, 400);
        }
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=errors.js.map