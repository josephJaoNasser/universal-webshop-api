import { EcwidConfig } from "./Ecwid";

class RouteConfig {
  baseURL: string;
  config: EcwidConfig

  constructor(baseURL: string, config: EcwidConfig) {
    this.baseURL = baseURL;
    this.config = config
  }
}

export default RouteConfig