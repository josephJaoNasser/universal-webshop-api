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
const axios_1 = __importDefault(require("axios"));
const ecwidTranslator_1 = __importDefault(require("./ecwidTranslator"));
const RouteConfig_1 = __importDefault(require("./RouteConfig"));
class EcwidProducts extends RouteConfig_1.default {
    /**
     * @description get all products
     */
    getAll({ queries, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const toParse = Object.assign(Object.assign({}, (queries.limit && { limit: queries.limit })), (queries.offset && { offset: queries.offset }));
            let filterParams = new URLSearchParams(toParse).toString();
            if (filterParams.length)
                filterParams = "?" + filterParams;
            const res = yield axios_1.default.get(this.baseURL + "/products" + filterParams, this.config);
            return ecwidTranslator_1.default.Product.translateMultiple(res.data);
        });
    }
    /**
     * @description search for products using keywords
     * @param keyword Search term. Add an asterisk symbol at the end of keyword to disable exact match search. Ecwid searches products over multiple languages and fields:
      - title
      - description
      - SKU
      - product options
      - category name
      - gallery image descriptions
      - attribute values (except for hidden attributes). If your keywords contain special characters, it may make sense to URL encode them before making a request
     */
    searchByKeywords({ queries, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyword = queries.keyword;
            const res = yield axios_1.default.get(this.baseURL + "/products?keyword=" + keyword, this.config);
            return ecwidTranslator_1.default.Product.translateMultiple(res.data);
        });
    }
    /**
     * @description search for products using filters. For reference, see the Ecwid api
     */
    searchByFilters({ queries, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterParams = new URLSearchParams(queries).toString();
            const res = yield axios_1.default.get(this.baseURL + "/products?" + filterParams, this.config);
            return ecwidTranslator_1.default.Product.translateMultiple(res.data);
        });
    }
    /**
     * @description retrieve a single product
     */
    getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get(this.baseURL + "/products/" + id, this.config);
            return ecwidTranslator_1.default.Product.translateSingle(res.data);
        });
    }
}
exports.default = EcwidProducts;
