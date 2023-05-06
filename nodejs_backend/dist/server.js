"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const dotenv_1 = __importDefault(require("dotenv"));
const database_js_1 = __importDefault(require("./config/database.js"));
// handle uncaught exceptions
process.on('uncaughtException', err => {
    console.error(err);
    console.error(`Shutting down server due to uncaught exceptions`);
    process.exit(1);
});
dotenv_1.default.config({
    path: 'src/config/config.env'
});
// connecting to the database
(0, database_js_1.default)();
const server = app_js_1.app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
// handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log('shutting down server due to unhandled promise rejections');
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=server.js.map