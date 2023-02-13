"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("./cart"));
const categories_1 = __importDefault(require("./categories"));
const products_1 = __importDefault(require("./products"));
class EcwidApi {
    constructor(storeID, token) {
        this.storeID = storeID;
        this.token = token;
        this.baseURL = "https://app.ecwid.com/api/v3/" + storeID;
        this.config = {
            headers: {
                Authorization: this.initToken(token),
            },
        };
        this.Products = new products_1.default(this.baseURL, this.config);
        this.Categories = new categories_1.default(this.baseURL, this.config);
        this.Cart = new cart_1.default(this.baseURL, this.config);
    }
    initToken(token) {
        if (!token.startsWith("Bearer ")) {
            return "Bearer " + token;
        }
        return token;
    }
}
exports.default = EcwidApi;
