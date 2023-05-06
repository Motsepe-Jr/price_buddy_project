"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedBearerUser = exports.authAndAuthorize = void 0;
const catchAsyncErrors_1 = __importDefault(require("./catchAsyncErrors"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// check if user is authenticated or not
const authAndAuthorize = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if user is authenticated
        const { token } = req.cookies;
        if (!token) {
            return next(new errorHandler_1.default('Login First to access resources', 401));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield user_1.default.findById(decoded.id);
            if (!user) {
                return next(new errorHandler_1.default('User not found', 404));
            }
            // Check if user is authorized
            if (!roles.includes(user.role)) {
                return next(new errorHandler_1.default(`Role (${user.role}) does not have access to this resource`, 403));
            }
            req.user = user;
            next();
        }
        catch (error) {
            return next(new errorHandler_1.default('Unauthorized access', 401));
        }
    });
};
exports.authAndAuthorize = authAndAuthorize;
const isAuthenticatedBearerUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return next(new errorHandler_1.default('Login First to access resources', 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = yield user_1.default.findById(decoded._id);
        next();
    }
    catch (err) {
        return next(new errorHandler_1.default('Invalid Token', 401));
    }
}));
exports.isAuthenticatedBearerUser = isAuthenticatedBearerUser;
//# sourceMappingURL=auth.js.map