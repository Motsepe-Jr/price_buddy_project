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
exports.getCategories = exports.newCategory = exports.newCategories = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const category_1 = __importDefault(require("../models/category"));
//  create new product  => /api/v1/product/new
const newCategory = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // categories are creatred by admin user
    req.body.user = req.user.id;
    // body = {name, description, images[url, public_id]}
    const category = yield category_1.default.create(req.body);
    res.status(201).json({
        success: true,
        category
    });
}));
exports.newCategory = newCategory;
//  create many categories => /api/v1/products/new
const newCategories = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_1.default.insertMany(req.body); // array of categories
    res.status(201).json({
        success: true,
        categories
    });
}));
exports.newCategories = newCategories;
// get all products => /api/v1/products
const getCategories = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resPerPage = 8;
    const categoriescount = yield category_1.default.countDocuments();
    const apifeatures = new apiFeatures_1.default(category_1.default.find(), req) // req needed to provided the type 
        .search()
        .pagination(resPerPage);
    const categories = yield apifeatures.query;
    res.status(200).json(categories);
}));
exports.getCategories = getCategories;
//# sourceMappingURL=categoriesController.js.map