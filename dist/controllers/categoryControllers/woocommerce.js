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
const Woocommerce_1 = __importDefault(require("../../lib/apiKit/Woocommerce"));
function woocommerceHandler({ method, credentials, storeInfo, queries, id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!credentials.consumer_key && !credentials.consumer_secret) {
            throw new Error("No token provided");
        }
        try {
            const Woocommerce = new Woocommerce_1.default(storeInfo.storeUrl, credentials.consumer_key, credentials.consumer_secret);
            const standardizedData = yield Woocommerce.Categories[method]({
                queries,
                id,
            });
            return standardizedData;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.default = woocommerceHandler;
