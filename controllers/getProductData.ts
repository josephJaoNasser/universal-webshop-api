import { AxiosError } from "axios";
import { EcwidCredential, EcwidProducts } from "../lib/apiKit/Ecwid";
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
export default async function getProductData({
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
        const api = new EcwidProducts(
          storeInfo.storeId.toString(),
          credentials.token
        );

        const res = await api.getAll();
        return res.data;
      } catch (e: any) {
        console.log(e);
        const err: AxiosError = e;
        throw new Error(err.message);
      }
    case "woocommerce":
      return;
    default:
      return;
  }
}
