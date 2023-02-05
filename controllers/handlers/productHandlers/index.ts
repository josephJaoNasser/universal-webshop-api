import StandardizedProduct from "../../../lib/types/StandardizedProduct";
import ecwidHandler from "./ecwid";
import woocommerceHandler from "./woocommerce";

export type ProductResponse =
  | StandardMultiItemResponse<StandardizedProduct>
  | StandardizedProduct;

const productHandlers = {
  ecwid: ecwidHandler,
  woocommerce: woocommerceHandler,
};

export default productHandlers;
