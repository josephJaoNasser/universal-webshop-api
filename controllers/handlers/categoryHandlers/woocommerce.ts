import { Params } from "..";
import { CategoryResponse } from ".";
import WoocommerceApi from "../../../lib/apiKit/Woocommerce";

export default async function woocommerceHandler ({
  method,
  credentials,
  storeInfo,
  queries,
  id,
}: Params): Promise<CategoryResponse> {
  if (!credentials.consumer_key && !credentials.consumer_secret) {
    throw new Error("No token provided");
  }

  try {
    const Woocommerce = new WoocommerceApi(
      storeInfo.storeUrl as string,
      credentials.consumer_key as string,
      credentials.consumer_secret as string
    );
    const standardizedData: CategoryResponse = await Woocommerce.Categories[
      method
    ]({
      queries,
      id,
    });

    return standardizedData;
  } catch (e: any) {
    throw e;
  }
}