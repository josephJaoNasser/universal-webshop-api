import { EcwidConfig } from "./Ecwid";
import RouteConfig from "./RouteConfig";
import EcwidProductType from "./types/EcwidProductType";

interface CartParams {
  id: number;
  items: EcwidProductType[];
}

class EcwidCart extends RouteConfig {
  cartId: number;

  constructor(baseUrl: string, config: EcwidConfig, cartParams: CartParams) {
    super(baseUrl, config);
    this.cartId = cartParams.id;
  }

  async getCart() {}

  async updateCart() {}

  async calculateOrderDetails() {}
}

export default EcwidCart;
