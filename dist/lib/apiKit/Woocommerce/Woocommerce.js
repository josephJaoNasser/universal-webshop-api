"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = __importDefault(require("./categories"));
const products_1 = __importDefault(require("./products"));
class WoocommerceApi {
    constructor(storeUrl, consumer_key, consumer_secret) {
        this.storeUrl = storeUrl;
        this.baseURL = this.getBaseUrl(storeUrl);
        this.config = {
            consumer_key,
            consumer_secret,
        };
        this.Products = new products_1.default(this.baseURL, this.config);
        this.Categories = new categories_1.default(this.baseURL, this.config);
    }
    getBaseUrl(storeUrl) {
        if (storeUrl[storeUrl.length] === "/") {
            return storeUrl + "wp-json/wc/v3";
        }
        return storeUrl + "/wp-json/wc/v3";
    }
}
exports.default = WoocommerceApi;
