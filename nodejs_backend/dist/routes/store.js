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
const storesControllers_1 = require("../controllers/storesControllers");
// CLIENT ROUTES -----------------------------
router.get('/stores', (0, auth_1.authAndAuthorize)('admin', 'user'), storesControllers_1.getStores);
// ADMIN ROUTES ------------------------------
router.post('/admin/store/new', (0, auth_1.authAndAuthorize)('admin'), storesControllers_1.newStore);
router.post('/admin/stores/new', (0, auth_1.authAndAuthorize)('admin'), storesControllers_1.newStores);
//# sourceMappingURL=store.js.map