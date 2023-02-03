import EcwidApi, { EcwidCredential, EcwidProducts } from "../lib/apiKit/Ecwid";
import WoocommerceApi, {
  WoocommerceCredential,
  WoocommerceProducts,
} from "../lib/apiKit/Woocommerce";

import StandardizedProduct from "../lib/types/StandardizedProduct";

interface Credentials extends WoocommerceCredential, EcwidCredential {}

type ProductResponse =
  | StandardizedProduct
  | StandardMultiItemResponse<StandardizedProduct>;

interface Params {
  method: string;
  credentials: Credentials;
  storeInfo: StoreInfo;
  id?: string | number;
  queries?: any;
}

/**
 * @description get data based on store info
 */
export default async function getProductData({
  method,
  credentials,
  storeInfo,
  queries,
  id,
}: Params) {
  /**
   * Ecwid
   */
  if (storeInfo.source === "ecwid") {
    if (!credentials.token) {
      throw new Error("No token provided");
    }

    try {
      const Ecwid = new EcwidApi(+storeInfo.storeId, credentials.token);
      const standardizedData: ProductResponse = await Ecwid.Products[method]({
        queries,
        id,
      });

      return standardizedData;
    } catch (e: any) {
      throw e;
    }
  }

  /**
   * Woocommerce
   */
  if (storeInfo.source === "woocommerce") {
    // woocommerce functions here
    // make sure to return inside the if statements
  }

  return;
}
