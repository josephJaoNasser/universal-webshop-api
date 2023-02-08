import EcwidApi from "@/lib/apiKit/Ecwid";
import { ConvertedOrderPayload } from "@/lib/apiKit/Ecwid/cart";
import OrderEntry from "@/lib/apiKit/Ecwid/types/Order/Order";
import { Params } from "..";

type EcwidCartResponse =
  | OrderEntry
  | ConvertedOrderPayload
  | { updateCount: number };

export default async function ecwidCartHandler({
  method,
  credentials,
  storeInfo,
  queries,
  id,
  payload,
}: Params): Promise<EcwidCartResponse> {
  if (!credentials.token) {
    throw new Error("No token provided");
  }

  if (!storeInfo.storeId) {
    throw new Error("No store ID provided");
  }

  try {
    const Ecwid = new EcwidApi(storeInfo.storeId as number, credentials.token);

    if (method === "updateCart") {
      Ecwid.Cart.setCartPayload(payload);
      const response = await Ecwid.Cart.updateCart();
      return response;
    } else {
      const response: EcwidCartResponse = await Ecwid.Cart[method]({ id });
      return response;
    }
  } catch (e) {
    throw e;
  }
}
