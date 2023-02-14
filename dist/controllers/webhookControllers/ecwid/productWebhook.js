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
const stripHtml_1 = require("../../../lib/helpers/stripHtml");
const axios_1 = __importDefault(require("axios"));
function ecwidProductWebhook(webhookRequest, storeInfo) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Ecwid = new Ecwid_1.default(storeInfo.storeId, storeInfo.credentials.token);
            const updatedOrCreatedProduct = yield Ecwid.Products.getById({
                id: webhookRequest.entityId,
            });
            const fetchCategoriesRequest = updatedOrCreatedProduct.categories.map((catId) => Ecwid.Categories.getById({ id: catId }));
            const categories = yield Promise.all(fetchCategoriesRequest);
            const categoryNames = categories.map((catItem) => catItem.name);
            categoryNames.unshift(storeInfo.categoryAggregator);
            const metadata = {
                title: updatedOrCreatedProduct.name,
                description: (0, stripHtml_1.stripHtml)((0, stripHtml_1.prune)(updatedOrCreatedProduct.description, 150)),
                image: ((_a = updatedOrCreatedProduct.images[0]) === null || _a === void 0 ? void 0 : _a.src) || "",
                categories: categoryNames,
            };
            const action = webhookRequest.eventType.split(".")[1];
            if (action === "created") {
                const utdRes = yield axios_1.default.post("https://www.uptodateconnect.com/api/v1/site-builder/location-pages/" +
                    storeInfo.siteId +
                    "?access_token=" +
                    storeInfo.builder_token, {
                    syncId: updatedOrCreatedProduct.original_id,
                    bloggerId: "8989560993773713237",
                    metadata,
                    payload: {
                        locationPageIdSource: storeInfo.locationPageIdSource,
                        name: updatedOrCreatedProduct.name,
                        data: updatedOrCreatedProduct,
                    },
                });
                console.log({ utd_response: utdRes.data });
                return;
            }
            if (action === "updated") {
                const utdRes = yield axios_1.default.patch("https://www.uptodateconnect.com/api/v1/site-builder/location-pages/" +
                    storeInfo.siteId +
                    "?access_token=" +
                    storeInfo.builder_token, {
                    syncId: updatedOrCreatedProduct.original_id,
                    metadata,
                    payload: {
                        data: updatedOrCreatedProduct,
                    },
                });
                console.log({ utd_response: utdRes.data });
                return;
            }
            if (action === "deleted") {
                // do something when a product was deleted
                const utdRes = yield axios_1.default.delete("https://www.uptodateconnect.com/api/v1/site-builder/location-pages/" +
                    storeInfo.siteId +
                    "?syncId=" +
                    webhookRequest.entityId +
                    "&access_token=" +
                    storeInfo.builder_token);
                console.log({ utd_response: utdRes.data });
                return;
            }
        }
        catch (e) {
            throw e;
        }
    });
}
exports.default = ecwidProductWebhook;
