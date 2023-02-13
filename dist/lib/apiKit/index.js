"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ecwid_1 = __importDefault(require("./Ecwid"));
const Woocommerce_1 = __importDefault(require("./Woocommerce"));
exports.default = {
    woocommerce: Woocommerce_1.default,
    ecwid: Ecwid_1.default,
};
