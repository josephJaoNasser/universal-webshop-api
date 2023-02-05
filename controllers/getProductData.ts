import { Params } from "./handlers";
import productHandlers, { ProductResponse } from "./handlers/productHandlers";

/**
 * @description get data based on store info
 */
export default async function getProductData(params: Params) {
  try {
    const response: ProductResponse = await productHandlers[
      params.storeInfo.source
    ](params);
    return response;
  } catch (e) {
    throw e;
  }
}
