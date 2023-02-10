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
const router = express_1.default.Router();
router.post("/api/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const source = req.headers["x-webshop-source"];
    const token = req.headers["x-webshop-token"];
    try {
        console.log("A webshop has connected to the webhook");
        console.log(source);
        console.log({ body: req.body });
        return res.status(200).send("Webhook has been executed");
    }
    catch (e) {
        console.error({ err: e });
        return res.status(200).send("Webhook has failed");
    }
}));
exports.default = router;
