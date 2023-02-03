import { AxiosError } from "axios";
import EcwidApi, { EcwidCredential } from "../lib/apiKit/Ecwid";
import { WoocommerceCredential } from "../lib/apiKit/Woocommerce";

interface Credentials extends WoocommerceCredential, EcwidCredential {}

interface Params {
  credentials: Credentials;
  storeInfo: StoreInfo;
  queries?: any;
}

/**
 * @description get data based on store info
 */
export default async function getCategoryData({
  credentials,
  storeInfo,
  queries,
}: Params) {
  switch (storeInfo.source) {
    case "ecwid":
      if (!credentials.token) {
        throw new Error("No token provided");
      }

      try {
        const Ecwid = new EcwidApi(+storeInfo.storeId, credentials.token);
        const data = await Ecwid.Categories.getAll();

        return data;
      } catch (e: any) {
        throw e;
      }
    case "woocommerce":
      return;
    default:
      return;
  }
}
