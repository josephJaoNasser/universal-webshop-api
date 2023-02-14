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
function getStoreInfo({ id, storeId, storeSource, }) {
    return __awaiter(this, void 0, void 0, function* () {
        /** Replace this with an API call, either find by id or find by store source + token */
        const storeInfo = {
            id: 1,
            encryptedId: "asd123xyz",
            storeId: process.env.ECWID_STORE_ID,
            source: "ecwid",
            builder_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzgsImlhdCI6MTY3NjM2MzMyMiwiZXhwIjoxNjc4OTU1MzIyfQ.1yQYT8xrtMbDwT4vygXeCShLwgd94AD6lXwGd5wFkL4",
            credentials: {
                token: process.env.ECWID_TOKEN,
            },
            siteId: "456c4da0579ed36dd69fe5226cdf9ec3",
            locationPageIdSource: 18939,
        };
        /** change this condition, if !storeInfo */
        if (id != "asd123xyz") {
            throw new Error("Store does not exist");
        }
        return storeInfo;
    });
}
exports.default = getStoreInfo;
