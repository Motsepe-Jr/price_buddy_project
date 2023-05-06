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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.updateUserProfile = exports.updateUserPassword = exports.getUserProfile = exports.resetPassword = exports.forgotPassword = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const user_1 = __importDefault(require("../models/user"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const jwtToken_1 = require("../utils/jwtToken");
const sendEmail_1 = __importDefault(require(".././utils/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
//  Register the user => api/v1/register
const registerUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield user_1.default.create({
        name,
        email,
        password,
        // change based on what the user upload
        avatar: {
            public_id: 'cld-sample',
            url: 'https://res.cloudinary.com/dygwgwbrj/image/upload/v1682202588/cld-sample.jpg'
        }
    });
    (0, jwtToken_1.sendToken)(user, 200, res);
}));
exports.registerUser = registerUser;
// login user => /api/v1/login
const loginUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // check if the email and password enter by user
    if (!email || !password) {
        return next(new errorHandler_1.default("Please enter your email and password", 400));
    }
    // find user email in database
    const user = yield user_1.default.findOne({ email: email }).select("+password");
    if (!user) {
        return next(new errorHandler_1.default("Invalid email or password.", 401));
    }
    // Check if password given by users is correct or not
    const isPasswordMatched = yield user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new errorHandler_1.default("Invalid email or password", 401));
    }
    (0, jwtToken_1.sendToken)(user, 201, res);
}));
exports.loginUser = loginUser;
// Reset Password => /api/v1/password/reset/:token
const resetPassword = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Post request: the user provide us with their information
    //  hash URL token 
    const resetPasswordToken = crypto_1.default.createHash('sha256').update(req.params.token).digest('hex');
    //  compare the hashed token with our database token
    const user = yield user_1.default.findOne({
        resetPasswordToken,
        // TODO
        // resetPasswordExpires: {$gt:Date.now()} // investigate this, looks like the server date is getting used.
    });
    if (!user) {
        return next(new errorHandler_1.default("Token is invalid or has been expired", 400));
    }
    if (req.body.password != req.body.confirmPassword) {
        return next(new errorHandler_1.default('Password does not match', 400));
    }
    // set up new password
    user.password = req.body.password;
    // since we gave the user new password, let remove their temp token for reconvery pass
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // svae the user
    yield user.save();
    // send jwt token
    (0, jwtToken_1.sendToken)(user, 201, res);
}));
exports.resetPassword = resetPassword;
//forgotPassword => api/v1/password/forgot
const forgotPassword = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user) {
        return next(new errorHandler_1.default("User not found with this email", 404));
    }
    //   get token
    const resetToken = user.getResetPasswordToken();
    yield user.save({ validateBeforeSave: false });
    // create reset password url
    const resetUrl = `http://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow: \n\n${resetUrl}\n\nIf you have not requested this email, then ignore`;
    try {
        yield (0, sendEmail_1.default)({
            email: user.email,
            subject: `PriceComparison: Your password reset token is as follow`,
            message
        });
        res.status(200).json({
            success: true,
            message: `Password recovery send to your email`
        });
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        yield user.save({ validateBeforeSave: false });
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
exports.forgotPassword = forgotPassword;
// logOut User => /api/v1/logout
const logoutUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logged out'
    });
}));
exports.logoutUser = logoutUser;
// get logged in user details =? /api/v1/me
const getUserProfile = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const user = yield user_1.default.findById(user_id);
    if (!user) {
        return next(new errorHandler_1.default("User not found or Please login again", 404));
    }
    res.status(200).json([
        user
    ]);
}));
exports.getUserProfile = getUserProfile;
// update user profil => /api/v1/password/update
const updateUserPassword = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user;
    const user = yield user_1.default.findById(user_id).select("+password");
    if (!user) {
        return next(new errorHandler_1.default("User not found or Please login again", 404));
    }
    // check prev user password
    const isMatched = yield user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new errorHandler_1.default("old password do not match", 400));
    }
    user.password = req.body.newPassword;
    yield user.save();
    (0, jwtToken_1.sendToken)(user, 200, res);
}));
exports.updateUserPassword = updateUserPassword;
// update user profile => /api/v1/me/update
const updateUserProfile = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };
    // update avatar later
    const user = yield user_1.default.findByIdAndUpdate(req.user, newUserData, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found or Please login again", 404));
    }
    res.status(200).json({
        success: true,
        message: "Your infromation has been updated successfully"
    });
}));
exports.updateUserProfile = updateUserProfile;
// Admin Routes 
// get all users ==> /api/v1/admin/users
const getAllUsers = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    if (!users) {
        return next(new errorHandler_1.default("Users not found or Please ensure you have rights to access this infromation", 404));
    }
    res.status(200).json({
        success: true,
        users
    });
}));
exports.getAllUsers = getAllUsers;
// update and delete users
const updateUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    // update avatar later
    const user = yield user_1.default.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found or Please login again", 404));
    }
    res.status(200).json({
        success: true,
        message: "user infromation has been updated successfully"
    });
}));
exports.updateUser = updateUser;
// delete user 
const deleteUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    // remove the avatar of the user from cloudinary: TODO
    res.status(200).json({
        success: true,
        user
    });
}));
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map