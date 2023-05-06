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
exports.getStores = exports.newStores = exports.newStore = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const store_1 = __importDefault(require("../models/store"));
//  create new product  => /api/v1/product/new
const newStore = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // stores are creatred by admin user
    req.body.user = req.user.id;
    // body = {name, description, images[url, public_id]}
    const store = yield store_1.default.create(req.body);
    res.status(201).json({
        success: true,
        store
    });
}));
exports.newStore = newStore;
//  create many stores => /api/v1/products/new
const newStores = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield store_1.default.insertMany(req.body); // array of stores
    res.status(201).json({
        success: true,
        stores
    });
}));
exports.newStores = newStores;
// get all products => /api/v1/products
const getStores = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resPerPage = 4;
    const storescount = yield store_1.default.countDocuments();
    const apifeatures = new apiFeatures_1.default(store_1.default.find(), req) // req needed to provided the type 
        .search();
    const stores = yield apifeatures.query;
    res.status(200).json({
        success: true,
        storescount,
        count: stores.length,
        stores
    });
}));
exports.getStores = getStores;
//# sourceMappingURL=storesControllers.js.map