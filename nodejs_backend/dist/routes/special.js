"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const auth_1 = require("../middlewares/auth");
const specialController_1 = require("../controllers/specialController");
// CLIENT ROUTES -----------------------------
router.get('/specials', specialController_1.getSpecials);
// ADMIN ROUTES ------------------------------
router.post('/admin/specials/new', (0, auth_1.authAndAuthorize)('admin'), specialController_1.newSpecials);
//# sourceMappingURL=special.js.map