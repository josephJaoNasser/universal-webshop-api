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
function ecwidHandler({ method, credentials, storeInfo, queries, id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!credentials.token) {
            throw new Error("No token provided");
        }
        if (!storeInfo.storeId) {
            throw new Error("No store ID provided");
        }
        try {
            const Ecwid = new Ecwid_1.default(+storeInfo.storeId, credentials.token);
            const standardizedData = yield Ecwid.Categories[method]({
                queries,
                id,
            });
            return standardizedData;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.default = ecwidHandler;
