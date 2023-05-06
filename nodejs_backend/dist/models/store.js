"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const storeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please enter store name"],
        trim: true,
        maxlength: [100, 'Store name must be less than 100 characters']
    },
    description: {
        type: String,
    },
    logo: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.default.model("Stores", storeSchema);
//# sourceMappingURL=store.js.map