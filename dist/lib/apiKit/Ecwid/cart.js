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
const RouteConfig_1 = __importDefault(require("./RouteConfig"));
class EcwidCart extends RouteConfig_1.default {
    constructor(baseUrl, config) {
        super(baseUrl, config);
        this.cartPayload;
    }
    /**
     * @description set the cart payload that will be used when sending requests to the API
     * @param cartPayload
     */
    setCartPayload(cartPayload) {
        this.cartPayload = cartPayload;
    }
    /**
     * @method GET
     * @description get cart details using the specified cart id
     */
    getCart({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(this.baseURL + "/carts/" + id);
                return response.data;
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * @method PUT
     * @description Update the details of specific abandoned cart using its unique cart ID.
     * - Note: Please set the cart payload using ```setCartPayload()``` before calling
     */
    updateCart({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cartPayload) {
                throw new Error("Please set the cart payload");
            }
            const payload = this.cartPayload;
            try {
                const response = yield axios_1.default.post(this.baseURL + "/carts/" + id + "/place", payload);
                return response.data;
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * @method POST
     * @description This method will calculate and return shipping rates and taxes for the order sent in a request.
     *   - Please set the cart payload using ```setCartPayload()``` before calling
     *   - Requests to this endpoint don't create any new orders in the actual store
     */
    calculateOrderDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cartPayload) {
                throw new Error("Please set the cart payload");
            }
            const payload = this.cartPayload;
            try {
                const response = yield axios_1.default.post(this.baseURL + "/order/calculate", payload);
                return response.data;
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * @description Converts the abandoned cart into a completed order in an Ecwid store.
     * @returns the order number and the vendor's order number
     */
    convertCartToOrder({ id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(this.baseURL + "/carts/" + id + "/place");
                return response.data;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = EcwidCart;
