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
Object.defineProperty(exports, "__esModule", { value: true });
function getStoreInfo({ id, token, storeSource, }) {
    return __awaiter(this, void 0, void 0, function* () {
        /** Replace this with an API call, either find by id or find by store source + token */
        const storeInfo = {
            id: 1,
            storeId: process.env.ECWID_STORE_ID,
            source: "ecwid",
            token: "asd123456xyz",
            credentials: {
                token: process.env.ECWID_TOKEN,
            },
        };
        /** change this condition, if !storeInfo */
        if (id != "1" || (token !== "asd123456xyz" && storeSource !== "ecwid")) {
            throw new Error("Store does not exist");
        }
        if (!token || token !== storeInfo.token) {
            storeInfo.token = "";
            storeInfo.credentials = {};
            return storeInfo;
        }
        return storeInfo;
    });
}
exports.default = getStoreInfo;
