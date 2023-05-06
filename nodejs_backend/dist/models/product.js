"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxlength: [100, 'Product name must be less than 100 characters']
    },
    price: {
        type: String,
        required: [true, "Please enter price name"],
        trim: true,
        maxlength: [10, 'Price value must be less than 10 characters'],
    },
    description: {
        type: String,
    },
    ratings: {
        type: Number,
        default: 0
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
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'Please select catageory for this product'],
        enum: {
            values: [
                'Coca Cola',
                'Jacobs Kronung',
                'Nescafe Gold',
                'Tastic Rice',
                'Sasko',
                'Albany',
                'White Star Super Maize',
                'Ace Super Maize',
                'Lucky Star Pilchards',
                'Sunfoil Pure Sunflower',
                'Koo Baked Beans',
                'Jungle Oats',
                'Mr. Pasta Macaroni Pasta',
                'Domestos',
                'Baby Soft White Toilet Paper',
                'Sunlight Original Dishwashing Liquid',
                'Handy Andy',
                'Omo Auto Laundry Washing Powder',
                'Vanish Stain Remover Laundry Detergent',
                'Sunlight 2 in 1 Auto Washing Powder',
                'Colgate',
                'Dettol',
                'Dove',
                'Milk',
                'Eggs'
            ],
            message: "Please select correct category for product"
        }
    },
    store: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Stores",
        required: true,
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [5, "Product stock value cannot exceed 5 characters"],
        default: 0
    },
    numofReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            ratings: {
                type: Number,
                requird: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=product.js.map