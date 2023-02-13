"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoocommerceProducts = exports.WoocommerceCategories = void 0;
const Woocommerce_1 = __importDefault(require("./Woocommerce"));
const categories_1 = __importDefault(require("./categories"));
exports.WoocommerceCategories = categories_1.default;
const products_1 = __importDefault(require("./products"));
exports.WoocommerceProducts = products_1.default;
exports.default = Woocommerce_1.default;
