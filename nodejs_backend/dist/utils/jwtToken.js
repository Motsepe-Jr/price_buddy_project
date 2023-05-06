"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
// Create abd send token in the cookie
const sendToken = (user, statusCode, res) => {
    // create JWT token
    const token = user.getJwtToken();
    // options for cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIES_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true // cannot be accessed by using JS code
    };
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
};
exports.sendToken = sendToken;
//# sourceMappingURL=jwtToken.js.map