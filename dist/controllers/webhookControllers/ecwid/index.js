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
const categoryWebhook_1 = __importDefault(require("./categoryWebhook"));
const productWebhook_1 = __importDefault(require("./productWebhook"));
const handlers = {
    product: productWebhook_1.default,
    category: categoryWebhook_1.default,
};
function handleEcwidWebhook(req, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const webhookBody = req.body;
        const handlerType = webhookBody.eventType.split(".")[0];
        try {
            yield handlers[handlerType](webhookBody, token);
            return;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.default = handleEcwidWebhook;
