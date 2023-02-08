import EcwidCart from "./cart";
import EcwidCategories from "./categories";
import EcwidProducts from "./products";

export type EcwidConfig = {
  headers: {
    Authorization: string;
  };
};

class EcwidApi {
  baseURL: string;
  storeID: number;
  token: string;
  config: EcwidConfig;
  Products: EcwidProducts;
  Categories: EcwidCategories;
  Cart: EcwidCart

  constructor(storeID: number, token: string) {
    this.storeID = storeID;
    this.token = token;
    this.baseURL = "https://app.ecwid.com/api/v3/" + storeID;
    this.config = {
      headers: {
        Authorization: this.initToken(token),
      },
    };
    this.Products = new EcwidProducts(this.baseURL, this.config);
    this.Categories = new EcwidCategories(this.baseURL, this.config);
    this.Cart = new EcwidCart(this.baseURL, this.config)
  }

  private initToken(token: string) {
    if (!token.startsWith("Bearer ")) {
      return "Bearer " + token;
    }

    return token;
  }
}

export interface EcwidCredential {
  token?: string;
}

export default EcwidApi;
