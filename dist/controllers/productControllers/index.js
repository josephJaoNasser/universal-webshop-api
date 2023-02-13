"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ecwid_1 = __importDefault(require("./ecwid"));
const woocommerce_1 = __importDefault(require("./woocommerce"));
const productControllers = {
    ecwid: ecwid_1.default,
    woocommerce: woocommerce_1.default,
};
exports.default = productControllers;
