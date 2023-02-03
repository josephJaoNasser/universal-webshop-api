import { AxiosError } from "axios";
import EcwidApi, { EcwidCredential } from "../lib/apiKit/Ecwid";
import { WoocommerceCredential } from "../lib/apiKit/Woocommerce";
import StandardizedCategory from "../lib/types/StandardizedCategory";

interface Credentials extends WoocommerceCredential, EcwidCredential {}
type CategoryResponse =
  | StandardMultiItemResponse<StandardizedCategory>
  | StandardizedCategory
  | number[];

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
export default async function getCategoryData({
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
      const standardizedData: CategoryResponse = await Ecwid.Categories[method](
        {
          queries,
          id,
        }
      );

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
