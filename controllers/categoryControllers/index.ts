import StandardizedCategory from "@/lib/types/StandardizedCategory";
import ecwidHandler from "./ecwid";
import woocommerceHandler from "./woocommerce";

export type CategoryResponse =
  | StandardMultiItemResponse<StandardizedCategory>
  | StandardizedCategory
  | number[];

const categoryControllers = {
  ecwid: ecwidHandler,
  woocommerce: woocommerceHandler,
};

export default categoryControllers;
