"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        ErrorHandler.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map