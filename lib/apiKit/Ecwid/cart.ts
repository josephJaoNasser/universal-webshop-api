import { EcwidConfig } from "./Ecwid";
import RouteConfig from "./RouteConfig";
import CartUpdateRequest from "./types/Cart/CartUpdateRequest";
import OrderEntry, { CalculateOrderRequest } from "./types/Order/Order";

export type ConvertedOrderPayload = {
  orderNumber: number;
  vendorOrderNumber: string;
};

class EcwidCart extends RouteConfig {
  cartPayload?: CartUpdateRequest;

  constructor(baseUrl: string, config: EcwidConfig) {
    super(baseUrl, config);
    this.cartPayload;
  }

  /**
   * @description set the cart payload that will be used when sending requests to the API
   * @param cartPayload
   */
  setCartPayload(cartPayload: CartUpdateRequest) {
    this.cartPayload = cartPayload;
  }

  /**
   * @method GET
   * @description get cart details using the specified cart id
   */
  async getCart(): Promise<OrderEntry> {}

  /**
   * @method PUT
   * @description update cart details.
   * - Note: Please set the cart payload using ```setCartPayload()``` before calling
   */
  async updateCart(): Promise<{ updateCount: number }> {
    // do something with this.cartPayload
    return {
      updateCount: 1,
    };
  }

  /**
   * @method POST
   * @description This method will calculate and return shipping rates and taxes for the order sent in a request.
   *   - Please set the cart payload using ```setCartPayload()``` before calling
   *   - Requests to this endpoint don't create any new orders in the actual store
   */
  async calculateOrderDetails(
    payload: CalculateOrderRequest
  ): Promise<OrderEntry> {}

  /**
   * @description Converts the abandoned cart into a completed order in an Ecwid store.
   * @returns the order number and the vendor's order number
   */
  async convertCartToOrder(): Promise<ConvertedOrderPayload> {
    return {
      orderNumber: 123,
      vendorOrderNumber: "",
    };
  }
}

export default EcwidCart;
