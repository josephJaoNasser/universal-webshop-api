import axios, { AxiosResponse } from "axios";
import { EcwidConfig } from "./Ecwid";
import RouteConfig from "./RouteConfig";
import CartUpdateRequest from "./types/Cart/CartUpdateRequest";
import OrderEntry, { CalculateOrderRequest } from "./types/Order/Order";

export type ConvertedOrderPayload = {
  orderNumber: number;
  vendorOrderNumber: string;
};

type CartPayload = CartUpdateRequest | CalculateOrderRequest;

class EcwidCart extends RouteConfig {
  cartPayload?: CartPayload;

  constructor(baseUrl: string, config: EcwidConfig) {
    super(baseUrl, config);
    this.cartPayload;
  }

  /**
   * @description set the cart payload that will be used when sending requests to the API
   * @param cartPayload
   */
  setCartPayload(cartPayload: CartPayload) {
    this.cartPayload = cartPayload;
  }

  /**
   * @method GET
   * @description get cart details using the specified cart id
   */
  async getCart({ id }: { id: number }): Promise<OrderEntry> {
    try {
      const response: AxiosResponse<OrderEntry> = await axios.post(
        this.baseURL + "/carts/" + id
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @method PUT
   * @description Update the details of specific abandoned cart using its unique cart ID.
   * - Note: Please set the cart payload using ```setCartPayload()``` before calling
   */
  async updateCart({ id }: { id: number }): Promise<{ updateCount: number }> {
    if (!this.cartPayload) {
      throw new Error("Please set the cart payload");
    }

    const payload = this.cartPayload as CartUpdateRequest;

    try {
      const response: AxiosResponse<{ updateCount: number }> = await axios.post(
        this.baseURL + "/carts/" + id + "/place",
        payload
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @method POST
   * @description This method will calculate and return shipping rates and taxes for the order sent in a request.
   *   - Please set the cart payload using ```setCartPayload()``` before calling
   *   - Requests to this endpoint don't create any new orders in the actual store
   */
  async calculateOrderDetails(): Promise<OrderEntry> {
    if (!this.cartPayload) {
      throw new Error("Please set the cart payload");
    }

    const payload = this.cartPayload as CalculateOrderRequest;
    try {
      const response: AxiosResponse<OrderEntry> = await axios.post(
        this.baseURL + "/order/calculate",
        payload
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Converts the abandoned cart into a completed order in an Ecwid store.
   * @returns the order number and the vendor's order number
   */
  async convertCartToOrder({
    id,
  }: {
    id: number;
  }): Promise<ConvertedOrderPayload> {
    try {
      const response: AxiosResponse<ConvertedOrderPayload> = await axios.post(
        this.baseURL + "/carts/" + id + "/place"
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

export default EcwidCart;
