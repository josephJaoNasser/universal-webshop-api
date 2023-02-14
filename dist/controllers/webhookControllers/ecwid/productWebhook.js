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
const Ecwid_1 = __importDefault(require("../../../lib/apiKit/Ecwid"));
const axios_1 = __importDefault(require("axios"));
function ecwidProductWebhook(webhookRequest, storeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Ecwid = new Ecwid_1.default(storeInfo.storeId, storeInfo.credentials.token);
            const updatedOrCreatedProduct = yield Ecwid.Products.getById({
                id: webhookRequest.entityId,
            });
            const action = webhookRequest.eventType.split(".")[1];
            if (action === "created") {
                const utdRes = yield axios_1.default.post("https://www.uptodateconnect/api/v1/site-builder/location-pages/" +
                    storeInfo.siteId +
                    "?access_token=" +
                    storeInfo.builder_token, {
                    syncId: updatedOrCreatedProduct.original_id,
                    bloggerId: "2245555036362307138",
                    locationPageIdSource: storeInfo.locationPageIdSource,
                    payload: {
                        data: updatedOrCreatedProduct,
                    },
                });
                console.log(utdRes.data);
                return;
            }
            if (action === "updated") {
                const utdRes = yield axios_1.default.patch("https://www.uptodateconnect/api/v1/site-builder/location-pages/" +
                    storeInfo.siteId +
                    "?access_token=" +
                    storeInfo.builder_token, {
                    syncId: updatedOrCreatedProduct.original_id,
                    payload: {
                        data: updatedOrCreatedProduct,
                    },
                });
                console.log(utdRes.data);
                return;
            }
            if (action === "deleted") {
                // do something when a product was deleted
                const utdRes = yield axios_1.default.delete("https://www.uptodateconnect/api/v1/site-builder/location-pages/" +
                    storeInfo.siteId +
                    "?syncId=" +
                    webhookRequest.entityId +
                    "&access_token=" +
                    storeInfo.builder_token);
                console.log(utdRes.data);
                return;
            }
        }
        catch (e) {
            throw e;
        }
    });
}
exports.default = ecwidProductWebhook;
