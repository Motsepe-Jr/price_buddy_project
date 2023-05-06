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
const productControllers_1 = require("../controllers/productControllers");
// CLIENT ROUTES -----------------------------
router.get('/products', productControllers_1.getProducts);
router.get('/product/:id', productControllers_1.getSingleProduct);
// ADMIN ROUTES ------------------------------
router.post('/admin/product/new', (0, auth_1.authAndAuthorize)('user'), productControllers_1.newProduct);
router.post('/admin/products/new', (0, auth_1.authAndAuthorize)('admin'), productControllers_1.newProducts);
router.put('/admin/product/:id', (0, auth_1.authAndAuthorize)('admin'), productControllers_1.updateProduct);
router.delete('/admin/product/:id', (0, auth_1.authAndAuthorize)('admin'), productControllers_1.deleteProduct);
//# sourceMappingURL=product.js.map