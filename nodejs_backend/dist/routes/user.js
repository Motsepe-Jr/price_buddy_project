"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.get('/logout', userController_1.logoutUser);
router.post('/password/forgot', userController_1.forgotPassword);
router.put('/password/reset/:token', userController_1.resetPassword);
router.get('/me', (0, auth_1.authAndAuthorize)('user', 'admin'), userController_1.getUserProfile);
router.put('/update/password', (0, auth_1.authAndAuthorize)('user'), userController_1.updateUserPassword);
router.put('/me/update', (0, auth_1.authAndAuthorize)('user'), userController_1.updateUserProfile);
// admin
router.get('/admin/users', (0, auth_1.authAndAuthorize)('admin'), userController_1.getAllUsers);
router.put('admin/user/:id', (0, auth_1.authAndAuthorize)('admin'), userController_1.updateUser);
router.put('admin/user/:id', (0, auth_1.authAndAuthorize)('admin'), userController_1.deleteUser);
//# sourceMappingURL=user.js.map