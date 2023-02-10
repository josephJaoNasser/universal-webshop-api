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
const verifyStore_1 = __importDefault(require("../middleware/verifyStore"));
const cartControllers_1 = __importDefault(require("../controllers/cartControllers"));
const router = express_1.default.Router();
router.get("/api/:storeId/cart/:cartId", verifyStore_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const storeInfo = req["store_info"];
    const payload = {
        method: "getAll",
        credentials: storeInfo.credentials,
        queries: req.query,
        storeInfo,
        id: req.params.cartId,
    };
    try {
        const data = yield cartControllers_1.default[storeInfo.source](payload);
        return res.status(200).send(data);
    }
    catch (e) {
        const err = e;
        console.error({ err });
        return res
            .status(((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) || 404)
            .send(((_b = err.response) === null || _b === void 0 ? void 0 : _b.data) || "Error when fetching cart data");
    }
}));
exports.default = router;
