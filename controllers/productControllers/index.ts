import StandardizedProduct from "@/lib/types/StandardizedProduct";
import ecwidHandler from "./ecwid";
import woocommerceHandler from "./woocommerce";

export type ProductResponse =
  | StandardMultiItemResponse<StandardizedProduct>
  | StandardizedProduct;

const productControllers = {
  ecwid: ecwidHandler,
  woocommerce: woocommerceHandler,
};

export default productControllers;
