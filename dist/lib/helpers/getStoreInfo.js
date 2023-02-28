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
const axios_1 = __importDefault(require("axios"));
const store_1 = require("./store");
function getStoreInfo({ id, storeId, storeSource, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let storeInfo = store_1.shopInfoObj[id];
        if (!storeInfo) {
            const res = yield axios_1.default.get(process.env.SITE_BUILDER_API +
                `/shop/info?storeId=${id}&access_token=${process.env.SITE_BUILDER_TOKEN}`);
            if (res.data.success) {
                const payload = res.data.payload;
                store_1.shopInfoObj[payload.encryptedId] = payload;
                storeInfo = payload;
            }
            else {
                throw new Error("Store does not exist");
            }
        }
        return storeInfo;
    });
}
exports.default = getStoreInfo;
