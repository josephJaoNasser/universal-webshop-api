"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const syncStore_1 = __importStar(require("../lib/helpers/syncStore"));
const express_1 = __importDefault(require("express"));
const verifyStore_1 = __importDefault(require("../middleware/verifyStore"));
const router = express_1.default.Router();
/***
 * @method get
 * @desc Sync everything. Products, Categories, etc.
 */
router.get("/api/:storeId/sync", verifyStore_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const storeInfo = req["store_info"];
    try {
        yield (0, syncStore_1.default)(storeInfo);
        return res.status(200).send("All store pages have been synced");
    }
    catch (e) {
        console.error({ e });
        return res
            .status(((_a = e.response) === null || _a === void 0 ? void 0 : _a.status) || 404)
            .send(((_b = e.response) === null || _b === void 0 ? void 0 : _b.data) || "Error when syncing store");
    }
}));
/***
 * @method get
 * @desc Sync products.
 */
router.get("/api/:storeId/sync/products", verifyStore_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const storeInfo = req["store_info"];
    try {
        yield (0, syncStore_1.syncStoreProducts)(storeInfo);
        return res.status(200).send("All store products have been synced");
    }
    catch (e) {
        console.error({ e });
        return res
            .status(((_c = e.response) === null || _c === void 0 ? void 0 : _c.status) || 404)
            .send(((_d = e.response) === null || _d === void 0 ? void 0 : _d.data) || "Error when syncing store");
    }
}));
/***
 * @method get
 * @desc Sync categories.
 */
router.get("/api/:storeId/sync/categories", verifyStore_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const storeInfo = req["store_info"];
    try {
        return res.status(200).send("This function is not available yet");
    }
    catch (e) {
        console.error({ e });
        return res
            .status(((_e = e.response) === null || _e === void 0 ? void 0 : _e.status) || 404)
            .send(((_f = e.response) === null || _f === void 0 ? void 0 : _f.data) || "Error when syncing store");
    }
}));
exports.default = router;
