"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
// middleware
const errors_1 = __importDefault(require("./middlewares/errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// import all routes 
const product_1 = require("./routes/product");
const user_1 = require("./routes/user");
const category_1 = require("./routes/category");
const store_1 = require("./routes/store");
const special_1 = require("./routes/special");
app.use('/api/v1', product_1.router);
app.use('/api/v1', user_1.router);
app.use('/api/v1', category_1.router);
app.use('/api/v1', store_1.router);
app.use('/api/v1', special_1.router);
app.use(errors_1.default);
//# sourceMappingURL=app.js.map