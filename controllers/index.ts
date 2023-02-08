import { EcwidCredential } from "@/lib/apiKit/Ecwid/Ecwid";
import { WoocommerceCredential } from "@/lib/apiKit/Woocommerce";
import productControllers from "./productControllers";
import categoryControllers from "./categoryControllers";

interface Credentials extends WoocommerceCredential, EcwidCredential {}

export interface Params {
  method: string;
  credentials: Credentials;
  storeInfo: StoreInfo;
  id?: string | number;
  queries?: any;
  payload?: any;
}

export default {
  productControllers,
  categoryControllers,
};
