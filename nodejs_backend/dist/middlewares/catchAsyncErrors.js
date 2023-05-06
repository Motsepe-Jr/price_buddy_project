"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = catchAsyncErrors => (req, res, next) => Promise.resolve(catchAsyncErrors(req, res, next)).catch(next);
//# sourceMappingURL=catchAsyncErrors.js.map