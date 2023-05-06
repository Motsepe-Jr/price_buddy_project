"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const specialSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxlength: [100, 'Product name must be less than 100 characters']
    },
    price: {
        type: String,
        trim: true,
        maxlength: [10, 'Price value must be less than 10 characters'],
    },
    promtoion_message: {
        type: String,
        required: [true, "Please enter price name"],
        trim: true,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    store: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Stores",
        required: true,
    },
    store_name: {
        type: String,
    },
    store_image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.default.model("Special", specialSchema);
//# sourceMappingURL=special.js.map