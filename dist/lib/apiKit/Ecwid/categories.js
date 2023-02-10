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
class EcwidCategories extends RouteConfig_1.default {
    /**
     * @description get all categories
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get(this.baseURL + "/categories", this.config);
            return ecwidTranslator_1.default.Category.translateMultiple(res.data);
        });
    }
    /**
     * Search categories in a store catalog by their path. The response provides basic details of found categories.
     *
     * The method returns a list of categories with the specified path, sorted in ascending order of the category's internal ID. The search is case insensitive.
     *
     * @param path A category path where elements are separated by a delimiter. Spaces around the delimiter and empty path elements are ignored
     * @param delimiter A string of 1 or more characters used as path element separator
     * @param offset Offset from the beginning of the returned items list (for paging)
     * @param limit Maximum number of returned items. Maximum allowed value: 100. Default value: 100
     * */
    getByPath({ queries, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathQueries = new URLSearchParams(queries).toString();
            const res = yield axios_1.default.get(this.baseURL + "/categoriesByPath" + pathQueries, this.config);
            return ecwidTranslator_1.default.Category.translateMultiple(res.data);
        });
    }
    /**
     * @description Get order of categories inside a specific category. Use parentCategory=0 to get categories inside the "Store front page" category.
     */
    getSorted({ queries }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parentCategory } = queries;
            const res = yield axios_1.default.get(this.baseURL + "/categories/sort?parentCategory=" + parentCategory, this.config);
            return res.data;
        });
    }
    /**
     * @description get a single category by id
     */
    getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get(this.baseURL + "/categories/" + id, this.config);
            return ecwidTranslator_1.default.Category.translateSingle(res.data);
        });
    }
}
exports.default = EcwidCategories;
