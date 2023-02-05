import { CategoryResponse } from ".";
import { Params } from "..";
import EcwidApi from "@/lib/apiKit/Ecwid";

export default async function ecwidHandler({
  method,
  credentials,
  storeInfo,
  queries,
  id,
}: Params): Promise<CategoryResponse> {
  if (!credentials.token) {
    throw new Error("No token provided");
  }

  if (!storeInfo.storeId) {
    throw new Error("No store ID provided");
  }

  try {
    const Ecwid = new EcwidApi(+storeInfo.storeId, credentials.token);
    const standardizedData: CategoryResponse = await Ecwid.Categories[method]({
      queries,
      id,
    });

    return standardizedData;
  } catch (e: any) {
    throw e;
  }
}
