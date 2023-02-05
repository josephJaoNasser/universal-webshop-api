import { Params } from "./handlers";
import categoryHandlers, {
  CategoryResponse,
} from "./handlers/categoryHandlers";

/**
 * @description get data based on store info
 */
export default async function getCategoryData(params: Params) {
  try {
    const response: CategoryResponse = await categoryHandlers[
      params.storeInfo.source
    ](params);
    return response;
  } catch (e) {
    throw e;
  }
}
