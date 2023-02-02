import { AxiosError } from "axios";
import { EcwidCategories, EcwidCredential, EcwidProducts } from "../lib/apiKit/Ecwid";
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
        const categoriesApi = new EcwidCategories(
          storeInfo.storeId.toString(),
          credentials.token
        );

        const res = await categoriesApi.getAll();
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
