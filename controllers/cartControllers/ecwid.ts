import { ConvertedOrderPayload } from "@/lib/apiKit/Ecwid/cart";
import OrderEntry from "@/lib/apiKit/Ecwid/types/Order/Order";
import { Params } from "..";

type EcwidCartResponse = OrderEntry | ConvertedOrderPayload;

export default async function ecwidCartHandler({
  method,
  credentials,
  storeInfo,
  queries,
  id,
}: Params): Promise<EcwidCartResponse> {
  if (!credentials.token) {
    throw new Error("No token provided");
  }

  if (!storeInfo.storeId) {
    throw new Error("No store ID provided");
  }

  try {
  } catch (e) {
    throw e;
  }
}
