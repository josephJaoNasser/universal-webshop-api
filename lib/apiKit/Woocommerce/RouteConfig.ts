import { WoocommerceConfig } from "./Woocommerce";

class RouteConfig {
  baseURL: string;
  config: WoocommerceConfig

  constructor(baseURL: string, config: WoocommerceConfig) {
    this.baseURL = baseURL;
    this.config = config
  }
}

export default RouteConfig