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
function getStoreInfo({ id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        /** Replace this with an API call, either find by id or find by store source + token */
        try {
            const res = yield axios_1.default.get(`https://www.uptodateconnect.com/api/v1/shop/info?access_token=${process.env.UTD_SHOP_DB_TOKEN}&storeId=${id}`);
            const storeInfo = res.data.payload;
            /** change this condition, if !storeInfo */
            if (!storeInfo) {
                throw new Error("Store does not exist");
            }
            return storeInfo;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.default = getStoreInfo;
