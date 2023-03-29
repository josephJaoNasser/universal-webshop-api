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
const webhookControllers_1 = __importDefault(require("../controllers/webhookControllers"));
const getStoreInfo_1 = __importDefault(require("../lib/helpers/getStoreInfo"));
const router = express_1.default.Router();
router.post("/api/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedId = req.headers["x-webshop-encryptedid"] ||
        req.headers["x-webshop-encryptedId"] ||
        req.headers["x-webshop-encrypted-id"];
    try {
        const storeInfo = yield (0, getStoreInfo_1.default)({
            id: encryptedId,
        });
        const source = storeInfo.source; //req.headers["x-webshop-source"] as string;
        yield webhookControllers_1.default[source](req, storeInfo);
        return res.status(200).send("Webhook has been executed");
    }
    catch (e) {
        console.error({ err: e });
        return res.status(200).send("Webhook has failed");
    }
}));
exports.default = router;
