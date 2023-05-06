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
const categoriesController_1 = require("../controllers/categoriesController");
// CLIENT ROUTES -----------------------------
router.get('/categories', (0, auth_1.authAndAuthorize)('admin', 'user'), categoriesController_1.getCategories);
// ADMIN ROUTES ------------------------------
router.post('/admin/category/new', (0, auth_1.authAndAuthorize)('admin'), categoriesController_1.newCategory);
router.post('/admin/categories/new', (0, auth_1.authAndAuthorize)('admin'), categoriesController_1.newCategories);
//# sourceMappingURL=category.js.map