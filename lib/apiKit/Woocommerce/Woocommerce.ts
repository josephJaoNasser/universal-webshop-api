class WoocommerceApi {
  baseURL: string;
  storeUrl: string;
  consumer_key: string;
  consumer_secret: string;

  constructor(storeUrl: string, consumer_key: string, consumer_secret: string) {
    this.storeUrl = storeUrl;
    this.consumer_key = consumer_key;
    this.consumer_secret = consumer_secret;
    this.baseURL = this.getBaseUrl(storeUrl);
  }

  private getBaseUrl(storeUrl:string) {
    if(storeUrl[storeUrl.length] === "/") {
      return storeUrl + "wp-json/wc/v3"
    }

    return storeUrl + "/wp-json/wc/v3"
  }
}

export interface WoocommerceCredential {
  consumer_key?: string;
  consumer_secret?: string;
}

export default WoocommerceApi;
