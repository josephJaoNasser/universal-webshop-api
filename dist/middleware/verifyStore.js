"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStoreInfo_1 = __importDefault(require("../lib/getStoreInfo"));
/**
 *  @description verify and get store data that's sent with the request. The store info is stored in req["store_info"]
 */
function verifyStore(req, res, next) {
    var _a;
    const token = (((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) ||
        req.query.token);
    (0, getStoreInfo_1.default)({ id: req.params.storeId, token })
        .then((storeInfo) => {
        if (token !== storeInfo.token) {
            return res
                .status(403)
                .send("You are not allowed to access this store's data.");
        }
        req["store_info"] = storeInfo;
        next();
    })
        .catch((err) => {
        console.error({ err });
        return res.status(404).send("Store not found");
    });
}
exports.default = verifyStore;
