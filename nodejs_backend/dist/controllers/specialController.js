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
exports.getSpecials = exports.newSpecials = void 0;
const special_1 = __importDefault(require("../models/special"));
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
//  create many specials => /api/v1/products/new
const newSpecials = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const special = yield special_1.default.insertMany(req.body);
    console.log(special);
    res.status(201).json({
        success: true,
        special
    });
}));
exports.newSpecials = newSpecials;
// get all specials
const getSpecials = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const apifeatures = new apiFeatures_1.default(special_1.default.find(), req) // req needed to provided the type 
        .search();
    const specials = yield apifeatures.query;
    res.status(200).json({
        success: true,
        specials
    });
}));
exports.getSpecials = getSpecials;
//# sourceMappingURL=specialController.js.map