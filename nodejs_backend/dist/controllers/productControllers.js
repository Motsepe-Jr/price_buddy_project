"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.newProducts = exports.newProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
//  create new product  => /api/v1/product/new
const newProduct = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.user = req.user.id;
    const product = yield product_1.default.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
}));
exports.newProduct = newProduct;
//  create many products => /api/v1/products/new
const newProducts = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.insertMany(req.body); // array of products
    res.status(201).json({
        success: true,
        product
    });
}));
exports.newProducts = newProducts;
// get all products => /api/v1/products
const getProducts = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resPerPage = 6;
    // Create an instance of the APIFeatures class with the Product collection and the current request
    const apifeatures = new apiFeatures_1.default(product_1.default.find(), req)
        .search()
        .filter()
        .pagination(resPerPage);
    // Add pagination to the APIFeatures instance and execute the query
    const products = yield apifeatures.query;
    // Get the unique store ids from the products array
    const storeIds = [...new Set(products.map(product => product.store))];
    const productIds = [...new Set(products.map(product => product._id))];
    console.log(productIds);
    // Populate storeInfo field using $lookup aggregation
    const product_store = yield product_1.default.aggregate([
        {
            $match: { store: { $in: storeIds } } // match products by store id
        },
        {
            $match: { _id: { $in: productIds } } // match products by _id
        },
        {
            $lookup: {
                from: "stores",
                localField: "store",
                foreignField: "_id",
                as: "storeInfo",
            },
        },
    ]);
    res.status(200).json(product_store);
}));
exports.getProducts = getProducts;
// get specifc product based on ID =? /api/v1/product/:id
const getSingleProduct = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findById(req.params.id);
    if (!product) {
        return next(new errorHandler_1.default('Product not found', 404));
    }
    res.status(200).json(product);
}));
exports.getSingleProduct = getSingleProduct;
// update Product => /api/v1/product/:id
const updateProduct = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield product_1.default.findById(req.params.id);
    if (!product) {
        return next(new errorHandler_1.default('Product not found', 404));
    }
    product = yield product_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        product
    });
}));
exports.updateProduct = updateProduct;
// delete products => aoi/v1/admin/product/:id
const deleteProduct = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findById(req.params.id);
    if (!product) {
        return next(new errorHandler_1.default('Product not found', 404));
    }
    yield product.deleteOne();
    // remove the image associated with the product
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
}));
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productControllers.js.map