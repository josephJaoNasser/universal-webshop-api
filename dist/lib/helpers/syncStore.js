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
exports.syncStoreProducts = void 0;
const categoryControllers_1 = __importDefault(require("../../controllers/categoryControllers"));
const productControllers_1 = __importDefault(require("../../controllers/productControllers"));
const axios_1 = __importDefault(require("axios"));
const stripHtml_1 = require("./stripHtml");
/**
 * @desc sync the current webshop's product data with the UTD pages
 * @param storeInfo
 */
function syncStoreProducts(storeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const controllerParams = {
                method: "getAll",
                credentials: storeInfo.credentials,
                storeInfo,
            };
            const productsList = yield productControllers_1.default[storeInfo.source](controllerParams);
            // helper function used to make api calls to the UTD builder
            const handleUTDBuilderCall = (product, categories) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const categoryNames = categories.map((catItem) => catItem.name);
                categoryNames.unshift(storeInfo.categoryAggregator);
                const body = {
                    syncId: product.original_id,
                    bloggerId: "8989560993773713237",
                    metadata: {
                        title: product.name,
                        description: (0, stripHtml_1.stripHtml)((0, stripHtml_1.prune)(product.description, 150)),
                        image: ((_a = product.images[0]) === null || _a === void 0 ? void 0 : _a.src) || "",
                        categories: categoryNames,
                    },
                    payload: {
                        locationPageIdSource: storeInfo.locationPageIdSource,
                        name: product.name,
                        data: product,
                    },
                };
                const url = process.env.SITE_BUILDER_API + "/site-builder/location-pages/" +
                    storeInfo.siteId +
                    "?access_token=" +
                    storeInfo.builder_token + '&shop=1';
                try {
                    const utdRes = yield axios_1.default.post(url, body);
                    return utdRes;
                }
                catch (err) {
                    throw err;
                }
            });
            // loop through all the products
            productsList.items.forEach((product) => {
                const fetchCategoriesRequest = product.categories.map((catId) => categoryControllers_1.default[storeInfo.source](Object.assign(Object.assign({}, controllerParams), { id: catId })));
                Promise.all(fetchCategoriesRequest)
                    .then((categories) => handleUTDBuilderCall(product, categories)
                    .then((response) => console.log({ response }))
                    .catch((err) => console.log({ err })))
                    .catch((err) => console.error({ err }));
            });
        }
        catch (e) {
            throw e;
        }
    });
}
exports.syncStoreProducts = syncStoreProducts;
/**
 * @desc sync the current webshop's category data with the UTD pages
 * @param storeInfo
 */
function syncStoreCategories(storeInfo) {
    return __awaiter(this, void 0, void 0, function* () { });
}
function syncStore(storeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([
            syncStoreCategories(storeInfo),
            syncStoreProducts(storeInfo),
        ]);
    });
}
exports.default = syncStore;
