import { EcwidCredential } from "@/lib/apiKit/Ecwid/Ecwid";
import { WoocommerceCredential } from "@/lib/apiKit/Woocommerce";
import productHandlers from "./productHandlers";
import categoryHandlers from "./categoryHandlers";

interface Credentials extends WoocommerceCredential, EcwidCredential {}

export interface Params {
  method: string;
  credentials: Credentials;
  storeInfo: StoreInfo;
  id?: string | number;
  queries?: any;
}

export default {
  productHandlers,
  categoryHandlers,
};
