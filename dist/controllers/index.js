"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productControllers_1 = __importDefault(require("./productControllers"));
const categoryControllers_1 = __importDefault(require("./categoryControllers"));
const cartControllers_1 = __importDefault(require("./cartControllers"));
const webhookControllers_1 = __importDefault(require("./webhookControllers"));
exports.default = {
    productControllers: productControllers_1.default,
    categoryControllers: categoryControllers_1.default,
    cartControllers: cartControllers_1.default,
    webhookControllers: webhookControllers_1.default,
};
