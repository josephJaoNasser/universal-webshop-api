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
const Ecwid_1 = __importDefault(require("@/lib/apiKit/Ecwid"));
function ecwidProductWebhook(webhookRequest, storeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Ecwid = new Ecwid_1.default(storeInfo.storeId, storeInfo.credentials.token);
            const updatedOrCreatedProduct = yield Ecwid.Products.getById({
                id: webhookRequest.entityId,
            });
            const action = webhookRequest.eventType.split(".")[1];
            if (action === "created") {
                // do something when a product was created
                console.log("product created");
                console.log({ updatedOrCreatedProduct });
                return;
            }
            if (action === "updated") {
                // do something when a product was updated
                console.log("product updated");
                console.log({ updatedOrCreatedProduct });
                return;
            }
            if (action === "deleted") {
                // do something when a product was deleted
                console.log("product deleted");
                console.log({ updatedOrCreatedProduct });
                return;
            }
        }
        catch (e) {
            throw e;
        }
    });
}
exports.default = ecwidProductWebhook;
