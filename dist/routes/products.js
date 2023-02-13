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
const express_1 = __importDefault(require("express"));
const productControllers_1 = __importDefault(require("../controllers/productControllers"));
const verifyStore_1 = __importDefault(require("../middleware/verifyStore"));
const router = express_1.default.Router();
/***
 * @method get
 * @desc get all products
 */
router.get("/api/:storeId/products", verifyStore_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const storeInfo = req["store_info"];
    const payload = {
        method: "getAll",
        credentials: storeInfo.credentials,
        queries: req.query,
        storeInfo,
    };
    try {
        const data = (yield productControllers_1.default[storeInfo.source](payload));
        return res.status(200).send(data);
    }
    catch (e) {
        const err = e;
        console.error({ err });
        return res
            .status(((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) || 404)
            .send(((_b = err.response) === null || _b === void 0 ? void 0 : _b.data) || "Error when fetching products");
    }
}));
/***
 * @method get
 * @desc search for a product by keyword/s
 */
router.get("/api/:storeId/products/search", verifyStore_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const storeInfo = req["store_info"];
    const payload = {
        method: "searchByKeywords",
        credentials: storeInfo.credentials,
        queries: req.query,
        storeInfo,
    };
    try {
        const data = (yield productControllers_1.default[storeInfo.source](payload));
        return res.status(200).send(data);
    }
    catch (e) {
        const err = e;
        console.error({ err });
        return res
            .status(((_c = err.response) === null || _c === void 0 ? void 0 : _c.status) || 404)
            .send(((_d = err.response) === null || _d === void 0 ? void 0 : _d.data) || "Error when fetching products");
    }
}));
/***
 * @method get
 * @desc filter products (see ecwid api docs)
 */
router.get("/api/:storeId/products/filter", verifyStore_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const storeInfo = req["store_info"];
    const payload = {
        method: "searchByFilters",
        credentials: storeInfo.credentials,
        queries: req.query,
        storeInfo,
    };
    try {
        const data = (yield productControllers_1.default[storeInfo.source](payload));
        return res.status(200).send(data);
    }
    catch (e) {
        const err = e;
        console.error({ err });
        return res
            .status(((_e = err.response) === null || _e === void 0 ? void 0 : _e.status) || 404)
            .send(((_f = err.response) === null || _f === void 0 ? void 0 : _f.data) || "Error when fetching products");
    }
}));
/***
 * @method get
 * @desc get a product by id
 */
router.get("/api/:storeId/products/:id", verifyStore_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const storeInfo = req["store_info"];
    const payload = {
        method: "getById",
        credentials: storeInfo.credentials,
        id: req.params.id,
        storeInfo,
    };
    try {
        const data = (yield productControllers_1.default[storeInfo.source](payload));
        return res.status(200).send(data);
    }
    catch (e) {
        const err = e;
        console.error({ err });
        return res
            .status(((_g = err.response) === null || _g === void 0 ? void 0 : _g.status) || 404)
            .send(((_h = err.response) === null || _h === void 0 ? void 0 : _h.data) || "Error when fetching products");
    }
}));
exports.default = router;
