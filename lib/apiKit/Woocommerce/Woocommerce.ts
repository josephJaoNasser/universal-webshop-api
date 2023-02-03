import WoocommerceCategories from "./categories";
import WoocommerceProducts from "./products";

export type WoocommerceConfig = {
  consumer_key: string;
  consumer_secret: string;
};

class WoocommerceApi {
  baseURL: string;
  storeUrl: string;
  config: WoocommerceConfig;
  Products: WoocommerceProducts;
  Categories: WoocommerceCategories;

  constructor(storeUrl: string, consumer_key: string, consumer_secret: string) {
    this.storeUrl = storeUrl;
    this.baseURL = this.getBaseUrl(storeUrl);
    this.config = {
      consumer_key,
      consumer_secret,
    };
    this.Products = new WoocommerceProducts(this.baseURL, this.config);
    this.Categories = new WoocommerceCategories(this.baseURL, this.config);
  }

  private getBaseUrl(storeUrl: string) {
    if (storeUrl[storeUrl.length] === "/") {
      return storeUrl + "wp-json/wc/v3";
    }

    return storeUrl + "/wp-json/wc/v3";
  }
}

export interface WoocommerceCredential {
  consumer_key?: string;
  consumer_secret?: string;
}

export default WoocommerceApi;
