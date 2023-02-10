"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryWebhook_1 = __importDefault(require("./categoryWebhook"));
const productWebhook_1 = __importDefault(require("./productWebhook"));
exports.default = {
    product: productWebhook_1.default,
    category: categoryWebhook_1.default,
};
